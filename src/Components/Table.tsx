import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Box, IconButton,
  Typography, Modal, TablePagination, Paper, TextField, InputAdornment,
  Checkbox, TableSortLabel, Button, Switch
} from '@mui/material';
import { Visibility, Delete, Close, Search } from '@mui/icons-material';
import { useUser } from '../ContextApi/UserContext';
import Mainpage from '../Pages/Mainpage';

const Tables = () => {
 
  const { users, deleteUser, updateUserStatus, addUser, currentUser } = useUser();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', email: '', password: '' });

  const filteredUsers = users
    .filter(user => user.email !== currentUser?.email)
    .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (orderBy === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return 0;
    });

  const handleOpen = (user: any) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = (email: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(email);
    }
  };

  const handleChangePage = (_: any, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUsers(event.target.checked ? new Set(filteredUsers.map(u => u.email)) : new Set());
  };

  const handleSelectUser = (e: React.ChangeEvent<HTMLInputElement>, email: string) => {
    const updated = new Set(selectedUsers);
    e.target.checked ? updated.add(email) : updated.delete(email);
    setSelectedUsers(updated);
  };

  const handleAddCustomerOpen = () => setAddModalOpen(true);

  const handleAddCustomerClose = () => {
    setAddModalOpen(false);
    setNewCustomer({ name: '', email: '', password: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = () => {
    const { name, email, password } = newCustomer;
    if (name && email && password) {
      const newUser = {
        ...newCustomer,
        createdAt: new Date().toLocaleDateString(),
        isActive: true,
      };
      addUser(newUser);
      handleAddCustomerClose();
      setPage(0);
    } else {
      alert('Please fill out all fields.');
    }
  };

  const handleStatusChange = (email: string, isActive: boolean) => {
    updateUserStatus(email, isActive);
  };

  return (
    <>
   
    <Box sx={{ width: '100%' }}>
      <Paper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
          <TextField
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              )
            }}
          />
          <Button onClick={handleAddCustomerOpen} variant="contained">
            Add Customer
          </Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedUsers.size === filteredUsers.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={order}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
              <TableRow key={user.email}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedUsers.has(user.email)}
                    onChange={(e) => handleSelectUser(e, user.email)}
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.isActive}
                    onChange={(e) => handleStatusChange(user.email, e.target.checked)}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpen(user)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.email)}>
                    <Delete color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* View Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Close />
          </IconButton>
          {selectedUser && (
            <>
              <Typography variant="h6">User Details</Typography>
              <Typography>Name: {selectedUser.name}</Typography>
              <Typography>Email: {selectedUser.email}</Typography>
            </>
          )}
        </Box>
      </Modal>

      {/* Add Customer Modal */}
      <Modal open={addModalOpen} onClose={handleAddCustomerClose}>
        <Box sx={modalStyle}>
          <IconButton onClick={handleAddCustomerClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Close />
          </IconButton>
          <Typography variant="h6" gutterBottom>Add New Customer</Typography>
          <TextField fullWidth label="Name" name="name" value={newCustomer.name} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth label="Email" name="email" value={newCustomer.email} onChange={handleInputChange} margin="normal" />
          <TextField fullWidth label="Password" name="password" type="password" value={newCustomer.password} onChange={handleInputChange} margin="normal" />
          <Button fullWidth variant="contained" onClick={handleAddCustomer} sx={{ mt: 2 }}>
            Add Customer
          </Button>
        </Box>
      </Modal>
    </Box>
    </>
  
  );
};
const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default Tables;
