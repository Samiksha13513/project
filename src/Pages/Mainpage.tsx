import { Box, Typography, Stack, } from "@mui/material";
import { AppProvider, DashboardLayout, ThemeSwitcher } from "@toolpad/core";
import { createTheme } from "@mui/material/styles";
import { useDemoRouter } from "@toolpad/core/internal";
import Myprofile from "../Components/Myprofile";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import Dashboard from "./Dashboard";
import Table from "../Components/Table";
import TaskTable from "../Pages/TaskTable";
import AddTaskIcon from '@mui/icons-material/AddTask';
import Profile from "../Components/Profile";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
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
const CustomAppTitle = () => (
  <Box>
    <Typography variant="h5" >Dashboard</Typography>
  </Box>
);
function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        width: "100%",
      }}
    >
      {pathname === "/dashboard" && (
        <div>
          <Dashboard />
        </div>
      )}
      {pathname === "/users" && (
        <div>
          <Table />
        </div>
      )} {pathname === "/profile" && (
        <div>
          <Profile/>
        </div>
      )}
      {pathname === "/tasktable" && (
        <div>
          <TaskTable/>
        </div>
      )}
    </Box>
  );
}

const Mainpage = () => {
  const router = useDemoRouter("/dashboard");

  const ToolbarActionsSearch = () => (
    <Stack direction="row" alignItems="center">
      <ThemeSwitcher />
      <Myprofile onNavigate={router.navigate} />
    </Stack>
  );

  const SidebarFooter = ({ mini }: { mini: boolean }) => (
    <Typography
      variant="caption"
      sx={{ m: 1, whiteSpace: "nowrap", overflow: "hidden" }}
    >
      {mini ? "© MUI" : `© ${new Date().getFullYear()} Made with love by MUI`}
    </Typography>
  );

  return (
    <AppProvider
      router={router}
      theme={demoTheme}
      navigation={[
        { segment: "dashboard", title: "OverView", icon: <DashboardIcon /> },
        { segment: "users", title: "Customers", icon: <PeopleIcon /> },
        { segment: "tasktable", title: "Task", icon: <AddTaskIcon/> },
      ]}
    >
      <DashboardLayout
        slots={{
          appTitle: CustomAppTitle,
          toolbarActions: ToolbarActionsSearch,
          sidebarFooter: SidebarFooter,
        }}
      >
        {<DemoPageContent pathname={router.pathname} />}
      </DashboardLayout>
    </AppProvider>
  );
};

export default Mainpage;
