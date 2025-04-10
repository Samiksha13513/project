
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
          <LineChart />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PieChart />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BarChart />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DoughnutChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

<Box sx={{ height: 300, p: 2, border: '1px solid #eee', borderRadius: 2 }}>
  <LineChart />
</Box>
