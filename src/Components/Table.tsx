import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow ,Box,} from '@mui/material';
import { Visibility, Delete } from '@mui/icons-material'; 
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../ContextApi/UserContext';

const Tables = () => {
    
      const { user, setUser } = useUser(); 
      const navigate = useNavigate();
    
      React.useEffect(() => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user)); 
        }
      }, [user]);

  const handleDelete = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/mainpage');
  };
  return (
    
        <Box
          sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          
          }}
        >
          <TableContainer >
            <Table>
            <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Password</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {user ? (
        <TableRow sx={{
            marginLeft:'-587',
            marginTop:'-33',
          }} >
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>{user.password}</TableCell>
          <TableCell>
            <IconButton onClick={() => alert('Viewing user details')} color="primary">
              <Visibility />
            </IconButton>
            <IconButton onClick={handleDelete} color="error">
              <Delete />
            </IconButton>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell colSpan={3}>No user data available</TableCell>
        </TableRow>
      )}
    </TableBody>
    
            </Table>
          </TableContainer>
        </Box>
      );
  }

export default Tables;
