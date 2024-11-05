// src/components/Analytics.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,  // Import for Pie chart
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';  // Import Pie chart

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement  // Register ArcElement for Pie chart
);

const Analytics = () => {
  // Sales by Category data for Pie chart
  const categoryData = {
    labels: ['Shoes', 'Clothes', 'Accessories', 'Bags', 'Others'],
    datasets: [
      {
        label: 'Sales by Category (in PKR)',
        data: [300000, 500000, 200000, 150000, 100000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
      },
    ],
  };

  // Monthly Profit Trends data
  const profitData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Profit (in PKR)',
        data: [35000, 19000, 25000, 36000, 6000, 30000],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Poppins, sans-serif',
          },
          color: '#333',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          family: 'Poppins, sans-serif',
          size: 14,
        },
        bodyFont: {
          family: 'Poppins, sans-serif',
          size: 12,
        },
        padding: 10,
        cornerRadius: 6,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.formattedValue} PKR`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#444',
          font: {
            size: 13,
            family: 'Poppins, sans-serif',
          },
        },
        title: {
          display: true,
          text: 'Amount (PKR)',
          color: '#444',
          font: {
            size: 14,
            family: 'Poppins, sans-serif',
          },
        },
        grid: {
          color: 'rgba(220, 220, 220, 0.5)',
          borderDash: [4, 4],
        },
      },
      x: {
        ticks: {
          color: '#444',
          font: {
            size: 13,
            family: 'Poppins, sans-serif',
          },
        },
        title: {
          display: true,
          text: 'Months',
          color: '#444',
          font: {
            size: 14,
            family: 'Poppins, sans-serif',
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #e0f7fa, #f1f8e9)',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        marginLeft:"100px"
      }}
    >
      <h2
        style={{
          fontFamily: 'Poppins, sans-serif',
          color: '#333',
          marginBottom: '20px',
          textAlign: 'center',
          letterSpacing: '0.5px',
        }}
      >
        Financial Analytics Dashboard
      </h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {/* Sales by Category Chart (Pie) */}
        <div style={{ flex: 1, height: '400px', marginBottom: '30px' }}>
          <h3
            style={{
              fontFamily: 'Poppins, sans-serif',
              color: '#333',
              textAlign: 'center',
            }}
          >
            Sales by Category
          </h3>
          <Pie data={categoryData} options={{ responsive: true }} />
        </div>

        {/* Monthly Profit Trends Chart */}
        <div style={{ flex: 1, height: '400px', marginBottom: '30px' }}>
          <h3
            style={{
              fontFamily: 'Poppins, sans-serif',
              color: '#333',
              textAlign: 'center',
            }}
          >
            Monthly Profit Trends
          </h3>
          <Line data={profitData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
