// TimeSlotComponent.js
"use client";
import React, { useState } from "react";

const initialTimeSlots = [
  { id: "slot1", time: "9:00 AM - 10:00 AM", ideas: [] },
  { id: "slot2", time: "10:00 AM - 11:00 AM", ideas: [] },
  { id: "slot3", time: "11:00 AM - 12:00 PM", ideas: [] },
  // Add more time slots as needed
];

const TimeSlotComponent = () => {
  const [timeSlots, setTimeSlots] = useState(initialTimeSlots);
  const [ideas, setIdeas] = useState([
    { id: "idea1", text: "Idea 1", executionTime: null },
    { id: "idea2", text: "Idea 2", executionTime: null },
    { id: "idea3", text: "Idea 3", executionTime: null },
    // Add more ideas as needed
  ]);

  const handleDragStart = (e, ideaId) => {
    e.dataTransfer.setData("text/plain", ideaId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    const ideaId = e.dataTransfer.getData("text/plain");

    const updatedTimeSlots = timeSlots.map((slot) => {
      return {
        ...slot,
        ideas:
          slot.id === slotId
            ? [...slot.ideas, ideaId]
            : slot.ideas.filter((id) => id !== ideaId),
      };
    });

    setTimeSlots(updatedTimeSlots);
  };

  const handleTimeChange = (ideaId, time) => {
    const updatedIdeas = ideas.map((idea) =>
      idea.id === ideaId ? { ...idea, executionTime: time } : idea
    );

    setIdeas(updatedIdeas);
  };

  return (
    <div className="flex space-x-4 p-4">
      {timeSlots.map((slot) => (
        <div key={slot.id} className="flex flex-col">
          <h2 className="text-lg font-semibold mb-2">{slot.time}</h2>
          <div
            className="border border-dashed border-gray-400 p-4 mb-4"
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, slot.id)}
          >
            {slot.ideas.map((ideaId) => {
              const idea = ideas.find((idea) => idea.id === ideaId);
              return (
                <div
                  key={idea.id}
                  className="bg-blue-200 p-2 mb-2 cursor-pointer"
                  onClick={() => handleTimeChange(idea.id, slot.time)}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idea.id)}
                >
                  {idea.text}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeSlotComponent;
