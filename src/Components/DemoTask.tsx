import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, TextField, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import VisibilityIcon from '@mui/icons-material/Visibility';
import AddTaskModal from './Tasks';
import { RootState } from '../redux/store';
import { Task, addTask, deleteTask } from '../redux/Taskslice';

const DataTable = () => {
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);

  const filteredRows = tasks.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddTask = (data: Omit<Task, 'id'>) => {
    const newTask: Task = { ...data, id: Date.now() };
    dispatch(addTask(newTask));
    setOpenModal(false);
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleEditTask =
  (id: number)=>{
    dispatch(deleteTask(id));
  };


  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email ID', width: 200 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => setViewTask(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteTask(params.row.id)} color="error">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => handleEditTask(params.row.id)} color="error">
            <EditIcon />
          </IconButton>
        </>
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
        pageSizeOptions={[5, 10]}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
        sx={{ border: 0 }}
      />

      <AddTaskModal open={openModal} onClose={() => setOpenModal(false)} onSubmit={handleAddTask} />

      <Dialog open={!!viewTask} onClose={() => setViewTask(null)}>
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent dividers>
          {viewTask && (
            <>
              <Typography variant="subtitle1"><strong>Name:</strong> {viewTask.name}</Typography>
              <Typography variant="subtitle1"><strong>Email:</strong> {viewTask.email}</Typography>
              <Typography variant="subtitle1"><strong>Title:</strong> {viewTask.title}</Typography>
              <Typography variant="subtitle1"><strong>Description:</strong> {viewTask.description}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewTask(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DataTable;
