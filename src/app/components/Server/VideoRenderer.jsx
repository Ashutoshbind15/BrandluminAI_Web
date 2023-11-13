import Video from "@/app/models/Video";
import { connectDB } from "@/app/utils/db";

const VideoRenderer = async () => {
  await connectDB();
  const vids = await Video.find({});

  return <div>{JSON.stringify(vids)}</div>;
};

export default VideoRenderer;
