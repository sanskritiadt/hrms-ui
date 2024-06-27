import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const prepareGraphData = (data) => {
  const dates = data.map((entry) => entry.date);
  const workingHours = data.map((entry) => {
    return entry.workingHour ? parseInt(entry.workingHour) : 0;
  });
  return {
    labels: dates,
    datasets: [
      {
        label: 'Working Performance',
        data: workingHours,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart creation
            return;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(75,192,192,0.4)');
          gradient.addColorStop(1, 'rgba(75,192,192,0)');
          return gradient;
        },
        borderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };
};

const Graph = ({ data }) => {
  const chartData = prepareGraphData(data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#333',
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        footerFont: {
          size: 12,
        },
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value} hours`;
          },
        },
      },
      title: {
        display: true,
        text: 'Employee Attendance Graph',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#333',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#666',
        },
      },
      y: {
        grid: {
          color: 'rgba(200,200,200,0.2)',
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#666',
          beginAtZero: true,
        },
        title: {
          display: true,
          text: 'Working Hours',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#666',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Graph;
