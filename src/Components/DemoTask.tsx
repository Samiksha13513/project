import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, TextField, Box, Button } from '@mui/material';
import AddTaskModal from './Tasks';
import { RootState } from '../redux/store';

const DataTable = () => {
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const tasks = useSelector((state: RootState) => state.task.tasks);

  const filteredRows = tasks.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email ID', width: 200 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button variant="outlined" size="small" onClick={() => alert(`Task ID: ${params.row.id}`)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 500, width: '100%', p: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 300 }}
        />
        <Button variant="contained" onClick={() => setOpenModal(true)}>
          Add Task
        </Button>
      </Box>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />

      <AddTaskModal open={openModal} onClose={() => setOpenModal(false)} />
    </Paper>
  );
};

export default DataTable;
