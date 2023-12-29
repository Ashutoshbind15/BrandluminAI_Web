"use client";

import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#fff", "#ccc", "#999", "#666", "#444"], // Customize colors as needed
        borderWidth: 1,
        borderColor: "#000",
      },
    ],
  };

  return (
    <div className="chart-container h-72">
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
