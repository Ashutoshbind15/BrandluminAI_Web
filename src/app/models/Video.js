import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  fileUrl: {
    type: String,
    required: "File URL is required",
  },
  fileId: String,
  data: {
    type: Object,
    default: {},
    required: "Data is required",
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
});

const Video =
  mongoose.models && "Video" in mongoose.models
    ? mongoose.models.Video
    : mongoose.model("Video", VideoSchema);

export default Video;
