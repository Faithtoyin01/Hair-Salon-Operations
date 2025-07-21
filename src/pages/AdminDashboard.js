import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const AdminDashboard = ({ appointments, inventory, updateInventory }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
    <Typography variant="h5">Admin Dashboard</Typography>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Appointments</Typography>
      {appointments.length === 0 ? (
        <Typography>No appointments booked.</Typography>
      ) : (
        <List>
          {appointments.map((appointment) => (
            <ListItem key={appointment.id}>
              <ListItemText
                primary={`${appointment.service} with ${appointment.stylist}`}
                secondary={`Date: ${appointment.date} | Time: ${appointment.time} | Status: ${appointment.status}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Inventory Management</Typography>
      <List>
        {inventory.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.name} - Stock: ${item.stock}`}
              secondary={item.stock < 5 ? "Low stock! Please reorder." : ""}
            />
            <Button
              variant="outlined"
              onClick={() => updateInventory(item.id, 1)}
              disabled={item.stock <= 0}
            >
              Use 1
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h6">Reports</Typography>
      <Card>
        <CardContent>
          <Typography>Total Appointments: {appointments.length}</Typography>
          <Typography>
            Low Stock Items: {inventory.filter((item) => item.stock < 5).length}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default AdminDashboard;
