import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { DailyTemperatureBaseNode } from '../../dailyTemperatureTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// TODO: Fix any type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const options: any = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'white',
      },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (context: {
          dataset: { label: string };
          raw: number | null;
        }) {
          const value = context.raw;
          return value !== null
            ? `${context.dataset.label}: ${value}°C`
            : `${context.dataset.label}: No Data`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
        color: 'white',
      },
      ticks: {
        color: 'white',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Temperature (°C)',
        color: 'white',
      },
      ticks: {
        color: 'white',
      },
    },
  },
};

interface DailyTemperatureChartProps {
  dailyTemperature: DailyTemperatureBaseNode[];
}

export const DailyTemperatureChart = ({
  dailyTemperature,
}: DailyTemperatureChartProps) => {
  const labels = dailyTemperature.map((item) => item.date);
  const temperatureMaxData = dailyTemperature.map(
    (item) => item.temperatureMax,
  );
  const temperatureMinData = dailyTemperature.map(
    (item) => item.temperatureMin,
  );

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: 'Max Temperature',
          data: temperatureMaxData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          pointRadius: 3,
          fill: false,
        },
        {
          label: 'Min Temperature',
          data: temperatureMinData,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 2,
          pointRadius: 3,
          fill: false,
        },
      ],
    }),
    [labels, temperatureMaxData, temperatureMinData],
  );

  return <Line data={chartData} options={options} />;
};
