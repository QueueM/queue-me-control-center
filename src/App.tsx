
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "@/pages/NotFound";
import { motion } from "framer-motion";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <AdminLayout>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DashboardPage />
                </motion.div>
              </AdminLayout>
            } 
          />
          <Route 
            path="/users" 
            element={
              <AdminLayout>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <UsersPage />
                </motion.div>
              </AdminLayout>
            } 
          />
          <Route 
            path="/shops" 
            element={
              <AdminLayout>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShopsPage />
                </motion.div>
              </AdminLayout>
            } 
          />
          <Route 
            path="/subscriptions" 
            element={
              <AdminLayout>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SubscriptionsPage />
                </motion.div>
              </AdminLayout>
            } 
          />
          <Route 
            path="/payments" 
            element={
              <AdminLayout>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PaymentsPage />
                </motion.div>
              </AdminLayout>
            } 
          />
          <Route 
            path="/support" 
            element={
              <AdminLayout>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SupportPage />
                </motion.div>
              </AdminLayout>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <AdminLayout>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnalyticsPage />
                </motion.div>
              </AdminLayout>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <AdminLayout>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <NotificationsPage />
                </motion.div>
              </AdminLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <AdminLayout>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SettingsPage />
                </motion.div>
              </AdminLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
