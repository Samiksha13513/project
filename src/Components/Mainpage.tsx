import * as React from 'react';
import { useUser } from '../ContextApi/UserContext';
import { Box, Typography, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, AppBar, Toolbar, Container } from '@mui/material';
import { Visibility, Delete, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { createTheme } from '@mui/material/styles';
import { AppProvider, type Session, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

const NAVIGATION: Navigation = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

const MainPage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [setUser]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleDelete = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/mainpage');
  };

  const DemoPageContent = () => (
    <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Card sx={{ padding: 3 }}>
        {user ? (
          <>
            <Typography variant="h4" gutterBottom>Welcome, {user.name}!</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => alert('Viewing user details')} color="primary"><Visibility /></IconButton>
                      <IconButton onClick={handleDelete} color="error"><Delete /></IconButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <Typography>No user data available</Typography>
        )}
      </Card>
    </Box>
  );


  return (
    // <AppProvider session={session} navigation={NAVIGATION} theme={demoTheme}>
      <DashboardLayout>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>User Dashboard</Typography>
            {user && (
              <>
                <Button color="inherit" onClick={handleLogout} startIcon={<ExitToApp />}>Logout</Button>
                <Button color="inherit">Profile</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container sx={{ flexGrow: 1, padding: 3 }}>
          <DemoPageContent />
        </Container>
      </DashboardLayout>
    // </AppProvider>
  );
};
export default MainPage;
















