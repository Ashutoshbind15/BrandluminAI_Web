"use client";

import React from "react";
import SideBars from "../components/Layout/SideBars";
import { useState } from "react";
import Calendar from "react-calendar";

const Scheduler = ({
  ideas = ["Idea 1", "Idea 2", "Idea 3", "Idea 4", "Idea 5", "Idea 6"],
}) => {
  const [dynamicIdeas, setDynamicIdeas] = useState(ideas);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const [utube, setUtube] = useState([]);
  const [insta, setInsta] = useState([]);
  const [snap, setSnap] = useState([]);
  const [lin, setLin] = useState([]);

  const handleDrop = (e, box) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const draggedIdea = dynamicIdeas[draggedIndex];
    const updatedIdeas = dynamicIdeas.filter((_, i) => i !== draggedIndex);

    switch (box) {
      case "utube":
        setUtube([...utube, draggedIdea]);
        break;
      case "insta":
        setInsta([...insta, draggedIdea]);
        break;
      case "snap":
        setSnap([...snap, draggedIdea]);
        break;
      case "lin":
        setLin([...lin, draggedIdea]);
        break;
      default:
        break;
    }

    setDynamicIdeas(updatedIdeas);
  };

  return (
    <div className="flex items-center w-full">
      <div className="w-1/5">
        {dynamicIdeas.map((idea, index) => (
          <div
            key={index}
            className="bg-gray-200 p-2 mb-2"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={() => {}}
          >
            {idea}
          </div>
        ))}
      </div>

      <div className="w-2/5 flex items-center flex-wrap">
        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">YouTube</h2>
          <div
            className="h-64 border border-dashed border-gray-400 p-4 mb-4"
            onDrop={(e) => handleDrop(e, "utube")}
            onDragOver={(e) => e.preventDefault()}
          >
            {utube.map((idea, index) => (
              <div key={index} className="bg-blue-200 p-2 mb-2">
                {idea}
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">Instagram</h2>
          <div
            className="h-64 border border-dashed border-gray-400 p-4 mb-4"
            onDrop={(e) => handleDrop(e, "insta")}
            onDragOver={(e) => e.preventDefault()}
          >
            {insta.map((idea, index) => (
              <div key={index} className="bg-pink-200 p-2 mb-2">
                {idea}
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">Snapchat</h2>
          <div
            className="h-64 border border-dashed border-gray-400 p-4 mb-4"
            onDrop={(e) => handleDrop(e, "snap")}
            onDragOver={(e) => e.preventDefault()}
          >
            {snap.map((idea, index) => (
              <div key={index} className="bg-yellow-200 p-2 mb-2">
                {idea}
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2 p-4">
          <h2 className="text-xl font-semibold mb-4">LinkedIn</h2>
          <div
            className="h-64 border border-dashed border-gray-400 p-4 mb-4"
            onDrop={(e) => handleDrop(e, "lin")}
            onDragOver={(e) => e.preventDefault()}
          >
            {lin.map((idea, index) => (
              <div key={index} className="bg-green-200 p-2 mb-2">
                {idea}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-2/5  flex items-center">
        <div className="flex flex-col w-1/2 items-center">
          <Calendar className={"border-1 border-black"} />
        </div>
        <div className="flex flex-col w-1/2 items-center">
          {/* <Calendar />
          <Calendar /> */}
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
