"use client";

import { useState, useEffect } from "react";
import { Goal } from "@/types";
import { useStore } from "@/store";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip
);

interface ProgressChartProps {
  goal: Goal;
}

const ProgressChart = ({ goal }: ProgressChartProps) => {
  const { supabaseUrl } = useStore();
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "Progress",
        data: [],
        borderColor: "#4299E1",
        backgroundColor: "#EBF0FF",
      },
    ],
  });

  useEffect(() => {
    // Fetch progress data for the goal
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${supabaseUrl}/api/goals/${goal.id}/progress`
        );
        const data = await response.json();
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Progress",
              data: data.progress,
              borderColor: "#4299E1",
              backgroundColor: "#EBF0FF",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching progress data:", error);
      }
    };

    fetchData();
  }, [goal.id, supabaseUrl]);

  return (
    <div className="w-full h-48 rounded-md overflow-hidden">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Progress Chart",
              font: {
                size: 16,
              },
            },
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Progress",
                font: {
                  size: 14,
                },
              },
            },
            x: {
              title: {
                display: true,
                text: "Date",
                font: {
                  size: 14,
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default ProgressChart;