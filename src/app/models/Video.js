import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  title: {
    type: String,
    required: "Title is required",
  },
  description: String,
  data: {
    type: Object,
    default: {},
    required: "Data is required",
  },
});

const Video = mongoose.model("Video", VideoSchema);

export default Video;
