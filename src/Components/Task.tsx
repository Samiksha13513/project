import React, { useState } from "react";
import {Box,Button, FormControl, InputLabel,MenuItem,Select,TextField, Typography} from "@mui/material";
import { useUser } from "../ContextApi/UserContext"; 

const UserForm: React.FC = () => {
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
    console.log("Submitted Data:", formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Create Task
      </Typography>

      
      <Typography variant="subtitle1" gutterBottom>
        Title
      </Typography>
      <TextField
        placeholder="Enter task title"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

   
      <Typography variant="subtitle1" gutterBottom>
        Assign To
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel id="user-label">Select User</InputLabel>
        <Select
          labelId="user-label"
          value={selectedUser}
          label="Select User"
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          {users.map((user) => (
            <MenuItem key={user.email} value={user.email}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

 
      <Typography variant="subtitle1" gutterBottom>
        Description
      </Typography>
      <TextField
        placeholder="Task description..."
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

    
      <Button variant="outlined" component="label" sx={{ mt: 2 }}>
        Upload Image
        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
      </Button>

      {image && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Selected: {image.name}
        </Typography>
      )}

      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        fullWidth
        sx={{ mt: 3 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default UserForm;
