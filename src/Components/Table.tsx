import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Box, IconButton, Typography, Modal, TablePagination, Paper, TextField, InputAdornment, Checkbox, TableSortLabel, Button } from '@mui/material';
import { Visibility, Delete, Close, Search } from '@mui/icons-material';
import { useUser } from '../ContextApi/UserContext';

const Tables = () => {
  const { users, deleteUser } = useUser();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');

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
    alert('Are You sure?');
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allEmails = users.map(user => user.email);
      setSelectedUsers(new Set(allEmails));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLInputElement>, email: string) => {
    const newSelectedUsers = new Set(selectedUsers);
    if (event.target.checked) {
      newSelectedUsers.add(email);
    } else {
      newSelectedUsers.delete(email);
    }
    setSelectedUsers(newSelectedUsers);
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (orderBy === 'name') {
      return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    return 0; 
  });

  return (
    <Box sx={{flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
      <Paper sx={{ width: '100%', }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
          {/* Search Bar */}
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          {/* Add Customer Button */}
          <Button variant="contained" color="primary">Add Customer</Button>
        </Box>

        {/* Table with checkboxes */}
        {/* <TableContainer> */}
        <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" width='100%'>
                  <Checkbox
                    checked={selectedUsers.size === users.length}
                    onChange={handleSelectAll}
                    inputProps={{
                      'aria-label': 'select all users',
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Password</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5}>No users available</TableCell>
                </TableRow>
              ) : (
                sortedUsers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.has(user.email)}
                          onChange={(e) => handleSelectUser(e, user.email)}
                          inputProps={{
                            'aria-labelledby': user.name,
                          }}
                        />
                      </TableCell>
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
        {/* </TableContainer> */}

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
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
