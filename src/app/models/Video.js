import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  fileId: String,
  title: {
    type: String,
  },
  description: String,
  data: {
    type: Object,
    default: {},
    required: "Data is required",
  },
});

const Video = mongoose.models.Video || mongoose.model("Video", VideoSchema);

export default Video;
