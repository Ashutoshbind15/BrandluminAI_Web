"use client";

import React, { useState } from "react";

import PieChart from "../components/UI/Graphs/PieChart";
import BarGraph from "../components/UI/Graphs/BarGraph";
import Influencer from "../components/Components/Dashboard/Influencer";
import DragAndDropContainer from "../components/Wrappers/Helpers/Draganddrop";
import { Line } from "react-chartjs-2";
import IdeaListItemSm from "../components/Components/Ideas/IdeaListItemSm";
import Insights from "../components/Components/Dashboard/Insights";

const sampleData = {
  weekly: [120, 200, 150, 300, 180, 250, 200],
  monthly: [800, 1200, 1000, 1500, 1200, 1800, 1600],
  yearly: [10000, 12000, 15000, 18000, 20000, 25000, 22000],
};

const SubComponent = ({ view, className, setView }) => {
  return (
    <div className={`${className} flex flex-col px-4`}>
      <div className="flex bg-black text-white items-center justify-around py-2 mb-6">
        <button
          onClick={() => setView("weekly")}
          className={`${
            view === "weekly" ? "bg-white text-black" : null
          } px-4 py-0.5`}
        >
          Weekly
        </button>
        <button
          onClick={() => setView("monthly")}
          className={`${
            view === "monthly" ? "bg-white text-black" : null
          } px-4 py-0.5`}
        >
          Monthly
        </button>
        <button
          onClick={() => setView("yearly")}
          className={`${
            view === "yearly" ? "bg-white text-black" : null
          } px-4 py-0.5`}
        >
          Yearly
        </button>
      </div>
      <BarGraph view={view} data={sampleData} />
    </div>
  );
};

const Parent = () => {
  const [view, setView] = useState("weekly");

  const [feedback, setFeedback] = useState("positive"); // ["positive", "lookout"]

  const socialMediaData = {
    Facebook: 1200,
    Twitter: 800,
    Instagram: 1500,
    LinkedIn: 1000,
    YouTube: 2000,
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center my-6">
        <SubComponent view={view} className={"w-1/3"} setView={setView} />

        <Influencer className={"w-1/3 self-stretch px-4"} />

        <div className="self-stretch px-4 flex items-center flex-1">
          <DragAndDropContainer>
            <Line
              data={{
                datasets: [
                  {
                    label: "My First Dataset",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: "black",
                    tension: 0.1,
                  },
                ],
                labels: [1, 2, 3, 4, 5, 6, 7],
              }}
            />
          </DragAndDropContainer>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-1/3 self-stretch px-8">
          <IdeaListItemSm />
          <IdeaListItemSm />
        </div>
        <div className="w-1/3 self-stretch px-2 flex flex-col justify-around mb-4">
          <div className="flex w-full justify-around bg-black text-white py-2">
            <button
              onClick={() => setFeedback("positive")}
              className={`${
                feedback === "positive" ? "bg-white text-black" : null
              } px-4 py-0.5`}
            >
              Positive
            </button>
            <button
              onClick={() => setFeedback("lookout")}
              className={`${
                feedback === "lookout" ? "bg-white text-black" : null
              } px-4 py-0.5`}
            >
              Lookout
            </button>
          </div>

          <Insights />
          <Insights />
          <Insights />
        </div>
        <div className="w-1/3 bg-red-200">
          <PieChart data={socialMediaData} />
        </div>
      </div>
    </div>
  );
};

export default Parent;
