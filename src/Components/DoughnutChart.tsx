import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const data = {
    labels: ['Red', 'Green', 'Blue'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)'],
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
      <Doughnut data={data} options={options} />
    </Box>
  );
};

export default DoughnutChart;