export const getUsers = () => {
  return (
    JSON.parse(localStorage.getItem("users")) || [
      {
        id: 1,
        username: "admin",
        password: "admin123",
        role: "admin",
        firstName: "Chukwuma",
        lastName: "Okeke",
        email: "admin@example.com",
        phone: "08012345678",
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
  return (
    JSON.parse(localStorage.getItem("staff")) || [
      {
        id: 1,
        firstName: "Chiamaka",
        lastName: "Okeke",
        name: "Chiamaka Okeke",
        position: "Stylist",
        phone: "08012345678",
        email: "chiamaka@example.com",
        specialty: "Braids & Weaves",
        experience: "5 years",
        bio: "Chiamaka is a skilled stylist specializing in intricate braids and weaves, inspired by Nigerian trends.",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
      },
      {
        id: 2,
        firstName: "Tunde",
        lastName: "Adebayo",
        name: "Tunde Adebayo",
        position: "Stylist",
        phone: "08098765432",
        email: "tunde@example.com",
        specialty: "Hair Coloring & Cuts",
        experience: "3 years",
        bio: "Tunde brings creativity to hair coloring and precision cuts, with a passion for vibrant styles.",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
      },
    ]
  );
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
  return (
    JSON.parse(localStorage.getItem("hairstyles")) || [
      {
        id: 1,
        name: "Cornrows",
        description:
          "Neat, tight braids close to the scalp, perfect for a sleek look.",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
        imageUrl: "https://via.placeholder.com/300x200?text=Cornrows",
      },
      {
        id: 2,
        name: "Box Braids",
        description:
          "Individual braids for a versatile, low-maintenance style.",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
        imageUrl: "https://via.placeholder.com/300x200?text=Box+Braids",
      },
      {
        id: 3,
        name: "Weave-On",
        description: "Sew-in extensions for added length and volume.",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
        imageUrl: "https://via.placeholder.com/300x200?text=Weave-On",
      },
      {
        id: 4,
        name: "Fulani Braids",
        description: "Intricate braids with beads, inspired by Fulani culture.",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
        imageUrl: "https://via.placeholder.com/300x200?text=Fulani+Braids",
      },
      {
        id: 5,
        name: "Ghana Weaving",
        description: "Elegant woven style for a bold look.",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
        imageUrl: "https://via.placeholder.com/300x200?text=Ghana+Weaving",
      },
    ]
  );
};

export const saveHairstyles = (hairstyles) => {
  localStorage.setItem("hairstyles", JSON.stringify(hairstyles));
};

export const sendMockNotification = (recipient, message) => {
  console.log(`Sending notification to ${recipient}: ${message}`);
  // In a real app, integrate with email/SMS service like Twilio
};
