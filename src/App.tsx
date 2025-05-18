
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
import { PageTransition } from "@/components/ui/page-transition";

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
                <PageTransition>
                  <DashboardPage />
                </PageTransition>
              </AdminLayout>
            } 
          />
          <Route 
            path="/users" 
            element={
              <AdminLayout>
                <PageTransition>
                  <UsersPage />
                </PageTransition>
              </AdminLayout>
            } 
          />
          <Route 
            path="/shops" 
            element={
              <AdminLayout>
                <PageTransition>
                  <ShopsPage />
                </PageTransition>
              </AdminLayout>
            } 
          />
          <Route 
            path="/subscriptions" 
            element={
              <AdminLayout>
                <PageTransition>
                  <SubscriptionsPage />
                </PageTransition>
              </AdminLayout>
            } 
          />
          <Route 
            path="/payments" 
            element={
              <AdminLayout>
                <PageTransition>
                  <PaymentsPage />
                </PageTransition>
              </AdminLayout>
            } 
          />
          <Route 
            path="/support" 
            element={
              <AdminLayout>
                <PageTransition>
                  <SupportPage />
                </PageTransition>
              </AdminLayout>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <AdminLayout>
                <PageTransition>
                  <AnalyticsPage />
                </PageTransition>
              </AdminLayout>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <AdminLayout>
                <PageTransition>
                  <NotificationsPage />
                </PageTransition>
              </AdminLayout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <AdminLayout>
                <PageTransition>
                  <SettingsPage />
                </PageTransition>
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
