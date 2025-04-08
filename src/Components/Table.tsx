import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, IconButton, Typography, Modal, TablePagination, Paper } from '@mui/material';
import { Visibility, Delete, Close } from '@mui/icons-material';
import { useUser } from '../ContextApi/UserContext';

const Tables = () => {
  const { users, deleteUser } = useUser();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = (user: any) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (email: string) => {
   
    deleteUser(email);
  
    alert('Are You sure ?');
  };
  
  

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4}>No users available</TableCell>
                </TableRow>
              ) : (
                users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.password}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => handleOpen(user)}>
                          <Visibility sx={{ color: "primary.main" }} />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(user.email)} sx={{ ml: 2 }}>
                          <Delete sx={{ color: "error.main" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey.500',
            }}
          >
            <Close />
          </IconButton>
          {selectedUser && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                User Details
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Name:</strong> {selectedUser.name}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                <strong>Password:</strong> {selectedUser.password}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  width: 400,
};

export default Tables;
