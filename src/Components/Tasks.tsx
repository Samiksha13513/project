import React from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface AddTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    title: string;
    description: string;
  }) => void;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[A-Za-z]+$/, "Only letters are allowed in name"),
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[A-Za-z0-9]+@gmail\.com$/, "Must be a valid @gmail.com email"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      title: "",
      description: "",
    },
  });

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit)}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add New Task
        </Typography>

        <TextField
label="Name"
 fullWidth
 margin="normal"
{...register("name")}
 error={!!errors.name}
helperText={errors.name?.message}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Title"
          fullWidth
          margin="normal"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Description"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Modal>






)};

export default AddTaskModal;
