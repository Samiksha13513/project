import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  IconButton,
  Typography,
  Modal,
  TablePagination,
  Paper,
  TextField,
  InputAdornment,
  Checkbox,
  TableSortLabel,
  Button,
  Switch,
} from "@mui/material";
import { Visibility, Delete, Close, Search } from "@mui/icons-material";
import { useUser } from "../ContextApi/UserContext";

const Tables = () => {
  const { users, deleteUser, updateUserStatus, addUser, currentUser } = useUser();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    password: "",
  });

 
  const filteredUsers = [
    ...(currentUser ? [currentUser] : []),
    ...users.filter((user) => user.email !== currentUser?.email),
  ]
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (orderBy === "name") {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
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
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(email);
    }
  };

  const handleChangePage = (_: any, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUsers(
      event.target.checked
        ? new Set(filteredUsers.map((u) => u.email))
        : new Set()
    );
  };

  const handleSelectUser = (
    e: React.ChangeEvent<HTMLInputElement>,
    email: string
  ) => {
    const updated = new Set(selectedUsers);
    e.target.checked ? updated.add(email) : updated.delete(email);
    setSelectedUsers(updated);
  };

  const handleAddCustomerOpen = () => setAddModalOpen(true);

  const handleAddCustomerClose = () => {
    setAddModalOpen(false);
    setNewCustomer({ name: "", email: "", password: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({ ...prev, [name]: value }));
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
      alert("Please fill out all fields.");
    }
  };

  const handleStatusChange = (email: string, isActive: boolean) => {
    updateUserStatus(email, isActive);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: 2,
            }}
          >
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
                ),
              }}
            />
            <Button onClick={handleAddCustomerOpen} variant="contained">
              Add Customer
            </Button>
          </Box>

          <Table>
          <TableHead>
  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
    <TableCell padding="checkbox">
      <Checkbox
        checked={selectedUsers.size === filteredUsers.length}
        onChange={handleSelectAll}
      />
    </TableCell>
    <TableCell sx={{ color: "grey.700", fontWeight: "bold" }}>
      <TableSortLabel
        active={orderBy === "name"}
        direction={order}
        onClick={() => handleSort("name")}
      >
        Name
      </TableSortLabel>
    </TableCell>
    <TableCell sx={{ color: "grey.700", fontWeight: "bold" }}>Email</TableCell>
    <TableCell sx={{ color: "grey.700", fontWeight: "bold" }}>
      Created Date
    </TableCell>
    <TableCell sx={{ color: "grey.700", fontWeight: "bold" }}>Status</TableCell>
    <TableCell sx={{ color: "grey.700", fontWeight: "bold" }} align="center">
      Actions
    </TableCell>
  </TableRow>
</TableHead>


            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow
                    key={user.email}
                    sx={
                      user.email === currentUser?.email
                        ? { backgroundColor: "#e0f7fa" }
                        : {}
                    }
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.has(user.email)}
                        onChange={(e) => handleSelectUser(e, user.email)}
                        disabled={user.email === currentUser?.email}
                      />
                    </TableCell>
                    <TableCell>
                      {user.name}
                      {user.email === currentUser?.email && (
                        <Typography
                          component="span"
                          variant="caption"
                          color="primary"
                          sx={{ ml: 1 }}
                        >
                          
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell>
                      <Switch
                        checked={user.isActive}
                        onChange={(e) =>
                          handleStatusChange(user.email, e.target.checked)
                        }
                        disabled={user.email === currentUser?.email}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleOpen(user)}>
                        <Visibility />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(user.email)}
                        disabled={user.email === currentUser?.email}
                      >
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

        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyle}>
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <Close />
            </IconButton>
            {selectedUser && (
  <>
    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
      User Details
    </Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Typography>
        <strong>Name:</strong> {selectedUser.name}
      </Typography>
      <Typography>
        <strong>Email:</strong> {selectedUser.email}
      </Typography>
      <Typography>
        <strong>Created At:</strong> {selectedUser.createdAt}
      </Typography>
      <Typography>
        <strong>Status:</strong>{" "}
        {selectedUser.isActive ? "Active" : "Inactive"}
      </Typography>
    </Box>
  </>
)}

          </Box>
        </Modal>

        <Modal open={addModalOpen} onClose={handleAddCustomerClose}>
          <Box sx={modalStyle}>
            <IconButton
              onClick={handleAddCustomerClose}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <Close />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Add New Customer
            </Typography>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={newCustomer.name}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={newCustomer.email}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={newCustomer.password}
              onChange={handleInputChange}
              margin="normal"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddCustomer}
              sx={{ mt: 2 }}
            >
              Add Customer
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#ffffff",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
  p: 4,
  borderRadius: 3,
  border: "1px solid #e0e0e0",
};


export default Tables;
