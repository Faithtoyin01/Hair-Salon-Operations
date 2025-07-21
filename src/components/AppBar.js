import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";

const AppBar = ({ user, users, handleLogout, handleSwitchUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserSwitch = (userId) => {
    handleSwitchUser(userId);
    handleClose();
    navigate(
      user.role === "admin"
        ? "/admin-dashboard"
        : user.role === "stylist"
        ? "/queue-management"
        : "/customer-dashboard"
    );
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "primary.main" }}>
        Glamour Hair Salon
      </Typography>
      <List>
        <ListItem
          button
          component={Link}
          to="/hairstyles"
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Hairstyles" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/stylist-portfolio"
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Stylists" />
        </ListItem>
        {user && (
          <ListItem
            button
            component={Link}
            to="/booking"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Book Appointment" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <MUIAppBar position="sticky" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "inherit",
              mr: 2,
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Glamour Hair Salon
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            <Button color="inherit" component={Link} to="/hairstyles">
              Hairstyles
            </Button>
            <Button color="inherit" component={Link} to="/stylist-portfolio">
              Stylists
            </Button>
            {user && (
              <Button color="inherit" component={Link} to="/booking">
                Book Appointment
              </Button>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user ? (
            <>
              <IconButton color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  {user.username} ({user.role})
                </MenuItem>
                {users
                  .filter((u) => u.id !== user.id)
                  .map((u) => (
                    <MenuItem key={u.id} onClick={() => handleUserSwitch(u.id)}>
                      Switch to {u.username} ({u.role})
                    </MenuItem>
                  ))}
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleClose();
                    navigate("/login");
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        {drawerContent}
      </Drawer>
    </MUIAppBar>
  );
};

export default AppBar;
