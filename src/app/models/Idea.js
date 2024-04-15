import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    type: [
      {
        type: String,
      },
    ],
    media: [
      {
        type: String,
      },
    ],
    theme: [{ type: String }],
    audienceInterests: [{ type: String }],
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    mediaAssistants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MediaAssistant",
      },
    ],
  },
  { timestamps: true }
);

export const ideatypes = ["video", "blog", "shorts", "podcast", "idea"];
export const moodTypes = ["happy", "science", "creative"];

const Idea = mongoose.models.Idea || mongoose.model("Idea", IdeaSchema);

export default Idea;
