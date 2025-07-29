export const getUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
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
      {
        id: 1,
        name: "Braids",
        description: "Traditional Nigerian braids",
        price: 5000,
      },
      {
        id: 2,
        name: "Weave-On",
        description: "Sew-in weave installation",
        price: 10000,
      },
      {
        id: 3,
        name: "Hair Coloring",
        description: "Custom hair coloring",
        price: 15000,
      },
    ]
  );
};

export const getStaff = () => {
  return JSON.parse(localStorage.getItem("staff")) || [];
};

export const getInventory = () => {
  return (
    JSON.parse(localStorage.getItem("inventory")) || [
      {
        id: 1,
        name: "Hair Extensions",
        stock: 20,
        price: 5000,
        supplier: "Lagos Beauty Supplies",
      },
      {
        id: 2,
        name: "Hair Dye",
        stock: 15,
        price: 3000,
        supplier: "ColorTrend NG",
      },
    ]
  );
};

export const getFeedback = () => {
  return JSON.parse(localStorage.getItem("feedback")) || [];
};

export const getPayments = () => {
  return JSON.parse(localStorage.getItem("payments")) || [];
};

export const getHairstyles = () => {
  return JSON.parse(localStorage.getItem("hairstyles")) || [];
};

export const saveHairstyles = (hairstyles) => {
  localStorage.setItem("hairstyles", JSON.stringify(hairstyles));
};

export const sendMockNotification = (recipient, message) => {
  console.log(`Sending notification to ${recipient}: ${message}`);
  // In a real app, integrate with email/SMS service like Twilio
};
