import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Fade,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Login as LoginIcon,
  PersonAdd as SignupIcon,
} from "@mui/icons-material";
import { saveUser } from "../utils";

const LoginPage = ({ setUser, users, setUsers }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hairType, setHairType] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate(
        user.role === "admin"
          ? "/admin-dashboard"
          : user.role === "stylist"
          ? "/queue-management"
          : "/customer-dashboard"
      );
    } else {
      alert("Invalid credentials");
    }
  };

  const handleSignup = () => {
    if (
      username &&
      password &&
      role &&
      firstName &&
      lastName &&
      email &&
      phone
    ) {
      const newUser = {
        id: users.length + 1,
        username,
        password,
        role,
        firstName,
        lastName,
        email,
        phone,
        hairType: role === "customer" ? hairType : null,
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      saveUser(updatedUsers);
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      navigate(
        role === "admin"
          ? "/admin-dashboard"
          : role === "stylist"
          ? "/queue-management"
          : "/customer-dashboard"
      );
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Fade in timeout={1000}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          maxWidth: "400px",
          mx: "auto",
          mt: 4,
        }}
      >
        <Card sx={{ width: "100%", bgcolor: "background.paper" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <LoginIcon /> Glamour Hair Salon
            </Typography>
            <Tabs
              value={isLogin ? 0 : 1}
              onChange={(e, v) => setIsLogin(v === 0)}
              centered
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
            {isLogin ? (
              <>
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  startIcon={<LoginIcon />}
                >
                  Login
                </Button>
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                />
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <MenuItem value="customer">Customer</MenuItem>
                    <MenuItem value="stylist">Stylist</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
                {role === "customer" && (
                  <FormControl fullWidth>
                    <InputLabel>Hair Type</InputLabel>
                    <Select
                      value={hairType}
                      onChange={(e) => setHairType(e.target.value)}
                    >
                      <MenuItem value="straight">Straight</MenuItem>
                      <MenuItem value="curly">Curly</MenuItem>
                      <MenuItem value="coily">Coily</MenuItem>
                      <MenuItem value="wavy">Wavy</MenuItem>
                    </Select>
                  </FormControl>
                )}
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleSignup}
                  startIcon={<SignupIcon />}
                >
                  Sign Up
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default LoginPage;
