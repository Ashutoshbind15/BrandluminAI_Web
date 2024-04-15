import mongoose from "mongoose";

const MediaAssistantSchema = new mongoose.Schema({
  providerName: String,
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  isLocked: Boolean,
});

const MediaAssistant =
  mongoose.models.MediaAssistant ||
  mongoose.model("MediaAssistant", conversationSchema);

export default MediaAssistant;
