import { Box, Grid } from '@mui/material';
import LineChart from '../Components/LineChart';
import PieChart from '../Components/PieChart';
import BarChart from '../Components/BarChart';
import DoughnutChart from '../Components/DoughnutChart';
import Mainpage from './Mainpage';

const Dashboard = () => {
  return (
    <>
   
    <Box sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} sx={{ p: 1 }}>
          <Box sx={{ height: 300, width:450, p: 2, border: '1px solid #eee', borderRadius: 2, paddingLeft:6, boxShadow: 3, backgroundColor: '#fff' }}>
            <LineChart />
          </Box>
        </Grid>        <Grid item xs={12} sm={6}>
          <Box sx={{ height: 300,width: 450, p: 2, border: '1px solid #eee', borderRadius: 2,  paddingLeft:6 ,boxShadow: 3, backgroundColor: '#fff' }}>
            <PieChart />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ height: 300,width:450, p: 2, border: '1px solid #eee', borderRadius: 2, boxShadow: 3, paddingLeft:6, backgroundColor: '#fff' }}>
            <BarChart />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ height: 300,width: 450, p: 2, border: '1px solid #eee', borderRadius: 2, boxShadow: 3,  paddingLeft:6,backgroundColor: '#fff' }}>
            <DoughnutChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Dashboard;
