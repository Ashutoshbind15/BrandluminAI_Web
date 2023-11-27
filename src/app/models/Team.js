import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  },
  { timestamps: true }
);

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

export default Team;
