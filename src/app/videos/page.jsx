"use client";

import { useEffect, useState } from "react";
import UploaderButton from "../components/Components/UploaderButton";
import { Button } from "../components/utilUI/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../components/utilUI/ui/dialog";
import axios from "axios";
import { useToast } from "../components/utilUI/ui/use-toast";
import AnalysisConsumer from "../components/Video/AnalysisConsumer";
import { useRouter } from "next/navigation";
import Video from "../components/Video/Video";
import { useVideos } from "../utils/hooks/queries";

const VideosRenderer = () => {
  const {
    videos: vids,
    isVideosLoading,
    videosError,
    refetchVideos,
    isVideosError,
  } = useVideos();

  return (
    <>
      <div className="my-6 flex flex-wrap items-center justify-around">
        {vids?.map((vid) => (
          <Video video={vid} key={vid._id} />
        ))}
      </div>
      <UploaderButton
        onSuccess={(res) => {
          console.log(res);
          refetchVideos();
        }}
      />
    </>
  );
};

export default VideosRenderer;
