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
import HairstylesPage from "./pages/HairstylesPage";
import {
  getUsers,
  getCurrentUser,
  getAppointments,
  getServices,
  getStaff,
  getInventory,
  getFeedback,
  getPayments,
  getHairstyles,
} from "./utils";
import useAppointmentNotifier from "./hooks/useAppointmentNotifier";

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(getUsers());
  const [appointments, setAppointments] = useState(getAppointments());
  const [services, setServices] = useState(getServices());
  const [staff, setStaff] = useState(getStaff());
  const [inventory, setInventory] = useState(getInventory());
  const [feedback, setFeedback] = useState(getFeedback());
  const [payments, setPayments] = useState(getPayments());
  const [hairstyles, setHairstyles] = useState(getHairstyles());
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) setUser(currentUser);
  }, []);

  // Refresh data from localStorage on updates
  useEffect(() => {
    setUsers(getUsers() || []);
    setAppointments(getAppointments() || []);
    setServices(getServices() || []);
    setStaff(getStaff() || []);
    setInventory(getInventory() || []);
    setFeedback(getFeedback() || []);
    setPayments(getPayments() || []);
    setHairstyles(getHairstyles() || []);
  }, []); // ✅ run once only

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
    if (key === "appointments") setAppointments(data);
    if (key === "staff") setStaff(data);
    if (key === "services") setServices(data);
    if (key === "inventory") setInventory(data);
    if (key === "feedback") setFeedback(data);
    if (key === "payments") setPayments(data);
    if (key === "hairstyles") setHairstyles(data);
  };

  useAppointmentNotifier(appointments, user, services, staff);

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => console.log("🛠️ Service Worker registered", reg.scope))
        .catch((err) =>
          console.error("Service Worker registration failed", err)
        );
    });
  }

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
                    staff={staff}
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
                    hairstyles={hairstyles}
                    setHairstyles={(data) =>
                      updateData("hairstyles", data, "Hairstyle added!")
                    }
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/stylist-portfolio"
              element={<StylistPortfolio staff={staff} feedback={feedback} />}
            />
            <Route
              path="/stylist-portfolio/:stylistId"
              element={<StylistPortfolio staff={staff} feedback={feedback} />}
            />

            <Route
              path="/queue-management"
              element={
                user && user.role === "stylist" ? (
                  <QueueManagement
                    user={user}
                    appointments={appointments}
                    setAppointments={(data) =>
                      updateData("appointments", data, "Queue updated!")
                    }
                    services={services}
                    staff={staff}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route path="/hairstyles" element={<HairstylesPage />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
};

export default App;
