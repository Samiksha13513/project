
import { Card, TextField, Button, Box, Typography } from '@mui/material';
import { FormData } from '../types/index';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


export default function SignupCard() {
  const navigate = useNavigate();

  
  const validationSchema = Yup.object({
    userName: Yup.string().required('Username is required'),
    Email: Yup.string().email('Invalid email address').required('Email is required'),
    Password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema), 
  });
  

  const onSubmit = handleSubmit((data) => {
    console.log( data); 
    navigate('/login');
  });
  

  return (
<Typography
   
  sx={{
    backgroundImage:'url("https://cdn.dribbble.com/userupload/12426545/file/original-ffb3b267b3b794af825acf4978c4cd3d.jpg?resize=1024x768&vertical=center")', // Corrected URL format
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // color: 'red',
    padding: 2,
  }}
>

    <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '90vh' ,marginLeft:'550px',marginTop:'-33px',}}>
      <Card sx={{ maxWidth: 444, padding: 3 ,marginTop:6, backgroundColor:'white'}}>
        <Typography variant="h5" component="div" gutterBottom align="center">
          Sign in
        </Typography>
        
        <form onSubmit={onSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="username"
            {...register("userName")}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />
          
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            autoComplete="email"
            {...register("Email")}
            error={!!errors.Email}
            helperText={errors.Email?.message}
          />
          
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            // type="password"
            autoComplete="current-password" 
            {...register("Password")}
            error={!!errors.Password}
            helperText={errors.Password?.message}
          />
        <Button
  variant="contained"
  fullWidth
  sx={{
    marginTop: 2,
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
    color: 'white'
  }}
  type="submit" 
>
  Sign in
</Button>

        </form>
      </Card>
    </Box>
    </Typography> 
  );
}






