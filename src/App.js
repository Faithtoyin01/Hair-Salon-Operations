import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import AppBar from "./components/AppBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

// Mock data for services, stylists, and appointments
const mockServices = [
  { id: 1, name: "Haircut", price: 30, duration: "30 mins" },
  { id: 2, name: "Hair Coloring", price: 60, duration: "60 mins" },
  { id: 3, name: "Hair Treatment", price: 50, duration: "45 mins" },
];

const mockStylists = [
  { id: 1, name: "Jane Doe", specialty: "Haircut & Styling" },
  { id: 2, name: "John Smith", specialty: "Coloring & Treatments" },
];

const App = () => {
  const [user, setUser] = useState(null); // null, 'customer', or 'admin'
  const [appointments, setAppointments] = useState([]);
  const [inventory, setInventory] = useState([
    { id: 1, name: "Shampoo", stock: 20 },
    { id: 2, name: "Hair Dye", stock: 15 },
  ]);
  const { enqueueSnackbar } = useSnackbar();

  // Mock login function
  const handleLogin = (role) => {
    setUser(role);
    enqueueSnackbar("Logged in successfully!", { variant: "success" });
  };

  // Mock appointment booking
  const bookAppointment = (appointment) => {
    setAppointments([
      ...appointments,
      { id: appointments.length + 1, ...appointment, status: "Booked" },
    ]);
    enqueueSnackbar("Appointment booked successfully!", { variant: "success" });
  };

  // Mock inventory update
  const updateInventory = (productId, quantity) => {
    setInventory(
      inventory.map((item) =>
        item.id === productId ? { ...item, stock: item.stock - quantity } : item
      )
    );
    enqueueSnackbar("Inventory updated!", { variant: "success" });
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
        <AppBar user={user} setUser={setUser} />
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
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route
              path="/booking"
              element={
                user ? (
                  <BookingPage bookAppointment={bookAppointment} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/customer-dashboard"
              element={
                user === "customer" ? (
                  <CustomerDashboard appointments={appointments} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                user === "admin" ? (
                  <AdminDashboard
                    appointments={appointments}
                    inventory={inventory}
                    updateInventory={updateInventory}
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
