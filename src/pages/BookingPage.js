import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Fade,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { Event as EventIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const BookingPage = ({
  user,
  appointments,
  setAppointments,
  services,
  staff,
  payments,
  setPayments,
}) => {
  const [appointment, setAppointment] = useState({
    serviceId: "",
    stylistId: "",
    dateTime: "",
    customerEmail: user.email || "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const handleSubmit = () => {
    if (
      appointment.serviceId &&
      appointment.stylistId &&
      appointment.dateTime &&
      appointment.customerEmail
    ) {
      const newAppointment = {
        id: appointments.length + 1,
        userId: user.id,
        customerEmail: appointment.customerEmail,
        serviceId: parseInt(appointment.serviceId),
        stylistId: parseInt(appointment.stylistId),
        dateTime: appointment.dateTime,
        status: "confirmed",
      };
      const service = services.find(
        (s) => s.id === parseInt(appointment.serviceId)
      );
      const newPayment = {
        id: payments.length + 1,
        appointmentId: newAppointment.id,
        amount: service ? service.price : 0,
        date: new Date().toISOString(),
      };
      const updatedAppointments = [...appointments, newAppointment];
      const updatedPayments = [...payments, newPayment];

      setAppointments(updatedAppointments);
      setPayments(updatedPayments);
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      localStorage.setItem("payments", JSON.stringify(updatedPayments));

      // Send to service worker
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "STORE_APPOINTMENTS",
          data: updatedAppointments.map((a) => ({
            ...a,
            stylistName:
              staff.find((s) => s.id === a.stylistId)?.name || "Stylist",
          })),
        });
      }

      navigate("/customer-dashboard");
    } else {
      alert("Please fill in all fields");
    }
  };

  // Ask for notification permission once
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <Fade in timeout={1000}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
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
          <EventIcon />
          Book an Appointment
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Service</InputLabel>
          <Select
            name="serviceId"
            value={appointment.serviceId}
            onChange={handleChange}
          >
            {services.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name} - ₦{s.price.toLocaleString()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Stylist</InputLabel>
          <Select
            name="stylistId"
            value={appointment.stylistId}
            onChange={handleChange}
          >
            {staff
              .filter((s) => s.position === "Stylist")
              .map((s) => (
                <MenuItem key={s.id} value={s.id}>
                  {s.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          label="Date & Time"
          type="datetime-local"
          name="dateTime"
          value={appointment.dateTime}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{
            min: moment().tz("Africa/Lagos").format("YYYY-MM-DDTHH:mm"),
          }}
        />
        <TextField
          label="Your Email"
          name="customerEmail"
          value={appointment.customerEmail}
          onChange={handleChange}
          placeholder="e.g., your.email@example.com"
        />
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Book Now
        </Button>
      </Box>
    </Fade>
  );
};

export default BookingPage;
