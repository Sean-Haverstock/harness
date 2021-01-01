/* eslint-disable no-tabs */
import React, { Fragment } from "react";
import { Doughnut } from "react-chartjs-2";

const state = {
  labels: ["Max Pull lbs.", "Remaining bodyweight"],
  datasets: [
    {
      label: "Weight in lbs.",
      backgroundColor: ["#2e7d32", "#bf360c"],
      hoverBackgroundColor: ["#60ad5e", "#f9683a"],
      data: [131, 24],
    },
  ],
};

export default class MaxPullChart extends React.Component {
  render() {
    return (
      <>
        <Doughnut
          data={state}
          responsive
          maintainAspectRatio={false}
          options={{
            title: {
              display: true,
              text: "1-Arm Max Force in Pounds",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </>
    );
  }
}
