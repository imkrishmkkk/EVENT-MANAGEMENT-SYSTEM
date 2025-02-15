import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";

dotenv.config();

const generateUsers = async (count = 100) => {
  const users = [];
  const usedUsernames = new Set();
  const usedEmails = new Set();

  for (let i = 0; i < count; i++) {
    let username, email;
    
    // Generate unique username
    do {
      username = faker.internet.userName().toLowerCase().replace(/[^a-z0-9_]/g, '');
      username = username.slice(0, 15); // Ensure username length limit
    } while (usedUsernames.has(username));
    
    // Generate unique email
    do {
      email = faker.internet.email().toLowerCase();
    } while (usedEmails.has(email));

    const user = {
      name: faker.person.fullName(),
      username: username + faker.number.int({ min: 1, max: 999 }),
      email,
      password: await bcrypt.hash(`User${i + 1}@123`, 10),
      profilePicture: faker.image.avatar(),
    };

    usedUsernames.add(user.username);
    usedEmails.add(user.email);
    users.push(user);
  }

  return users;
};

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB connected");

    // Clear existing users
    await User.deleteMany();
    console.log("Cleared existing users");

    // Generate and insert new users
    const users = await generateUsers(100);
    await User.insertMany(users);
    
    console.log(`Successfully seeded ${users.length} users`);
    console.log("Sample users:", users.slice(0, 3));
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedUsers();