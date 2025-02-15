import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import Event from "./models/event.model.js";
import User from "./models/user.model.js";

dotenv.config();

const seedEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected");

    // Get existing users
    const users = await User.find().lean();
    if (users.length < 10) throw new Error("Need at least 10 users seeded first");

    // Generate realistic events
    const events = Array.from({ length: 100 }, (_, i) => {
      const organizer = faker.helpers.arrayElement(users);
      const possibleAttendees = users.filter(u => u._id.toString() !== organizer._id.toString());
      const attendeeCount = faker.number.int({ 
        min: 5, 
        max: Math.min(50, possibleAttendees.length) 
      });

      return {
        title: `Event ${i + 1}: ${faker.lorem.words(3)}`,
        description: faker.lorem.paragraphs(2),
        date: faker.date.future({ years: 1 }),
        location: `${faker.location.city()}, ${faker.location.country()}`,
        organizer: organizer._id,
        attendees: faker.helpers
          .arrayElements(possibleAttendees, { min: 5, max: attendeeCount })
          .map(u => u._id),
        categories: faker.helpers.arrayElements(
          ["Technology", "Art", "Business", "Health", "Music"],
          { min: 1, max: 3 }
        )
      };
    });

    await Event.deleteMany();
    await Event.insertMany(events);
    
    console.log(`Successfully seeded ${events.length} events`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedEvents();