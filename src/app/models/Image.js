import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  url: {
    type: String,
  },
});

export const Image =
  mongoose.models.Image || mongoose.model("Image", ImageSchema);
