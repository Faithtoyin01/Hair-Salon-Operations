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
  Fade,
} from "@mui/material";
import {
  Event as EventIcon,
  Inventory as InventoryIcon,
  Assessment as ReportIcon,
} from "@mui/icons-material";

const AdminDashboard = ({ appointments, inventory, updateInventory }) => (
  <Fade in timeout={1000}>
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 500, color: "primary.main" }}>
        Admin Dashboard
      </Typography>
      <Card sx={{ bgcolor: "background.paper" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <EventIcon /> Appointments
          </Typography>
          {appointments.length === 0 ? (
            <Typography color="text.secondary">
              No appointments booked.
            </Typography>
          ) : (
            <List>
              {appointments.map((appointment) => (
                <ListItem
                  key={appointment.id}
                  sx={{ bgcolor: "background.default", borderRadius: 2, mb: 1 }}
                >
                  <ListItemText
                    primary={`${appointment.service} with ${appointment.stylist}`}
                    secondary={`Date: ${appointment.date} | Time: ${appointment.time} | Status: ${appointment.status}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
      <Card sx={{ bgcolor: "background.paper" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <InventoryIcon /> Inventory Management
          </Typography>
          <List>
            {inventory.map((item) => (
              <ListItem
                key={item.id}
                sx={{ bgcolor: "background.default", borderRadius: 2, mb: 1 }}
              >
                <ListItemText
                  primary={`${item.name} - Stock: ${item.stock}`}
                  secondary={item.stock < 5 ? "Low stock! Please reorder." : ""}
                  secondaryTypographyProps={{
                    color: item.stock < 5 ? "error.main" : "text.secondary",
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => updateInventory(item.id, 1)}
                  disabled={item.stock <= 0}
                >
                  Use 1
                </Button>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Card sx={{ bgcolor: "background.paper" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <ReportIcon /> Reports
          </Typography>
          <Typography>Total Appointments: {appointments.length}</Typography>
          <Typography>
            Low Stock Items: {inventory.filter((item) => item.stock < 5).length}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  </Fade>
);

export default AdminDashboard;
