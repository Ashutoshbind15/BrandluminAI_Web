import Videopanes from "@/app/components/Video/Videopanes";
import Video from "@/app/models/Video";
import Link from "next/link";
import React from "react";

const VideoPage = async ({ params }) => {
  console.log(params);
  const { id } = params;

  if (id === "undefined") return <div>404</div>;

  const video = await Video.findById(id);

  const parsedVideo = JSON.parse(JSON.stringify(video));

  return (
    <div>
      <video src={video.fileUrl} controls className="h-96 w-96"></video>
      <Videopanes video={parsedVideo} />
      <Link
        href={`/videos/${id}/edit`}
        className="rounded-lg py-2 px-4 bg-blue-700 text-white"
      >
        Edit
      </Link>
      <Link
        href={`/videos/${id}/createcontent`}
        className="rounded-lg py-2 px-4 bg-blue-700 text-white"
      >
        Create Content
      </Link>
    </div>
  );
};

export default VideoPage;
