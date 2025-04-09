
import { Box, Grid } from '@mui/material';
import LineChart from '../Components/LineChart';
import PieChart from '../Components/PieChart';
import BarChart from '../Components/BarChart';
import DoughnutChart from '../Components/DoughnutChart';

const Dashboard = () => {
  return (
    <Box>
       <Grid container spacing={3}> 
         <Grid item xs={12} sm={6} md={2}> 
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
         </Grid> *
       </Grid> 
    </Box>
  );
};
export default Dashboard;