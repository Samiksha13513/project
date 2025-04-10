import { Box, Grid } from '@mui/material';
import LineChart from '../Components/LineChart';
import PieChart from '../Components/PieChart';
import BarChart from '../Components/BarChart';
import DoughnutChart from '../Components/DoughnutChart';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ height: 400, p: 2, border: '1px solid #eee', borderRadius: 2, boxShadow: 3, backgroundColor: '#fff' }}>
            <LineChart />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ height: 400, p: 2, border: '1px solid #eee', borderRadius: 2, boxShadow: 3, backgroundColor: '#fff' }}>
            <PieChart />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ height: 400, p: 2, border: '1px solid #eee', borderRadius: 2, boxShadow: 3, backgroundColor: '#fff' }}>
            <BarChart />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ height: 400, p: 2, border: '1px solid #eee', borderRadius: 2, boxShadow: 3, backgroundColor: '#fff' }}>
            <DoughnutChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
