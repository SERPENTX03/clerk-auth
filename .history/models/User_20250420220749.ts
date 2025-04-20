import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String
  }
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

