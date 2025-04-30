import { useState } from 'react';
import {
  TextField,
  Button,
  Card,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../ContextApi/UserContext.tsx';
import { FormDatas } from '../types/index';
import { Link } from 'react-router-dom';
import images1 from '../assets/image1.png';

const schema = Yup.object({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormDatas>({
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const { loginUser } = useUser();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loaderState, setLoaderState] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [navigateAfterSnackbar, setNavigateAfterSnackbar] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    if (navigateAfterSnackbar) {
      navigate('/mainpage');
    }
  };

  const onSubmit = (data: FormDatas) => {
    setLoaderState(true);

    setTimeout(() => {
      const storedUsers = localStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
      const user = users.find(
        (user: any) => user.email === data.email && user.password === data.password
      );

      if (user) {
        setSnackbarMessage('Login successful!');
        setSnackbarOpen(true);
        loginUser(user);
        setNavigateAfterSnackbar(true); 
        setLoaderState(false);
      } else {
        setSnackbarMessage('Invalid credentials!');
        setSnackbarOpen(true);
        setLoaderState(false);
      }
    }, 1000);
  };

  return (
    <Box display="flex" minHeight="100vh">
      <Box
        flex={1}
        sx={{
          backgroundImage: `url(${images1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Card
          sx={{
            maxWidth: 400,
            padding: 3,
            marginTop: 3,
            height: '500px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" component="div" gutterBottom align="center">
            Login
          </Typography>
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
                  'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
                color: 'white',
                borderRadius: 2,
                '&:hover': {
                  background:
                    'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 35%, rgba(0,212,255,1) 100%)',
                },
              }}
              type="submit"
              disabled={loaderState}
            >
              {loaderState ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Login'
              )}
            </Button>

            <Box textAlign="center" mt={2}>
              <Link to="/" className="text-blue-600 text-sm hover:underline">
                New user | Sign in
              </Link>
            </Box>
          </form>
        </Card>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Login;
