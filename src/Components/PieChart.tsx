import { Pie } from 'react-chartjs-2';
import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = () => {
  const data = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance',
        data: [180, 45],
        backgroundColor: [
          'rgba(173,216,230,1)', 
          'rgba(255,218,185,1)', 
        ],
        borderColor: ['rgba(144,238,144,1)', 'rgba(255,182,193,1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      datalabels: {
        color: '#000',
        formatter: (value: number, context: any) => {
          const dataset = context.chart.data.datasets[0];
          const total = dataset.data.reduce((sum: number, val: number) => sum + val, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        font: {
          weight: 'bold' as const,
          size: 14,
        },
      },
    },
  };

  return (
    <Box sx={{ width: 300, height: 260, m: 2 }}>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default PieChart;
