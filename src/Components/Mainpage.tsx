
import * as React from "react";
import { Box, Typography, Stack, IconButton, TextField, Tooltip } from "@mui/material";
import { AppProvider, DashboardLayout, ThemeSwitcher } from "@toolpad/core";
 import { createTheme } from "@mui/material/styles";
import { useContext } from "react";
import { UserContext } from "../ContextApi/UserContext";
import { useDemoRouter } from "@toolpad/core/internal";
import Myprofile from './Myprofile';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';;
import SearchIcon from '@mui/icons-material/Search';

import Table from "../Components/Table"; 


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
        <Typography variant="h5">Dashboard</Typography>
    </Box>
);

function DemoPageContent({ pathname }: { pathname: string }) {
    return (

        <Box
            sx={{
                py: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                marginRight: '420px', 
            }}
        >
            {pathname === "/dashboard" && (
                <Typography variant="h5">Welcome to the Dashboard</Typography>
            )}
            {pathname === "/users" && (
                <div>
                    <Typography variant="h5" justifyContent={'center'}></Typography>
                    <Table /> 
                </div>
            )}
        </Box>
    );
}

const Mainpage = () => {
   
    const router = useDemoRouter("/dashboard");

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
            <ThemeSwitcher/>
            <Myprofile />
             {/* Assuming Myprofile is a valid component */}
        </Stack>
    );

    const SidebarFooter = ({ mini }: { mini: boolean }) => (
        <Typography variant="caption" sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {mini ? '© MUI' : `© ${new Date().getFullYear()} Made with love by MUI`}
        </Typography>
    );

    return (
        <AppProvider
        router={router}
        theme={demoTheme}
            navigation={[
               
                    { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
                    { segment: "users", title: "All Users", icon: <PeopleIcon /> },
                 
            ]}
            
        >
            <DashboardLayout
                slots={{
                    appTitle: CustomAppTitle,
                    toolbarActions: ToolbarActionsSearch,
                    sidebarFooter: SidebarFooter,
                }}
            >
                <DemoPageContent pathname={router.pathname} />
            </DashboardLayout>
        </AppProvider>
    );
};

export default Mainpage;















   





