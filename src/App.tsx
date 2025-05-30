
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import { AppProvider } from './contexts/AppContext';

// Layouts
import AdminLayout from './components/layouts/AdminLayout';

// Pages
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Shops from './pages/Shops';
import ShopDetails from './components/shops/ShopDetails';
import Payments from './pages/Payments';
import Subscriptions from './pages/Subscriptions';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Support from './pages/Support';
import Index from './pages/Index';
import Companies from './pages/Companies';
import Appointments from './pages/Appointments';
import Reports from './pages/Reports';
import Services from './pages/Services';

// Enable mockApi globally (for development)
import { useMockApi } from './services/mockApiService';

import './App.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  if (useMockApi) {
    console.log('🧪 Mock API is enabled');
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route path="/" element={<AdminLayout />}>
                <Route index element={<Index />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="shops" element={<Shops />} />
                <Route path="shops/:shopId" element={<ShopDetails />} />
                <Route path="companies" element={<Companies />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="payments" element={<Payments />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="reports" element={<Reports />} />
                <Route path="services" element={<Services />} />
                <Route path="settings" element={<Settings />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="support" element={<Support />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
