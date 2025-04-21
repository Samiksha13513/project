import { useEffect, useState } from 'react';
import { Box, Button, TextField, Modal, Typography, Paper, Avatar } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Task from '../Components/Task';
import { useUser } from '../ContextApi/UserContext.tsx';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const STORAGE_KEY = 'taskRows';

export default function DataTable() {
  const { currentUser, users } = useUser();
  const [rows, setRows] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && currentUser?.email) {
      const allTasks = JSON.parse(stored);
      const myTasks = allTasks.filter((task: any) => task.assign === currentUser.email);
      setRows(myTasks);
    }
  }, [currentUser]);

  const handleAddTask = (data: any) => {
    if (!currentUser) return;

    const assignedUser = users.find((u) => u.email === data.user);
    if (!assignedUser) {
      alert("Selected assigned user not found");
      return;
    }

    const newRow = {
      id: Date.now(),
      profile: localStorage.getItem(`profileImage-${data.user}`) || '',
      name: assignedUser.name,
      email: currentUser.email, 
      title: data.title,
      assign: data.user, 
      description: data.description,
    };

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updated = [...existing, newRow];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    
    const updatedVisible = updated.filter((task: any) => task.assign === currentUser.email);
    setRows(updatedVisible);
    setOpenModal(false);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.title.toLowerCase().includes(search.toLowerCase()) ||
      row.assign.toLowerCase().includes(search.toLowerCase())
  );

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar src={params.row.profile} sx={{ width: 32, height: 32 }}>
            {!params.row.profile && params.row.name.charAt(0)}
          </Avatar>
          <Typography variant="body2">{params.row.name}</Typography>
        </Box>
      ),
    },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'assign', headerName: 'Assign (Email)', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Box textAlign="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Task Assignments
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        gap={2}
        flexWrap="wrap"
      >
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: 300 }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenModal(true)}
        >
          Add Task
        </Button>
      </Box>

      <Paper
        elevation={3}
        sx={{
          height: 450,
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #ccc',
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              color: '#333',
              fontWeight: 'bold',
              fontSize: '16px',
              borderBottom: '1px solid #ddd',
            },
            '& .MuiDataGrid-row': {
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-cell': {
              fontSize: '14px',
            },
            '& .MuiDataGrid-selectedRowCount': {
              visibility: 'hidden',
            },
          }}
        />
      </Paper>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="add-task-modal"
      >
        <Box sx={modalStyle}>
          <Task onSubmit={handleAddTask} />
        </Box>
      </Modal>
    </Box>
  );
}
