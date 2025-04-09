// import { Box } from "@mui/material";
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


// const Dashboard = () => {
//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//       {
//         label: 'Sales over Time',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: false,
//         borderColor: 'rgba(75,192,192,1)',
//         tension: 0.1,
//       },
//     ],
//   };
//   // Options for the chart (optional)
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//   };

//   return (
//     <Box>
//        <Line data={data} options={options} />
//     </Box>
//   );
// };

// export default Dashboard;
// import React from 'react';
import { Box, Grid } from '@mui/material';
import LineChart from './LineChart';
import PieChart from './PieChart';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';

const Dashboard = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <LineChart />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <PieChart />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <BarChart />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DoughnutChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;