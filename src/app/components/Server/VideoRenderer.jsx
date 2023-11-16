import Video from "@/app/models/Video";
import { connectDB } from "@/app/utils/db";
import Link from "next/link";

const VideoRenderer = async () => {
  await connectDB();
  const vids = await Video.find({});

  return (
    <div className="my-6">
      {vids.map((vid) => {
        return (
          <div
            key={vid._id}
            className="flex items-center p-4 border-y-2 border-black mb-4 px-32"
          >
            <div>
              <video src={vid.fileUrl} controls className="h-96 w-96"></video>
            </div>

            <div className="flex flex-col items-center ml-32">
              <div className="text-xl font-bold text-black font-mono">
                {vid.title}
              </div>
              <div className="text-xl font-bold text-black font-mono">
                {vid.description}
              </div>

              <Link className="" href={vid.data ? `/videos/${vid._id}` : "/"}>
                {vid.data ? "Analysis" : "Analyze"}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoRenderer;
