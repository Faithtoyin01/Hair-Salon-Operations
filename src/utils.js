export const getUsers = () => {
  return (
    JSON.parse(localStorage.getItem("users")) || [
      {
        id: 1,
        username: "admin",
        password: "admin123",
        role: "admin",
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        phone: "1234567890",
      },
    ]
  );
};

export const saveUser = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const getAppointments = () => {
  return JSON.parse(localStorage.getItem("appointments")) || [];
};

export const getServices = () => {
  return (
    JSON.parse(localStorage.getItem("services")) || [
      { id: 1, name: "Haircut", description: "Standard haircut", price: 30 },
      {
        id: 2,
        name: "Hair Coloring",
        description: "Full color application",
        price: 60,
      },
      {
        id: 3,
        name: "Hair Treatment",
        description: "Deep conditioning",
        price: 50,
      },
    ]
  );
};

export const getStaff = () => {
  return (
    JSON.parse(localStorage.getItem("staff")) || [
      {
        id: 1,
        firstName: "Jane",
        lastName: "Doe",
        name: "Jane Doe",
        position: "Stylist",
        phone: "1234567890",
        email: "jane@example.com",
        specialty: "Haircut & Styling",
      },
      {
        id: 2,
        firstName: "John",
        lastName: "Smith",
        name: "John Smith",
        position: "Stylist",
        phone: "0987654321",
        email: "john@example.com",
        specialty: "Coloring & Treatments",
      },
    ]
  );
};

export const getInventory = () => {
  return (
    JSON.parse(localStorage.getItem("inventory")) || [
      {
        id: 1,
        name: "Shampoo",
        stock: 20,
        price: 10,
        supplier: "BeautySupplies",
      },
      { id: 2, name: "Hair Dye", stock: 15, price: 15, supplier: "ColorCo" },
    ]
  );
};

export const getFeedback = () => {
  return JSON.parse(localStorage.getItem("feedback")) || [];
};

export const getPayments = () => {
  return JSON.parse(localStorage.getItem("payments")) || [];
};

export const sendMockNotification = (recipient, message) => {
  console.log(`Sending notification to ${recipient}: ${message}`);
  // In a real app, integrate with email/SMS service like Twilio
};
