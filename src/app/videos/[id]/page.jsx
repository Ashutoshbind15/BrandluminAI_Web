import Videopanes from "@/app/components/Video/Videopanes";
import Video from "@/app/models/Video";
import React from "react";

const VideoPage = async ({ params }) => {
  console.log(params);
  const { id } = params;
  const video = await Video.findById(id);

  return (
    <div>
      <video src={video.fileUrl} controls className="h-96 w-96"></video>

      <Videopanes videoId={video?._id} />
    </div>
  );
};

export default VideoPage;
