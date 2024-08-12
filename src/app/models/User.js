import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: "Password is required",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
    salt: String,
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
    videoAccessToken: String,
    facebookPageId: String,
    facebookPageAccessToken: String,
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
