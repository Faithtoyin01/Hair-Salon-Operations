import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar as MUIAppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";

const AppBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  return (
    <MUIAppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Hair Salon Management</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          {user === "customer" && (
            <>
              <Button color="inherit" onClick={() => navigate("/booking")}>
                Book Appointment
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate("/customer-dashboard")}
              >
                Dashboard
              </Button>
            </>
          )}
          {user === "admin" && (
            <Button
              color="inherit"
              onClick={() => navigate("/admin-dashboard")}
            >
              Admin Dashboard
            </Button>
          )}
          {!user && (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            </>
          )}
          {user && (
            <Button
              color="inherit"
              onClick={() => {
                setUser(null);
                navigate("/");
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
