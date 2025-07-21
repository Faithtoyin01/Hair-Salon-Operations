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
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import {
  Home as HomeIcon,
  Event as EventIcon,
  Dashboard as DashboardIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  SwitchAccount as SwitchAccountIcon,
} from "@mui/icons-material";

const AppBar = ({ user, users, handleLogout, handleSwitchUser }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleSwitch = (userId) => {
    handleSwitchUser(userId);
    handleMenuClose();
    navigate(userId === user?.id ? `/${user.role}-dashboard` : "/");
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/", show: true },
    {
      text: "Book Appointment",
      icon: <EventIcon />,
      path: "/booking",
      show: user?.role === "customer",
    },
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/customer-dashboard",
      show: user?.role === "customer",
    },
    {
      text: "Admin Dashboard",
      icon: <DashboardIcon />,
      path: "/admin-dashboard",
      show: user?.role === "admin",
    },
    {
      text: "Queue Management",
      icon: <EventIcon />,
      path: "/queue-management",
      show: user?.role === "stylist" || user?.role === "admin",
    },
    { text: "Login", icon: <LoginIcon />, path: "/login", show: !user },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      path: "/",
      show: user,
      onClick: handleLogout,
    },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Glamour Hair Salon
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
            <EventIcon /> Glamour Hair Salon
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {user && (
              <>
                <Button
                  color="inherit"
                  startIcon={<SwitchAccountIcon />}
                  onClick={handleMenuOpen}
                  sx={{ textTransform: "none", fontWeight: 500 }}
                >
                  {user.username}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {users.map((u) => (
                    <MenuItem key={u.id} onClick={() => handleSwitch(u.id)}>
                      <Avatar
                        sx={{
                          mr: 1,
                          bgcolor:
                            u.role === "admin"
                              ? "primary.main"
                              : u.role === "stylist"
                              ? "secondary.main"
                              : "accent.main",
                        }}
                      >
                        {u.username[0].toUpperCase()}
                      </Avatar>
                      {u.username} ({u.role})
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
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
          </Box>
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
