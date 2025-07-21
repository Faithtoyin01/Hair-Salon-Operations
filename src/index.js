import React from "react";
import ReactDOM from "react-dom/client";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#6B4E71" },
    secondary: { main: "#F4A261" },
    accent: { main: "#E76F51" },
    background: { default: "#F9F4F3", paper: "#FFFFFF" },
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: "Roboto, sans-serif" },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          transition: "transform 0.2s ease-in-out",
          "&:hover": { transform: "scale(1.05)" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease-in-out",
          "&:hover": { transform: "translateY(-4px)" },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SnackbarProvider maxSnack={3}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </SnackbarProvider>
);
