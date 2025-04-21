import { Box, Typography, Avatar, Card, CardContent, Divider, Grid, Button } from '@mui/material';
import { useUser } from '../ContextApi/UserContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { currentUser, logoutUser } = useUser();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem(`profileImage-${currentUser?.email}`);
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, [currentUser]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setProfileImage(base64Image);
        if (currentUser?.email) {
          localStorage.setItem(`profileImage-${currentUser.email}`, base64Image);
        }
      };
      reader.readAsDataURL(file);
    }
  };

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

  return (
    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center', position: 'relative' }}>
      <Card sx={{ width: 400, boxShadow: 1 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            src={profileImage || undefined}
            sx={{ width: 120, height: 120, fontSize: '3rem', bgcolor: 'primary.main', marginBottom: 2 }}
          >
            {!profileImage && currentUser.name.charAt(0).toUpperCase()}
          </Avatar>

          <Button variant="outlined" component="label" sx={{ mb: 2 }}>
            Upload Photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>

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

          <Divider sx={{ width: '100%', marginBottom: 2, marginTop: 2 }} />

          <Grid container spacing={1}>
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
