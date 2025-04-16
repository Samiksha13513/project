import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Logout from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';
import { useUser } from '../ContextApi/UserContext';


export default function AccountMenu({onNavigate}) {
  const navigate = useNavigate();

  const { currentUser, logoutUser } = useUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
   
    onNavigate("/profile")
  };
  const handleLogout = () => {
    logoutUser();
    navigate('/profile');
  };

  const userInitial = currentUser?.name?.charAt(0).toUpperCase() || 'U';

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 42, height: 42 }}>{userInitial}</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              p:2,
              boxShadow:"1px 2px 5px black",
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileClick} >
          <Avatar /> Profile
        </MenuItem>
        <Divider />
   
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}