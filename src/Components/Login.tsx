
import { Card, TextField, Button, Box, Typography, InputAdornment, IconButton, Snackbar } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useUser } from "../ContextApi/UserContext";
import SimpleBackdrop from "./Loader";
import { FormDatas } from "../types/index";

const schema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormDatas>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const { user } = useUser();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loaderState, setLoaderState] = useState(false); 
  const [snackbarOpen, setSnackbarOpen] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(""); 

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); 
  };
  const onSubmit = (data: FormDatas) => {
    setLoaderState(true); 
    
    setTimeout(() => {
      if (user?.email === data.email && user?.password === data.password) {
        setSnackbarMessage("Login successful!"); 
        setSnackbarOpen(true); 
        
       
        localStorage.setItem('user', JSON.stringify(user));
  
        setTimeout(() => {
          setLoaderState(false); 
          navigate("/mainpage"); 
        }, 2000); 
      } else {
        setSnackbarMessage("Invalid credentials!");
        setSnackbarOpen(true); 
        setLoaderState(false); 
      }
    }, 2000); 
  };
  
  
  return (
    <>
      <SimpleBackdrop loaderState={loaderState} setOpen={setLoaderState} />
      <Typography sx={{ backgroundImage: 'url(https://image.slidesdocs.com/responsive-images/slides/18-blue-cartoon-wind-and-winter-infectious-disease-prevention-powerpoint-background_91d205b88d__960_540.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', marginLeft: '490px' }}>
          <Card sx={{ maxWidth: 400, padding: 3, marginTop: 3 }}>
            <Typography variant="h5" component="div" gutterBottom align="center">Login</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Typography gutterBottom align="center">
              <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                color: "white",
                borderRadius: 2,
                '&:hover': {
                  background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 35%, rgba(0,212,255,1) 100%)",
                },
              }}
              type="submit"
            >
              Login
            </Button>
            <Link to='/'  className="text-blue-600 text-sm mt-3 hover:underline text-center" >
        Create a new account | Sign in
      </Link>
      </Typography>
            </form>
          </Card>
        </Box>

      
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
