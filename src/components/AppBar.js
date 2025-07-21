import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Home as HomeIcon,
  Event as EventIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

const AppBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/", show: true },
    {
      text: "Book Appointment",
      icon: <EventIcon />,
      path: "/booking",
      show: user === "customer",
    },
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/customer-dashboard",
      show: user === "customer",
    },
    {
      text: "Admin Dashboard",
      icon: <DashboardIcon />,
      path: "/admin-dashboard",
      show: user === "admin",
    },
    { text: "Login", icon: <LoginIcon />, path: "/login", show: !user },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      path: "/",
      show: user,
      onClick: () => setUser(null),
    },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Hair Salon
      </Typography>
      <List>
        {menuItems.map(
          (item) =>
            item.show && (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  item.onClick ? item.onClick() : navigate(item.path);
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            )
        )}
      </List>
    </Box>
  );

  return (
    <>
      <MUIAppBar
        position="sticky"
        sx={{ background: "linear-gradient(90deg, #6B4E71 0%, #F4A261 100%)" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <EventIcon /> Hair Salon
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {menuItems.map(
              (item) =>
                item.show && (
                  <Button
                    key={item.text}
                    color="inherit"
                    startIcon={item.icon}
                    onClick={() => {
                      item.onClick ? item.onClick() : navigate(item.path);
                    }}
                    sx={{ textTransform: "none", fontWeight: 500 }}
                  >
                    {item.text}
                  </Button>
                )
            )}
          </Box>
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </MUIAppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { sm: "none" }, "& .MuiDrawer-paper": { width: 240 } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default AppBar;
