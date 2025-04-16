import { Box, Typography, Avatar, Card, CardContent, Divider, Grid, Button, IconButton } from '@mui/material';
import { useUser } from '../ContextApi/UserContext';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
  const { currentUser, logoutUser } = useUser();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Please log in to view your profile.</Typography>
      </Box>
    );
  }

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const handleClose = () => {
    navigate('/'); 
  };

  return (
    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', position: 'relative' }}>
     
      

      <Card sx={{ width: 400, boxShadow: 1 }}> 
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ width: 120, height: 120, fontSize: '3rem', bgcolor: 'primary.main', marginBottom: 2 }}>
            {currentUser.name.charAt(0).toUpperCase()}
          </Avatar>
          <Grid container spacing={1} sx={{ width: '100%' }}>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Name:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">{currentUser.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Email:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">{currentUser.email}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: '100%', marginBottom: 2 }} />
          <Grid container spacing={1}>
            {/* <Grid item xs={12}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Active</Typography>
              <Typography variant="body2" color="textSecondary">{currentUser. isActive || 'Not Provided'}</Typography>
            </Grid> */}
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Created</Typography>
              <Typography variant="body2" color="textSecondary">{currentUser.createdAt || 'Not Provided'}</Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ marginTop: 3, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" color="info" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
