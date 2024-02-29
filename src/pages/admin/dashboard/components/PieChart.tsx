import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "",
  legend: "none",
  pieSliceText: "label",
  sliceVisibilityThreshold: 0.2, // 20%
  colors: ["#6366f1", "#5b21b6", "#c69c6e"],
};

const PieChart = () => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"250px"}
    />
  );
};

export default PieChart;
