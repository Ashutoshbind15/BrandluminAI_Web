import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    type: {
      type: String,
      enum: ["video", "blog", "shorts", "podcast", "idea"],
      default: "idea",
    },
  },
  { timestamps: true }
);

export const ideatypes = ["video", "blog", "shorts", "podcast", "idea"];

const Idea = mongoose.models.Idea || mongoose.model("Idea", IdeaSchema);

export default Idea;
