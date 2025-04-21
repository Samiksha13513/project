import React, { useState } from "react";
import {Box, Button,FormControl,InputLabel, MenuItem,Select,TextField,Typography,} from "@mui/material";
import { useUser } from "../ContextApi/UserContext";

interface UserFormProps {
  onSubmit: (data: any) => void;
}
const Task: React.FC<UserFormProps> = ({ onSubmit }) => {
  const { users } = useUser();
  const [title, setTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      title,
      user: selectedUser,
      description,
      image,
    };
    onSubmit(formData);
    setTitle("");
    setSelectedUser("");
    setDescription("");
    setImage(null);
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };
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
              {user.name}
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

      {/* <Button variant="outlined" component="label" sx={{ mt: 2 }}>
        Upload Profile Photo
        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
      </Button> */}

      {image && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Selected: {image.name}
        </Typography>
      )}

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
