import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useUser } from "../ContextApi/UserContext.tsx";

interface TaskFormProps {
  onSubmit: (data: any) => void;
}

const Task: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const { users } = useUser();
  const [title, setTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [description, setDescription] = useState("");
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !selectedUser || !description) {
      alert("Please fill all fields.");
      return;
    }

    const formData = {
      title,
      user: selectedUser, 
      description,
    
    };

    onSubmit(formData);

    setTitle("");
    setSelectedUser("");
    setDescription("");
   
  };

  
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Create New Task
      </Typography>

      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="user-label">Assign To</InputLabel>
        <Select
          labelId="user-label"
          value={selectedUser}
          label="Assign To"
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {users.map((user) => (
            <MenuItem key={user.email} value={user.email}>
              {user.name} ({user.email})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Task;
