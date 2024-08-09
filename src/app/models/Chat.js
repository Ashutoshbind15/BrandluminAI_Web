import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "model"], // Role can be 'user' or 'model'
    required: true,
  },
  parts: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = new mongoose.Schema({
  messages: [messageSchema], // An array of messages
});

const Chat =
  mongoose.models?.Chat || mongoose.model("Chat", conversationSchema);

export default Chat;
