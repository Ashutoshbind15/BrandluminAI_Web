"use client";

import { useState } from "react";

const Videopanes = ({ video }) => {
  const [currentVideoPane, setCurrentVideoPane] = useState(0);

  const videoData = video?.data?.videos[0]?.insights;
  const insights = video?.data?.insights;

  const [vis, setVis] = useState("transcripts"); // ["transcripts", "topics", "faces", "sentiments", "labels"

  console.log(videoData);

  const isTranscriptPresent = videoData?.transcript?.length > 0 ? true : false;
  const isTopicsPresent = insights?.topics?.length > 0 ? true : false;
  const isFacesPresent = insights?.faces?.length > 0 ? true : false;
  const isSentimentsPresent = insights?.sentiments?.length > 0 ? true : false;
  const isLabelsPresent = insights?.labels?.length > 0 ? true : false;

  return (
    <div className="">
      <div className="flex items-center justify-around">
        <button
          className="text-black font-bold py-2 px-4 rounded w-full border-x-2 border-blue-700 my-5 hover:scale-105 transition-all"
          onClick={() => setCurrentVideoPane(0)}
        >
          Video
        </button>
        <button
          className="text-black font-bold py-2 px-4 rounded w-full border-x-2 border-blue-700 my-5 hover:scale-105 transition-all"
          onClick={() => setCurrentVideoPane(1)}
        >
          Analysis
        </button>
      </div>

      <div className="flex items-center justify-around py-4 my-8 shadow-lg">
        {currentVideoPane === 0 && isTranscriptPresent && (
          <div
            className="border-r-2 border-blue-700 hover:cursor-pointer flex-1 flex items-center justify-center"
            onClick={() => setVis("transcripts")}
          >
            Transcripts
          </div>
        )}
        {currentVideoPane === 0 && isTopicsPresent && (
          <div
            className="border-r-2 border-blue-700 hover:cursor-pointer flex-1 flex items-center justify-center"
            onClick={() => setVis("topics")}
          >
            Topics
          </div>
        )}
        {currentVideoPane === 0 && isFacesPresent && (
          <div
            className="border-r-2 border-blue-700 hover:cursor-pointer flex-1 flex items-center justify-center"
            onClick={() => setVis("faces")}
          >
            Faces
          </div>
        )}
        {currentVideoPane === 0 && isSentimentsPresent && (
          <div
            className="border-r-2 border-blue-700 hover:cursor-pointer flex-1 flex items-center justify-center"
            onClick={() => setVis("sentiments")}
          >
            Sentiments
          </div>
        )}

        {currentVideoPane === 1 && isLabelsPresent && (
          <div
            className="border-r-2 border-blue-700 hover:cursor-pointer flex-1 flex items-center justify-center"
            onClick={() => setVis("labels")}
          >
            Labels
          </div>
        )}
      </div>

      <div className="my-12 px-4 flex flex-col">
        {vis === "transcripts" &&
          isTranscriptPresent &&
          videoData.transcript.map((transcript) => (
            <div className="border-y-2 border-black my-4">
              <div>{JSON.stringify(transcript)}</div>
              <div className="text-xl font-bold text-black font-mono">
                {transcript.text}
              </div>
              <div className="text-xl font-bold text-black font-mono">
                {transcript.confidence}
              </div>

              <div>
                {transcript?.instances?.map((instance) => (
                  <div>
                    {instance?.start} - {instance?.end}
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Videopanes;
