import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import HomePage from "./pages/HomePage";
import AppBar from "./components/AppBar";
import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StylistPortfolio from "./pages/StylistPortfolio";
import QueueManagement from "./pages/QueueManagement";
import {
  getUsers,
  getCurrentUser,
  getAppointments,
  getServices,
  getStaff,
  getInventory,
  getFeedback,
  getPayments,
} from "./utils";

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(getUsers());
  const [appointments, setAppointments] = useState(getAppointments());
  const [services, setServices] = useState(getServices());
  const [staff, setStaff] = useState(getStaff());
  const [inventory, setInventory] = useState(getInventory());
  const [feedback, setFeedback] = useState(getFeedback());
  const [payments, setPayments] = useState(getPayments());
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) setUser(currentUser);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    enqueueSnackbar("Logged in successfully!", { variant: "success" });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    enqueueSnackbar("Logged out successfully!", { variant: "success" });
  };

  const handleSwitchUser = (userId) => {
    const newUser = users.find((u) => u.id === userId);
    if (newUser) {
      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      enqueueSnackbar(`Switched to ${newUser.username}`, { variant: "info" });
    }
  };

  const updateData = (key, data, successMessage) => {
    localStorage.setItem(key, JSON.stringify(data));
    enqueueSnackbar(successMessage, { variant: "success" });
  };

  return (
    <BrowserRouter>
      <Box
        sx={{
          fontFamily: "Roboto, sans-serif",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <AppBar
          user={user}
          users={users}
          handleLogout={handleLogout}
          handleSwitchUser={handleSwitchUser}
        />
        <Container
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            pb: 4,
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage handleLogin={handleLogin} />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  setUser={handleLogin}
                  users={users}
                  setUsers={setUsers}
                />
              }
            />
            <Route
              path="/booking"
              element={
                user ? (
                  <BookingPage
                    user={user}
                    appointments={appointments}
                    setAppointments={(data) =>
                      updateData("appointments", data, "Appointment booked!")
                    }
                    services={services}
                    staff={staff}
                    payments={payments}
                    setPayments={(data) =>
                      updateData("payments", data, "Payment processed!")
                    }
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/customer-dashboard"
              element={
                user && user.role === "customer" ? (
                  <CustomerDashboard
                    user={user}
                    appointments={appointments}
                    feedback={feedback}
                    setFeedback={(data) =>
                      updateData("feedback", data, "Feedback submitted!")
                    }
                    services={services}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                user && user.role === "admin" ? (
                  <AdminDashboard
                    appointments={appointments}
                    setAppointments={(data) =>
                      updateData("appointments", data, "Appointments updated!")
                    }
                    inventory={inventory}
                    setInventory={(data) =>
                      updateData("inventory", data, "Inventory updated!")
                    }
                    services={services}
                    setServices={(data) =>
                      updateData("services", data, "Services updated!")
                    }
                    staff={staff}
                    setStaff={(data) =>
                      updateData("staff", data, "Staff updated!")
                    }
                    payments={payments}
                    feedback={feedback}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/stylist-portfolio/:stylistId"
              element={<StylistPortfolio staff={staff} feedback={feedback} />}
            />
            <Route
              path="/queue-management"
              element={
                user && user.role !== "customer" ? (
                  <QueueManagement
                    appointments={appointments}
                    setAppointments={(data) =>
                      updateData("appointments", data, "Queue updated!")
                    }
                    staff={staff}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
};

export default App;
