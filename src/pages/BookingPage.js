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
} from "@mui/material";

const mockServices = [
  { id: 1, name: "Haircut", price: 30, duration: "30 mins" },
  { id: 2, name: "Hair Coloring", price: 60, duration: "60 mins" },
  { id: 3, name: "Hair Treatment", price: 50, duration: "45 mins" },
];

const mockStylists = [
  { id: 1, name: "Jane Doe", specialty: "Haircut & Styling" },
  { id: 2, name: "John Smith", specialty: "Coloring & Treatments" },
];

const BookingPage = ({ bookAppointment }) => {
  const [service, setService] = useState("");
  const [stylist, setStylist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (service && stylist && date && time) {
      bookAppointment({ service, stylist, date, time });
      navigate("/customer-dashboard");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: "400px",
        mx: "auto",
      }}
    >
      <Typography variant="h5">Book an Appointment</Typography>
      <FormControl fullWidth>
        <InputLabel>Service</InputLabel>
        <Select value={service} onChange={(e) => setService(e.target.value)}>
          {mockServices.map((s) => (
            <MenuItem key={s.id} value={s.name}>
              {s.name} (${s.price})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Stylist</InputLabel>
        <Select value={stylist} onChange={(e) => setStylist(e.target.value)}>
          {mockStylists.map((s) => (
            <MenuItem key={s.id} value={s.name}>
              {s.name} - {s.specialty}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Time"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Book Appointment
      </Button>
    </Box>
  );
};

export default BookingPage;
