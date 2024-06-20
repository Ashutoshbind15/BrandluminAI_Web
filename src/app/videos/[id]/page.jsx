"use client";

import Videopanes from "@/app/components/Video/Videopanes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VideoPage = ({ params }) => {
  const { id } = params;

  const [video, setVideo] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchAnalysis = async (videoId, attempt = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/videoanalyzer?id=${videoId}`);
      const data = await response.json();
      if (data.state === "Processed") {
        setAnalysis(data);
        setIsLoading(false);
      } else {
        const delay = Math.min(1000 * Math.pow(2, attempt), 16000); // exponential backoff with cap at 16 seconds
        setRetryCount(attempt);
        setTimeout(() => fetchAnalysis(videoId, attempt + 1), delay);
      }
    } catch (error) {
      console.error("Error fetching analysis:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch(`/api/video/${id}`)
      .then((res) => res.json())
      .then((data) => setVideo(data));
  }, [id]);

  useEffect(() => {
    if (video && video.fileId) {
      fetchAnalysis(video._id);
    }
  }, [id, video]);

  const parsedVideo = JSON.parse(JSON.stringify(video));

  return (
    <div>
      <video src={video?.fileUrl} controls className="h-96 w-96"></video>
      <Videopanes video={parsedVideo} />
      {isLoading && (
        <p className="text-gray-500">
          Fetching analysis... (Retry {retryCount})
        </p>
      )}
      {analysis && analysis.stae === "Processed" && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Insights</h3>
          <pre>{JSON.stringify(analysis.summarisedinsights, null, 2)}</pre>
        </div>
      )}
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
