import { Card, TextField, Button, Box, Typography, Snackbar, CircularProgress } from "@mui/material";
import { FormData } from "../types/index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useUser } from "../ContextApi/UserContext";
import { Link } from 'react-router-dom';
import image2 from '../assets/image2.png';

export default function SignupCard() {
  const { addUser } = useUser();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Name must contain only letters.")
      .min(3, "Name must be at least 3 characters.")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email must be a valid Gmail address.")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/\d/, "Password must contain at least one number.")
      .matches(/[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]/, "Password must contain at least one special character.")
      .required("Password is required"),
  });
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const onSubmit = (data: FormData) => {
    setLoading(true);
    const storedUsers: any[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = storedUsers.some(user => user.email === data.email);
    if (userExists) {
      setSnackbarMessage("This email is already registered!");
      setSnackbarOpen(true);
      setLoading(false);
      return;
    }
    addUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    setSnackbarMessage("Sign Up successful!");
    setSnackbarOpen(true);
    localStorage.setItem('user', JSON.stringify(data));
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1500);
  };
  return (
    <>
  <Box display="flex" minHeight="100vh">
    
    <Box
      flex={1}
      sx={{
        backgroundImage: `url(${image2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  
    <Box
      flex={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={4}
    >
      <Card sx={{ width: '100%', maxWidth: 400, padding: 4 }}>
        <Typography variant="h5" textAlign="center" marginBottom={2}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            label="Password"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
          <Typography variant="body2" textAlign="center" mt={2}>
            Already have an account? <Link to="/login">Log in</Link>
          </Typography>
        </form>
      </Card>
    </Box>
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleCloseSnackbar}
      message={snackbarMessage}
    />
  </Box>

    </>
  );
}