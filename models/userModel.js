import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    profileImage: { type: String }, // optional
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
