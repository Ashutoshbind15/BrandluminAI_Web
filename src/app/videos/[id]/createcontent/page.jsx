"use client";

import { getPusherClientInstance } from "@/app/utils/pusherjs";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ContentCreationPage = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState(null);
  const [transcripts, setTranscripts] = useState(null);
  const [resStream, setResStream] = useState([]);

  const [resString, setResString] = useState("");

  const clientMessages = [
    {
      role: "system",
      content:
        "you are a 50 word blog generation assistant that takes in arrays of transcripts, objects and topics from a video analysis",
    },
    {
      role: "user",
      content: `Scripts: ${JSON.stringify(transcripts)}`,
    },
  ];

  useEffect(() => {
    const pusherClientInstance = getPusherClientInstance();
    const channel = pusherClientInstance.subscribe("chat");
    console.log("connected");

    channel.bind("sres", (res) => {
      if (res && res.message && res.message.content) {
        setResStream((prev) => [...prev, res]);
        setResString((prev) => prev + " " + res.message.content);
      }
    });

    return () => {
      pusherClientInstance.unsubscribe("chat");
      pusherClientInstance.disconnect();
      console.log("disconnected");
    };
  }, []);

  //set a timeout for 7 seconds in a useEffect to reorder msgs acc to waittime in the resStream state
  // and then set the resString state to the final string

  useEffect(() => {
    const timeout = setTimeout(() => {
      const sortedResStream = resStream.sort((a, b) => a.waitTime - b.waitTime);
      const finalResString = sortedResStream.reduce(
        (acc, curr) => acc + " " + curr.message.content,
        ""
      );
      setResString(finalResString);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [resStream]);

  useEffect(() => {
    const fetcher = async () => {
      const { data: videoData } = await axios.get(`/api/video/${id}`);
      const { data: transcriptData } = await axios.get(
        `/api/video/${id}/transcripts`
      );

      setData(videoData);
      setTranscripts(transcriptData?.transcript);
    };

    fetcher();
  }, []);

  const submissionHandler = async () => {
    const { data: res } = await axios.post(
      `/api/contentconvertor`,
      {
        msgs: clientMessages,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res);
    console.log(transcripts);
    console.log(clientMessages);
  };

  return (
    <div>
      {/* <div className="my-6 shadow-lg rounded-lg">{JSON.stringify(data)}</div> */}
      <div className="my-6 shadow-lg rounded-lg">
        {JSON.stringify(transcripts)}
      </div>
      <div className="my-6 shadow-lg rounded-lg">
        {JSON.stringify(resStream)}
      </div>
      <div className="my-6 shadow-lg rounded-lg">{resString}</div>

      <button onClick={submissionHandler}>Generate in a click!</button>
    </div>
  );
};

export default ContentCreationPage;
