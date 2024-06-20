import React, { useState } from "react";
import { ideaMoodAtom } from "@/app/utils/stateStore/ideaAtoms";
import { useAtom } from "jotai";
import { Button } from "../../utilUI/ui/button";
const moodTypes = ["Happy", "Sad", "Angry", "Excited", "Bored", "Confused"];

const MoodButton = ({ mood, toggleMood, isSet }) => {
  return (
    <Button
      onClick={() => {
        toggleMood(mood);
      }}
      className={`${isSet ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {mood}
    </Button>
  );
};

const MoodSelector = () => {
  const [moods, setMoods] = useAtom(ideaMoodAtom);

  const handleMoodChange = (mood) => {
    setMoods((p) => {
      if (p.includes(mood)) {
        return p.filter((i) => i !== mood);
      } else {
        return [...p, mood];
      }
    });
  };

  return (
    <div className="py-6">
      <div className="grid grid-cols-4 gap-x-1 items-center">
        <p className="font-bold text-xl pl-4">
          Where do u plan to post this idea?
        </p>
        <div className="col-span-3 grid grid-cols-4  gap-y-4">
          {moodTypes.map((mood, i) => (
            <MoodButton
              mood={mood}
              toggleMood={handleMoodChange}
              isSet={moods.includes(mood) ? true : false}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;
