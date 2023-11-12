import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    email: {
      type: String,
      required: "Email is required",
      unique: true,
    },
    password: String,
    role: String,
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    accessToken: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
