import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > Date.now(); // Ensures the event date is in the future
        },
        message: "Event date must be in the future",
      },
    },
    location: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        validate: {
          validator: function (v) {
            return !this.attendees.includes(this.organizer);
          },
          message: "Organizer cannot be an attendee",
        },
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;
