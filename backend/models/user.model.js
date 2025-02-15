import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://th.bing.com/th?q=Profile+Photo+Icon.png&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=2&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);

export default User;
