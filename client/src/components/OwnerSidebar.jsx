import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import LogoutIcon from "@mui/icons-material/Logout";
import BlockIcon from "@mui/icons-material/Block";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/owner/dashboard" },
  { label: "All Companies", icon: <GroupIcon />, path: "/owner/companies" },
  { label: "Invite Company", icon: <AddBusinessIcon />, path: "/owner/invite" },
  { label: "Requests", icon: <RequestPageIcon />, path: "/owner/requests" },
  { label: "Blocked", icon: <BlockIcon />, path: "/owner/blocked" },
];

const OwnerSidebar = ({ mobileOpen, handleDrawerToggle, toggleTheme, themeMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("ownerToken");
    navigate("/");
    window.location.reload(); // Force reload to reset context if needed
  };

  const drawerContent = (
    <Box sx={{
  width: 240,
  flexShrink: 0,
  marginTop:'50px',
  zIndex: (theme) => theme.zIndex.drawer,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    pt: 8, // top padding to avoid overlap with AppBar
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    // marginTop:'200px'
  },
}}>
      <Typography variant="h6" fontWeight="bold" align="center" mb={2}>
        HRMS Owner
      </Typography>
      <Divider />

      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Theme Toggle */}
      <Box textAlign="center">
        <IconButton onClick={toggleTheme}>
          {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Typography variant="caption">
          {themeMode === "dark" ? "Light Mode" : "Dark Mode"}
        </Typography>
      </Box>

      {/* Logout */}
      <Box textAlign="center" mt={2}>
        <IconButton color="error" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
        <Typography variant="caption">Logout</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ m: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ "& .MuiDrawer-paper": { width: 240 } }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              backgroundColor: theme.palette.background.paper,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
};

export default OwnerSidebar;
