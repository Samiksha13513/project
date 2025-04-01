import { useUser } from '../UserContext';
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const MainPage = () => {
  const { user } = useUser();

  return (

    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'url(https://image.slidesdocs.com/responsive-images/slides/12-green-cartoon-wind-autumn-and-winter-flu-prevention-powerpoint-background_52901dcfdf__960_540.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          zIndex: -1,
        },
      }}
    >
      
      {user ? (
      <Typography sx={{
        marginleft:'-641',marginTop:'50'
      }}>
        <Card sx={{ padding: '20px', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.7)' ,marginleft:'-641',marginTop:'50'}}>
          <Typography variant="h4" gutterBottom>Welcome, {user.name}!</Typography>
          {/* <Typography variant="body1" gutterBottom>Email: {user.email}</Typography>
          <Typography variant="body1" gutterBottom>Password: {user.password}</Typography> */}

          <TableContainer sx={{ marginTop: '20px', backgroundColor: 'transparent' }}>
            <Table sx={{ border: '1px solid white' }}>
              <TableHead>
                {/* <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Property</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Value</TableCell>
                </TableRow> */}
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>{user.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Password</TableCell>
                  <TableCell sx={{ color: 'white' }}>{user.password}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Active Button */}
          {/* <Box sx={{ marginTop: '20px' }}>
            <Button
              variant="contained"
              color={isActive ? 'success' : 'error'}
              onClick={toggleActiveStatus}
            >
              {isActive ? 'Active' : 'Inactive'}
            </Button> */}
          {/* </Box> */}
          
        </Card>
        </Typography>
      ) : (
        <Typography variant="h6">No user data available.</Typography>
      )}
    
    </Box>
  
  );
};

export default MainPage;
