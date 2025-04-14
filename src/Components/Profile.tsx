import React from 'react';
import { Box, Typography, Avatar, Card, CardContent, Divider, Grid, Button } from '@mui/material';
import { useUser } from '../ContextApi/UserContext';
import Mainpage from '../Pages/Mainpage';

const Profile = () => {
    const { currentUser } = useUser(); 
    if (!currentUser) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant="h6">Please log in to view your profile.</Typography>
            </Box>
        );
    }

    return (
      <> 
     
        <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: 400, boxShadow: 3 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ width: 120, height: 120, fontSize: '3rem', bgcolor: 'primary.main', marginBottom: 2 }}>
                        {currentUser.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{currentUser.name}</Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
                        {currentUser.email}
                    </Typography>
                    <Divider sx={{ width: '100%', marginBottom: 2 }} />
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Phone</Typography>
                            <Typography variant="body2" color="textSecondary">{currentUser.phone || 'Not Provided'}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Address</Typography>
                            <Typography variant="body2" color="textSecondary">{currentUser.address || 'Not Provided'}</Typography>
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
        </>
    );
};

export default Profile;
