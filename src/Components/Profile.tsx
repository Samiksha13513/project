
import { Box, Typography, Avatar, Button, Card, CardContent, Divider, Grid, } from '@mui/material';
const user = {
  name: "Samiksha Yadav",
  email: "samiksha66@yadav.com",
  phone: "+9123 456 7890",
  address: "Mhow",
  avatar: "SY", 
};
const Profile = () => {
  return (
    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: 400, boxShadow: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ width: 120, height: 120, fontSize: '3rem', bgcolor: 'primary.main', marginBottom: 2 }}>
            {user.avatar}
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
            {user.email}
          </Typography>
          <Divider sx={{ width: '100%', marginBottom: 2 }} />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Phone</Typography>
              <Typography variant="body2" color="textSecondary">{user.phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Address</Typography>
              <Typography variant="body2" color="textSecondary">{user.address}</Typography>
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 3, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
              Edit Profile
            </Button>
            <Button variant="outlined" color="secondary">
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
