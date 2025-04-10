import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Users',
        data: [200, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    responsive: true,
  };

  return (
    <Box sx={{
     height:'400px',
     width:'300px'
    }}>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default PieChart;