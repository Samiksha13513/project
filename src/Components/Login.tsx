
// import Card from '@mui/material/Card';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import { useNavigate } from 'react-router-dom';
// import {useForm} from 'react-hook-form';

// export default function SignupCard() {
//     const {
//       register,
//       setValue,
//       handleSubmit,
//       formState: { errors },
//     } = useForm<FormData>()
//   const navigate= useNavigate();
//   const onsubmit= handleSubmit((data)=>{
//     console.log(data);
//     navigate('/mainpage')
//   })
  
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh', 
//       }}
//     >
//       <Card sx={{ maxWidth: 400, padding: 3 }}>
//         <Typography variant="h5" component="div" gutterBottom align="center">
//           Login Page
//         </Typography>
//         <TextField label="Name" variant="outlined" fullWidth margin="normal" />
//         <TextField label="Password" variant="outlined" fullWidth margin="normal" type="password" />
//         <Button variant="contained" fullWidth sx={{ marginTop: 2 }} onClick={onsubmit}>
//           Login
//         </Button>
//       </Card>
//     </Box>
//   );
// }
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Define the validation schema using Yup
const schema = Yup.object({
  name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

export default function SignupCard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Integrate Yup validation schema with react-hook-form
  });

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate('/mainpage');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ maxWidth: 400, padding: 3 }}>
        <Typography variant="h5" component="div" gutterBottom align="center">
          Login Page
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('name')} // Register field with react-hook-form
            error={!!errors.name} // Show error state if validation fails
            helperText={errors.name?.message} // Show error message
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            {...register('password')} // Register password field with react-hook-form
            error={!!errors.password} // Show error state if validation fails
            helperText={errors.password?.message} // Show error message
          />
          <Button variant="contained" fullWidth sx={{ marginTop: 2 }} type="submit">
            Login
          </Button>
        </form>
      </Card>
    </Box>
  );
}
