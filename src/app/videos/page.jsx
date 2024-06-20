"use client";

import { useEffect, useState } from "react";
import VideoRenderer from "../components/Server/VideoRenderer";
import VideoClientHelper from "../components/Wrappers/ClientComponent/VideoClientHelper";

const VideosRenderer = () => {
  const [vids, setVids] = useState(null);

  useEffect(() => {
    const fetchVids = async () => {
      const res = await fetch("/api/video");
      const data = await res.json();
      setVids(data);
    };

    fetchVids();
  }, []);

  return (
    <VideoClientHelper>
      {vids ? <VideoRenderer vids={vids} /> : null}
    </VideoClientHelper>
  );
};

export default VideosRenderer;
