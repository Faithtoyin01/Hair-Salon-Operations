import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home.js';
import LoginPage from './pages/Login.js';
import RegisterPage from './pages/Register.js';
import PropertyList from './pages/Properties.js';
import PropertyDetails from './pages/PropertyDetails.js';
import Dashboard from './pages/Dashboard.js';
import MaintenancePage from './pages/Maintenance.js';
import ReviewPage from './pages/Review.js';
import RentHistoryPage from './pages/RentHistory.js';
import LeaseAgreementPage from './pages/LeaseAgreementPage.js';
import SublettingTerminationPage from './pages/SublettingTerminationPage.js';
import InventoryChecklistPage from './pages/InventoryChecklistPage.js';
import RentPolicyPage from './pages/RentPolicyPage.js';
import './index.css';
import './fonts/fonts.css';
import { SnackbarProvider } from 'notistack';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function START() {
    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: {
                main: '#1976d2',
            },
            secondary: {
                main: '#ff9800',
            },
        },
        shape: {
            borderRadius: 12,
        },
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
    });
    return (
        <>

            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/properties" element={<PropertyList />} />
                        <Route path="/property/:id" element={<PropertyDetails />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/maintenance" element={<MaintenancePage />} />
                        <Route path="/review" element={<ReviewPage />} />
                        <Route path="/agreements" element={<LeaseAgreementPage />} />
                        <Route path="/subletting" element={<SublettingTerminationPage />} />
                        <Route path="/inventory" element={<InventoryChecklistPage />} />
                        <Route path="/rent-policy" element={<RentPolicyPage />} />
                        <Route path="/rent-history" element={<RentHistoryPage />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SnackbarProvider maxSnack={3}>
    <START />
</SnackbarProvider>);
