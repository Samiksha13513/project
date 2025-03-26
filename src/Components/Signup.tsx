import * as React from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function SignupCard() {
  

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
          Sign Up
        </Typography>
        <TextField label="Username" variant="outlined" fullWidth margin="normal" />
        <TextField label="Email" variant="outlined" fullWidth margin="normal" type="email" />
        <TextField label="Password" variant="outlined" fullWidth margin="normal" type="password" />
        <TextField label="Confirm Password" variant="outlined" fullWidth margin="normal" type="password" />
        <Button variant="contained" fullWidth sx={{ marginTop: 2 }} >
          Sign Up
        </Button>
      </Card>
    </Box>
  );
}
