import React, { useState } from "react";
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import {
  Event as EventIcon,
  Inventory as InventoryIcon,
  Assessment as ReportIcon,
  Add as AddIcon,
  Style as StyleIcon,
} from "@mui/icons-material";
import { sendMockNotification, saveHairstyles } from "../utils";

const AdminDashboard = ({
  appointments,
  setAppointments,
  inventory,
  setInventory,
  services,
  setServices,
  staff,
  setStaff,
  payments,
  feedback,
  hairstyles,
  setHairstyles,
}) => {
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    price: "",
    supplier: "",
  });
  const [newStaff, setNewStaff] = useState({
    firstName: "",
    lastName: "",
    position: "",
    phone: "",
    email: "",
    specialty: "",
    experience: "",
    bio: "",
    image: "",
    video: "", // ✅ NEW
  });

  const [newHairstyle, setNewHairstyle] = useState({
    name: "",
    description: "",
    image: "",
    imageUrl: "",
    video: "", // ✅ NEW
  });

  const [staffImagePreview, setStaffImagePreview] = useState("");
  const [hairstyleImagePreview, setHairstyleImagePreview] = useState("");

  const [staffVideoPreview, setStaffVideoPreview] = useState("");
  const [hairstyleVideoPreview, setHairstyleVideoPreview] = useState("");

  const MAX_VIDEO_SIZE_MB = 2;
  const MAX_ENTRIES = 10;

  const handleAddService = () => {
    if (newService.name && newService.description && newService.price) {
      const newServices = [
        ...services,
        {
          id: services.length + 1,
          ...newService,
          price: parseFloat(newService.price),
        },
      ];
      setServices(newServices);
      setNewService({ name: "", description: "", price: "" });
    } else {
      alert("Please fill in all service fields");
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.stock && newProduct.price) {
      const newInventory = [
        ...inventory,
        {
          id: inventory.length + 1,
          ...newProduct,
          stock: parseInt(newProduct.stock),
          price: parseFloat(newProduct.price),
        },
      ];
      setInventory(newInventory);
      if (parseInt(newProduct.stock) < 5) {
        sendMockNotification(
          "admin@example.com",
          `Low stock alert: ${newProduct.name} has ${newProduct.stock} units`
        );
      }
      setNewProduct({ name: "", stock: "", price: "", supplier: "" });
    } else {
      alert("Please fill in all product fields");
    }
  };

  const handleAddStaff = () => {
    if (
      newStaff.firstName &&
      newStaff.lastName &&
      newStaff.position &&
      newStaff.phone &&
      newStaff.email
    ) {
      const newStaffMember = {
        id: staff.length + 1,
        ...newStaff,
        name: `${newStaff.firstName} ${newStaff.lastName}`,
      };

      const updatedStaff = [...staff, newStaffMember].slice(-MAX_ENTRIES); // ✅ Keep last MAX_ENTRIES only
      setStaff(updatedStaff);
      localStorage.setItem("staff", JSON.stringify(updatedStaff));

      setNewStaff({
        firstName: "",
        lastName: "",
        position: "",
        phone: "",
        email: "",
        specialty: "",
        experience: "",
        bio: "",
        image: "",
        video: "",
      });
      setStaffImagePreview("");
      setStaffVideoPreview("");
    } else {
      alert("Please fill in all staff fields");
    }
  };

  const handleAddHairstyle = () => {
    if (
      newHairstyle.name &&
      newHairstyle.description &&
      (newHairstyle.image || newHairstyle.imageUrl || newHairstyle.video)
    ) {
      const newHairstyles = [
        ...hairstyles,
        { id: hairstyles.length + 1, ...newHairstyle },
      ].slice(-MAX_ENTRIES); // ✅ Keep last MAX_ENTRIES only

      setHairstyles(newHairstyles);
      saveHairstyles(newHairstyles);
      setNewHairstyle({
        name: "",
        description: "",
        image: "",
        imageUrl: "",
        video: "",
      });
      setHairstyleImagePreview("");
      setHairstyleVideoPreview("");
    } else {
      alert(
        "Please fill in all hairstyle fields and provide at least one media file (image, image URL, or video)"
      );
    }
  };

  const handleUpdateInventory = (productId, quantity) => {
    const updatedInventory = inventory.map((item) =>
      item.id === productId ? { ...item, stock: item.stock - quantity } : item
    );
    setInventory(updatedInventory);
    const lowStock = updatedInventory.find(
      (item) => item.id === productId && item.stock < 5
    );
    if (lowStock) {
      sendMockNotification(
        "admin@example.com",
        `Low stock alert: ${lowStock.name} has ${lowStock.stock} units`
      );
    }
  };

  const handleStaffImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewStaff({ ...newStaff, image: reader.result });
        setStaffImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file");
    }
  };

  const handleHairstyleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewHairstyle({ ...newHairstyle, image: reader.result });
        setHairstyleImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file");
    }
  };

  const specialtyOptions = [
    "Braids & Weaves",
    "Hair Coloring & Cuts",
    "Cornrows",
    "Natural Hair Styling",
  ];

  const hairstyleOptions = [
    "Cornrows",
    "Box Braids",
    "Weave-On",
    "Fulani Braids",
    "Ghana Weaving",
  ];

  const handleVideoChange = (e, setFunction, setPreview, label) => {
    const file = e.target.files[0];
    e.target.value = null; // Clear file input regardless of validity
    if (!file) return;

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_VIDEO_SIZE_MB) {
      alert(`${label} video must be under ${MAX_VIDEO_SIZE_MB}MB`);
      return;
    }

    if (!file.type.startsWith("video/")) {
      alert("Please select a valid video file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFunction((prev) => ({
        ...prev,
        video: reader.result,
        image: prev.image || "",
      }));
      if (setPreview) setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e, setFunction, setPreview, label) => {
    const file = e.target.files[0];
    e.target.value = null; // Clear file input regardless of validity
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFunction((prev) => ({
        ...prev,
        image: reader.result,
        video: prev.video || "",
      }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClearImage = (setFunction, setPreview) => {
    setFunction((prev) => ({ ...prev, image: "" }));
    if (setPreview) setPreview("");
  };

  const handleClearVideo = (setFunction, setPreview) => {
    setFunction((prev) => ({ ...prev, video: "" }));
    if (setPreview) setPreview("");
  };

  return (
    <Fade in timeout={1000}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 500, color: "primary.main" }}
        >
          Admin Dashboard
        </Typography>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <EventIcon /> Appointments
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service</TableCell>
                  <TableCell>Stylist</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      {services.find((s) => s.id === a.serviceId)?.name ||
                        "Unknown Service"}
                    </TableCell>
                    <TableCell>
                      {staff.find((s) => s.id === a.stylistId)?.name ||
                        "Unknown Stylist"}
                    </TableCell>
                    <TableCell>{a.dateTime.split("T")[0]}</TableCell>
                    <TableCell>{a.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
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
                    primary={`${item.name} - Stock: ${
                      item.stock
                    } (₦${item.price.toLocaleString()})`}
                    secondary={
                      item.stock < 5
                        ? "Low stock! Please reorder."
                        : `Supplier: ${item.supplier || "N/A"}`
                    }
                    secondaryTypographyProps={{
                      color: item.stock < 5 ? "error.main" : "text.secondary",
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdateInventory(item.id, 1)}
                    disabled={item.stock <= 0}
                  >
                    Use 1
                  </Button>
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <TextField
                label="Stock Level"
                type="number"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, stock: e.target.value })
                }
              />
              <TextField
                label="Price (₦)"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <TextField
                label="Supplier"
                value={newProduct.supplier}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, supplier: e.target.value })
                }
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddProduct}
                startIcon={<AddIcon />}
              >
                Add Product
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <AddIcon /> Service Management
            </Typography>
            <List>
              {services.map((service) => (
                <ListItem
                  key={service.id}
                  sx={{ bgcolor: "background.default", borderRadius: 2, mb: 1 }}
                >
                  <ListItemText
                    primary={`${
                      service.name
                    } - ₦${service.price.toLocaleString()}`}
                    secondary={service.description}
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Service Name"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
              />
              <TextField
                label="Description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
              />
              <TextField
                label="Price (₦)"
                type="number"
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: e.target.value })
                }
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddService}
                startIcon={<AddIcon />}
              >
                Add Service
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <AddIcon /> Staff Management
            </Typography>
            <List>
              {staff.map((s) => (
                <ListItem
                  key={s.id}
                  sx={{ bgcolor: "background.default", borderRadius: 2, mb: 1 }}
                >
                  <ListItemText
                    primary={`${s.name} - ${s.position}`}
                    secondary={`Email: ${s.email} | Specialty: ${
                      s.specialty || "N/A"
                    }`}
                  />
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="First Name"
                value={newStaff.firstName}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, firstName: e.target.value })
                }
              />
              <TextField
                label="Last Name"
                value={newStaff.lastName}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, lastName: e.target.value })
                }
              />
              <FormControl fullWidth>
                <InputLabel>Position</InputLabel>
                <Select
                  value={newStaff.position}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, position: e.target.value })
                  }
                >
                  <MenuItem value="Stylist">Stylist</MenuItem>
                  <MenuItem value="Receptionist">Receptionist</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Phone Number"
                value={newStaff.phone}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, phone: e.target.value })
                }
              />
              <TextField
                label="Email"
                value={newStaff.email}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, email: e.target.value })
                }
              />
              {newStaff.position === "Stylist" && (
                <>
                  <FormControl fullWidth>
                    <InputLabel>Specialty</InputLabel>
                    <Select
                      value={newStaff.specialty}
                      onChange={(e) =>
                        setNewStaff({ ...newStaff, specialty: e.target.value })
                      }
                    >
                      {specialtyOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Experience (Years)"
                    type="number"
                    value={newStaff.experience}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, experience: e.target.value })
                    }
                  />
                  <TextField
                    label="Bio"
                    multiline
                    rows={4}
                    value={newStaff.bio}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, bio: e.target.value })
                    }
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageChange(
                        e,
                        setNewStaff,
                        setStaffImagePreview,
                        "Staff"
                      )
                    }
                    disabled={!!newStaff.video}
                    sx={{ mt: 1 }}
                  />
                  {staffImagePreview && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">Image Preview:</Typography>
                      <img
                        src={staffImagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          borderRadius: "8px",
                        }}
                      />
                      <Button
                        size="small"
                        onClick={() =>
                          handleClearImage(setNewStaff, setStaffImagePreview)
                        }
                      >
                        Remove Image
                      </Button>
                    </Box>
                  )}
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      handleVideoChange(
                        e,
                        setNewStaff,
                        setStaffVideoPreview,
                        "Staff"
                      )
                    }
                    disabled={!!newStaff.image}
                    sx={{ mt: 1 }}
                  />
                  {newStaff.video && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2">Video Preview:</Typography>
                      <video
                        src={newStaff.video}
                        controls
                        style={{ maxWidth: "150px", borderRadius: 8 }}
                      />
                      <Button
                        size="small"
                        onClick={() =>
                          handleClearVideo(setNewStaff, setStaffVideoPreview)
                        }
                      >
                        Remove Video
                      </Button>
                    </Box>
                  )}
                </>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddStaff}
                startIcon={<AddIcon />}
              >
                Add Staff
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <StyleIcon /> Hairstyle Management
            </Typography>
            <List>
              {hairstyles.map((h) => (
                <ListItem
                  key={h.id}
                  sx={{ bgcolor: "background.default", borderRadius: 2, mb: 1 }}
                >
                  <ListItemText primary={h.name} secondary={h.description} />
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Hairstyle</InputLabel>
                <Select
                  value={newHairstyle.name}
                  onChange={(e) =>
                    setNewHairstyle({ ...newHairstyle, name: e.target.value })
                  }
                >
                  {hairstyleOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Description"
                multiline
                rows={2}
                value={newHairstyle.description}
                onChange={(e) =>
                  setNewHairstyle({
                    ...newHairstyle,
                    description: e.target.value,
                  })
                }
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageChange(
                    e,
                    setNewHairstyle,
                    setHairstyleImagePreview,
                    "Hairstyle"
                  )
                }
                disabled={!!newHairstyle.video}
                sx={{ mt: 1 }}
              />
              {hairstyleImagePreview && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Image Preview:</Typography>
                  <img
                    src={hairstyleImagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "100px",
                      maxHeight: "100px",
                      borderRadius: "8px",
                    }}
                  />
                  <Button
                    size="small"
                    onClick={() =>
                      handleClearImage(
                        setNewHairstyle,
                        setHairstyleImagePreview
                      )
                    }
                  >
                    Remove Image
                  </Button>
                </Box>
              )}
              <Input
                type="file"
                accept="video/*"
                onChange={(e) =>
                  handleVideoChange(
                    e,
                    setNewHairstyle,
                    setHairstyleVideoPreview,
                    "Hairstyle"
                  )
                }
                disabled={!!newHairstyle.image || !!newHairstyle.imageUrl}
                sx={{ mt: 1 }}
              />
              {newHairstyle.video && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">Video Preview:</Typography>
                  <video
                    src={newHairstyle.video}
                    controls
                    style={{ maxWidth: "150px", borderRadius: 8 }}
                  />
                  <Button
                    size="small"
                    onClick={() =>
                      handleClearVideo(
                        setNewHairstyle,
                        setHairstyleVideoPreview
                      )
                    }
                  >
                    Remove Video
                  </Button>
                </Box>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleAddHairstyle}
                startIcon={<AddIcon />}
              >
                Add Hairstyle
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ bgcolor: "background.paper" }}>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <ReportIcon /> Reports
            </Typography>
            <Typography>Total Appointments: {appointments.length}</Typography>
            <Typography>
              Total Revenue: ₦
              {payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
            </Typography>
            <Typography>
              Low Stock Items:{" "}
              {inventory.filter((item) => item.stock < 5).length}
            </Typography>
            <Typography>
              Average Customer Rating:{" "}
              {(
                feedback.reduce((sum, f) => sum + f.rating, 0) /
                (feedback.length || 1)
              ).toFixed(1)}{" "}
              / 5
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default AdminDashboard;
