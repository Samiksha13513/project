
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Task from '../Components/Task'

const columns: GridColDef[] = [
  { field: 'profile', headerName: 'Profile', width: 130 },
  { field: 'title', headerName: 'Title', width: 150 },
  { field: 'assign', headerName: 'Assign', width: 150 },
  { field: 'description', headerName: 'Description', width: 200 },
];

const rows = [
  {
    id: 1,
    profile: 'User 1',
    title: 'Developer',
    assign: 'Manager 1',
    description: 'Frontend development tasks',
  },
  {
    id: 2,
    profile: 'User 2',
    title: 'Designer',
    assign: 'Manager 2',
    description: 'UI/UX design work',
  },
  {
    id: 2,
    profile: 'User 2',
    title: 'Designer',
    assign: 'Manager 2',
    description: 'UI/UX design work',
  }, {
    id: 2,
    profile: 'User 2',
    title: 'Designer',
    assign: 'Manager 2',
    description: 'UI/UX design work',
  }, {
    id: 2,
    profile: 'User 2',
    title: 'Designer',
    assign: 'Manager 2',
    description: 'UI/UX design work',
  }, {
    id: 2,
    profile: 'User 2',
    title: 'Designer',
    assign: 'Manager 2',
    description: 'UI/UX design work',
  }, {
    id: 2,
    profile: 'User 2',
    title: 'Designer',
    assign: 'Manager 2',
    description: 'UI/UX design work',
  }, {
    id: 2,
    profile: 'User 2',
    title: 'Designer',
    assign: 'Manager 2',
    description: 'UI/UX design work',
  },
];

export default function DataTable() {
  const navigate = useNavigate();

  const handleAddTask = () => {
   <Task/>; 
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Task Assignments</h2>
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Box>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}
