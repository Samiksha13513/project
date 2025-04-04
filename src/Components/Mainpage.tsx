
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SearchIcon from '@mui/icons-material/Search';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AppProvider, type Navigation, } from '@toolpad/core/AppProvider';
import {DashboardLayout,ThemeSwitcher,type SidebarFooterProps,
} from '@toolpad/core/DashboardLayout';
import Tooltip from '@mui/material/Tooltip';
import Myprofile from './Myprofile';
import Tables from './Table';

const NAVIGATION: Navigation = [
  {
    segment: 'dashboard',
    title: 'User Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'users',
    title: 'All Users',
    icon: <AccountBoxIcon />,
  },
];
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});
const MainPage = () => {
 
  const DemoPageContent = ({ pathname }: { pathname: string }) => (
    <Box
      sx={{
        // py: 4,
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // textAlign: 'center',
        // marginLeft:'-589',
        // marginTop:'-33px',
        
      }}
      
    >
      <Box  
        sx={{
        padding:'400',
        marginLeft:'-589',
        marginTop:'-33px',
        
      }}
      >
      <Tables/></Box>
    </Box>
  );

  const ToolbarActionsSearch = () => (
    <Stack direction="row" alignItems="center">
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{
              display: { xs: 'inline', md: 'none' },
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton type="button" aria-label="search" size="small">
                <SearchIcon />
              </IconButton>
            ),
            sx: { pr: 0.5 },
          },
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
      />
      <ThemeSwitcher />
      <Myprofile />
    </Stack>
  );

  const SidebarFooter = ({ mini }: SidebarFooterProps) => (
    <Typography variant="caption" sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
      {mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love by MUI`}
    </Typography>
  );

  const CustomAppTitle = () => (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="h6">Dashboard</Typography>
    </Stack>
  );
  return (
    <AppProvider
      navigation={NAVIGATION}
      theme={demoTheme}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: ToolbarActionsSearch,
          sidebarFooter: SidebarFooter,
        }}
      >
        <DemoPageContent pathname="/dashboard" />
      </DashboardLayout>
    </AppProvider>
  );
};
export default MainPage;





