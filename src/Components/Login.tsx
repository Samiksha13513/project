import { Card, TextField, Button, Box, Typography, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useUser } from "../UserContext";

const schema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });
  const { user } = useUser();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (data: any) => {
    if (user?.email === data.email && user?.password === data.password) {
      navigate("/mainpage");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
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
            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                background:
                  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                color: "white",
              }}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Card>
      </Box>
    </Typography>
  );
}
