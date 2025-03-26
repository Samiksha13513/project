
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
          Login Page
        </Typography>
        <TextField label="Name" variant="outlined" fullWidth margin="normal" />
        <TextField label="Password" variant="outlined" fullWidth margin="normal" type="password" />
        <Button variant="contained" fullWidth sx={{ marginTop: 2 }}>
          Login
        </Button>
      </Card>
    </Box>
  );
}