
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import AdminLayout from "@/components/layouts/AdminLayout";
import DashboardPage from "@/pages/Dashboard";
import UsersPage from "@/pages/Users";
import ShopsPage from "@/pages/Shops";
import SubscriptionsPage from "@/pages/Subscriptions";
import PaymentsPage from "@/pages/Payments";
import SupportPage from "@/pages/Support";
import AnalyticsPage from "@/pages/Analytics";
import NotificationsPage from "@/pages/Notifications";
import SettingsPage from "@/pages/Settings";
import LoginPage from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import { PageTransition } from "@/components/ui/page-transition";
import { useEffect, useState } from "react";

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Auth check component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Use Navigate component instead of redirect for proper React Router navigation
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Login route with protection against authenticated users accessing login page
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);
  
  if (isAuthenticated === null) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition>
                    <DashboardPage />
                  </PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/users" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition>
                    <UsersPage />
                  </PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/shops" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition>
                    <ShopsPage />
                  </PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/subscriptions" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition>
                    <SubscriptionsPage />
                  </PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/payments" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition>
                    <PaymentsPage />
                  </PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/support" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition>
                    <SupportPage />
                  </PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition>
                    <AnalyticsPage />
                  </PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition>
                    <NotificationsPage />
                  </PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <PageTransition>
                    <SettingsPage />
                  </PageTransition>
                </AdminLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
