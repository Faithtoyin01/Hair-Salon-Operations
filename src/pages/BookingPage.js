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
} from "@mui/material";
import {
  Event as EventIcon,
  Payment as PaymentIcon,
} from "@mui/icons-material";
import { sendMockNotification } from "../utils";

const BookingPage = ({
  user,
  appointments,
  setAppointments,
  services,
  staff,
  payments,
  setPayments,
}) => {
  const [service, setService] = useState("");
  const [stylist, setStylist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (service && stylist && date && time && paymentMethod) {
      const selectedService = services.find((s) => s.name === service);
      const selectedStylist = staff.find((s) => s.name === stylist);
      if (!selectedService || !selectedStylist) {
        alert("Invalid service or stylist selected");
        return;
      }
      const newAppointment = {
        id: appointments.length + 1,
        customerId: user.id,
        stylistId: selectedStylist.id,
        serviceId: selectedService.id,
        dateTime: `${date}T${time}`,
        status: "Booked",
        paymentStatus: "Paid",
      };
      const newAppointments = [...appointments, newAppointment];
      setAppointments(newAppointments);
      setPayments([
        ...payments,
        {
          id: payments.length + 1,
          customerId: user.id,
          amount: selectedService.price,
          paymentMethod,
          date: new Date().toISOString(),
        },
      ]);
      sendMockNotification(
        user.email,
        `Appointment booked for ${service} on ${date} at ${time}`
      );
      navigate("/customer-dashboard");
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
          gap: 3,
          maxWidth: "400px",
          mx: "auto",
          mt: 4,
        }}
      >
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
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
              <EventIcon /> Book an Appointment
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Service</InputLabel>
              <Select
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                {services.map((s) => (
                  <MenuItem key={s.id} value={s.name}>
                    {s.name} (${s.price})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Stylist</InputLabel>
              <Select
                value={stylist}
                onChange={(e) => setStylist(e.target.value)}
              >
                {staff
                  .filter((s) => s.position === "Stylist")
                  .map((s) => (
                    <MenuItem key={s.id} value={s.name}>
                      {s.name} - {s.specialty}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <MenuItem value="credit">Credit Card</MenuItem>
                <MenuItem value="debit">Debit Card</MenuItem>
                <MenuItem value="mobile">Mobile Payment</MenuItem>
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
              startIcon={<PaymentIcon />}
            >
              Book and Pay
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default BookingPage;
