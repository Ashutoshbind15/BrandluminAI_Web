"use client";

import React from "react";
import { useState } from "react";
import CustomCalendar from "../components/UI/Calenders/CustomCalender";

const Scheduler = ({
  ideas = ["Idea 1", "Idea 2", "Idea 3", "Idea 4", "Idea 5", "Idea 6"],
}) => {
  const [dynamicIdeas, setDynamicIdeas] = useState(ideas);
  const [calendar, setCalendar] = useState(new Date());
  const [selfSchedule, setSelfSchedule] = useState([]);
  const [automateSchedule, setAutomateSchedule] = useState([]);
  const [slot, setSlot] = useState("morning");

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDrop = (e, box) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const draggedIdea = dynamicIdeas[draggedIndex];
    const updatedIdeas = dynamicIdeas.filter((_, i) => i !== draggedIndex);

    switch (box) {
      case "selfSchedule":
        setSelfSchedule([...selfSchedule, draggedIdea]);
        break;
      case "automateSchedule":
        setAutomateSchedule([...automateSchedule, draggedIdea]);
        break;
      default:
        break;
    }

    setDynamicIdeas(updatedIdeas);
  };

  return (
    <div className="flex items-center w-full p-8">
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
      <div className="w-2/5">
        <div className="flex w-full underline decoration-blue-700 font-semibold text-lg items-center justify-around">
          <div
            onClick={() => setSlot("morning")}
            className={`${
              slot === "morning" ? "bg-blue-700 text-white" : ""
            } px-3 py-1 rounded-md`}
          >
            Morning
          </div>
          <div
            onClick={() => setSlot("noon")}
            className={`${
              slot === "noon" ? "bg-blue-700 text-white" : ""
            } px-3 py-1 rounded-md`}
          >
            Noon
          </div>
          <div
            onClick={() => setSlot("eve")}
            className={`${
              slot === "eve" ? "bg-blue-700 text-white" : ""
            } px-3 py-1 rounded-md`}
          >
            Eve
          </div>
        </div>
      </div>

      <div className="w-2/5  flex items-center">
        <div className="flex flex-col w-1/2 items-center px-4">
          <CustomCalendar
            selectedDate={calendar}
            setSelectedDate={setCalendar}
          />
        </div>

        <div className="pl-4 w-1/2">
          <div className="flex flex-col items-center w-full">
            <h2 className="">To Be Done</h2>
            <div
              className="h-64 border border-dashed border-gray-400 p-4 mb-4 w-full"
              onDrop={(e) => handleDrop(e, "selfSchedule")}
              onDragOver={(e) => e.preventDefault()}
            >
              {selfSchedule.map((idea, index) => (
                <div key={index} className="bg-blue-200 p-2 mb-2">
                  {idea}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <h1>Generate</h1>
            <div
              className="h-64 border border-dashed border-gray-400 mb-4 w-full"
              onDrop={(e) => handleDrop(e, "automateSchedule")}
              onDragOver={(e) => e.preventDefault()}
            >
              {automateSchedule.map((idea, index) => (
                <div key={index} className="bg-blue-200 p-2 mb-2">
                  {idea}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
