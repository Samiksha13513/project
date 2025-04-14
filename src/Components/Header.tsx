import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
// Removed @toolpad/core and Toolpad-specific imports (ThemeSwitcher)

const Header = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
      <Typography variant="h5">Dashboard</Typography>
      <Stack direction="row" alignItems="center">
        {/* Removed the ThemeSwitcher and Myprofile components */}
      </Stack>
    </Box>
  );
};

export default Header;
