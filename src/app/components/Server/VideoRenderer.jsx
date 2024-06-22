import Link from "next/link";

const VideoRenderer = ({ vids }) => {
  return (
    <div className="my-6">
      {vids.map((vid) => (
        <div
          key={vid._id}
          className="flex items-center p-4 border-y-2 border-black mb-4 px-32"
        >
          <div>
            <video src={vid.fileUrl} controls className="h-96 w-96"></video>
          </div>
          <div className="flex flex-col items-center ml-32">
            <Link className="" href={vid.data ? `/videos/${vid._id}` : "/"}>
              {vid.data ? "Analysis" : "Analyze"}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoRenderer;
