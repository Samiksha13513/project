import { Card, TextField, Button, Box, Typography, Snackbar } from "@mui/material";
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
import { useUser } from "../UserContext";
import SimpleBackdrop from "./Loader";

export default function SignupCard() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [lodarState, setOpen] = useState(false); // Loader state

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); // Close Snackbar
  };

  const onSubmit = (data: FormData) => {
    setOpen(true); // Show loader when form is submitted

    // Simulate sign up (you can replace this with an actual API call)
    setUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    setSnackbarMessage("Sign Up successful!"); // Set message
    setSnackbarOpen(true); // Open Snackbar

    setTimeout(() => {
      setOpen(false); // Hide loader after 2 seconds
      navigate("/login"); // Navigate to login page after a delay
    }, 2000); // Delay to show Snackbar before navigating
  };

  return (
    <>
      <SimpleBackdrop lodarState={lodarState} setOpen={setOpen} />
      <Typography
        sx={{
          backgroundImage: 'url("https://cdn.dribbble.com/userupload/12426545/file/original-ffb3b267b3b794af825acf4978c4cd3d.jpg?resize=1024x768&vertical=center")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            minHeight: "90vh",
            marginLeft: "500px",
            marginTop: "-33px",
          }}
        >
          <Card
            sx={{
              maxWidth: 444,
              padding: 3,
              marginTop: 6,
              backgroundColor: "white",
            }}
          >
            <Typography variant="h5" component="div" gutterBottom align="center">
              Sign Up
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="current-password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "hide the password" : "display the password"}
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{
                  marginTop: 2,
                  background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                  color: "white",
                }}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
          </Card>
        </Box>

        {/* Snackbar component */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        />
      </Typography>
    </>
  );
}
