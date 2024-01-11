"use client";

import React from "react";
import { useState } from "react";
import CustomCalendar from "../components/UI/Calenders/CustomCalender";
import TopBars from "../components/Layout/TopBars";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";

const Scheduler = ({
  ideas = ["Idea 1", "Idea 2", "Idea 3", "Idea 4", "Idea 5", "Idea 6"],
}) => {
  const [dynamicIdeas, setDynamicIdeas] = useState(ideas);
  const [calendar, setCalendar] = useState(new Date());
  const [selfSchedule, setSelfSchedule] = useState([]);
  const [automateSchedule, setAutomateSchedule] = useState([]);
  const [slot, setSlot] = useState("morning");

  const [scheduleTypeState, setScheduleTypeState] = useState("selfSchedule");

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
      <div className="w-1/3 border-r-1 border-black flex items-center flex-col justify-center">
        <div className="flex flex-col w-1/2 items-center px-4">
          <CustomCalendar
            selectedDate={calendar}
            setSelectedDate={setCalendar}
          />
        </div>
      </div>
      <div className="w-1/3 border-r-1 border-black flex flex-col items-center">
        <div className="pl-4 w-full">
          <TopBars
            state={scheduleTypeState}
            setState={setScheduleTypeState}
            listItems={["selfSchedule", "Generate"]}
            parentStyles={"my-6"}
            selectedItemStyles={"bg-white text-black"}
          />
          {scheduleTypeState === "selfSchedule" && (
            <div className="flex flex-col items-center w-full">
              <div
                className="border border-dashed border-gray-400 p-4 mb-4 w-full"
                onDrop={(e) => handleDrop(e, "selfSchedule")}
                onDragOver={(e) => e.preventDefault()}
              >
                {selfSchedule.map((idea, index) => (
                  <div key={index} className="bg-black p-2 mb-2 text-white">
                    {idea}
                  </div>
                ))}
              </div>
            </div>
          )}
          {scheduleTypeState === "Generate" && (
            <div className="flex flex-col items-center w-full">
              <h1>Generate</h1>
              <div
                className="h-64 border border-dashed border-gray-400 mb-4 w-full"
                onDrop={(e) => handleDrop(e, "automateSchedule")}
                onDragOver={(e) => e.preventDefault()}
              >
                {automateSchedule.map((idea, index) => (
                  <div key={index} className="bg-black p-2 mb-2 text-white">
                    {idea}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full flex items-center justify-center">
            <PrimaryButton onClick={() => {}}>Reset the ideas</PrimaryButton>
          </div>
        </div>
      </div>

      <div className="w-1/3 flex items-center">
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
    </div>
  );
};

export default Scheduler;
