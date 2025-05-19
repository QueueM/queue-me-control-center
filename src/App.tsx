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
import { AppProvider, useAppContext } from "@/contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";

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

// Protected route component that uses AppContext
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { state: { isAuthenticated, isLoading } } = useAppContext();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        />
      </div>
    );
  }

  // Use Navigate component for proper React Router navigation
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public route (for login page)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { state: { isAuthenticated, isLoading } } = useAppContext();
  
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
        />
      </div>
    );
  }
  
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

// Main App component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <BrowserRouter>
          <AnimatePresence mode="wait">
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
          </AnimatePresence>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
