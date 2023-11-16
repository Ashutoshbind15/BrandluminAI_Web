"use client";

import React, { useEffect } from "react";
import { Player } from "@remotion/player";
import { MyComposition } from "@/app/remotion/VideoEditComposition/Composition";
import axios from "axios";

const EditPage = ({ params }) => {
  const { id } = params;

  const [video, setVideo] = React.useState(null);
  const [transcripts, setTranscripts] = React.useState([]);
  const [sections, setSections] = React.useState([]);

  useEffect(() => {
    const helper = async () => {
      const { data } = await axios.get(`/api/video/${id}/transcripts`);
      console.log(data);

      const { data: videoData } = await axios.get(`/api/video/${id}`);

      setVideo(videoData);
      setTranscripts(data.completeTranscripts);
    };

    helper();
  }, []);

  //parse the string of type 00:00:00.00 to seconds
  const parseTime = (time) => {
    if (!time || time.length === 0) return 0;
    const [hour, minute, second] = time.split(":");
    return +hour * 3600 + +minute * 60 + +second;
  };

  console.log(parseTime(video?.video?.data?.insights?.duration?.time));

  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="mt-5">Edit Page</h1>
      {video && video.video && transcripts && (
        <Player
          component={MyComposition}
          inputProps={{
            sections,
            videoUrl: video.video.fileUrl,
          }}
          durationInFrames={
            Math.ceil(parseTime(video?.video?.data?.insights?.duration?.time)) *
            30
          }
          fps={30}
          compositionHeight={720}
          compositionWidth={1080}
          controls
          autoPlay
          loop
          className="m-4"
        />
      )}

      {transcripts?.map((tr) => (
        <div className="flex items-center">
          <input
            type="checkbox"
            name=""
            id=""
            onClick={() => {
              const isSelected = sections.includes(tr);
              if (isSelected) {
                setSections(sections.filter((s) => s !== tr));
              } else {
                setSections([...sections, tr]);
              }
            }}
          />
          <div>
            {tr.speakerId} - {tr.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditPage;
