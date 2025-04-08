import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function AccountMenu() {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    // Add any logout logic here (e.g., clear session or token)
    // Navigate to the Signup page
    navigate('/'); // This redirects to the Signup page
    handleCloseMenu(); // Close the account menu after logout
  };

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

  const user = {
    name: "Samiksha Yadav",
    email: "samiksha@yadav.com",
  };

  return (
    <React.Fragment>
      {/* Avatar Icon Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 42, height: 42 }}>S</Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      {/* Account Menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleProfileClick}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Profile Modal */}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2" align="center">
              User Profile
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
              <Avatar sx={{ width: 100, height: 100, mb: 2 }}>S</Avatar>
              <Typography variant="body1">Name: {user.name}</Typography>
              <Typography variant="body1" color="textSecondary">Email: {user.email}</Typography>
            </Box>
            <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 2, width: '100%' }}>
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
