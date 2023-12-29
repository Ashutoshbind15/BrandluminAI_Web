"use client";

import React, { useState } from "react";

import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";

const BarGraph = ({ data = sampleData, view = "weekly" }) => {
  return (
    <div className="">
      {view === "weekly" && (
        <div className="">
          <Bar
            data={{
              datasets: [
                {
                  label: "My First Dataset",
                  data: data?.weekly,
                  backgroundColor: "black",
                },
              ],
              labels: data?.weekly.map((_, index) => index + 1),
            }}
          />
        </div>
      )}

      {view === "monthly" && (
        <div className="">
          <Bar
            data={{
              datasets: [
                {
                  label: "My First Dataset",
                  data: data?.monthly,
                  backgroundColor: "black",
                },
              ],
              labels: data?.monthly.map((_, index) => index + 1),
            }}
          />
        </div>
      )}

      {view === "yearly" && (
        <div className="">
          <Bar
            data={{
              datasets: [
                {
                  label: "My First Dataset",
                  data: data?.yearly,
                  backgroundColor: "black",
                },
              ],
              labels: data?.yearly.map((_, index) => index + 1),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BarGraph;
