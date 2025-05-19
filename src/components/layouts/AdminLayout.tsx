
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import { motion } from 'framer-motion';
import AdminSidebar from '@/components/navigation/AdminSidebar';
import AdminHeader from '@/components/navigation/AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { state, setTheme } = useAppContext();
  const { theme, sidebarCollapsed } = state;
  
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };
  
  return (
    <SidebarProvider defaultOpen={!sidebarCollapsed}>
      <div className={`min-h-screen flex w-full bg-background/95 backdrop-blur-sm ${theme === 'dark' ? 'dark' : ''}`}>
        <AdminSidebar />
        <motion.div 
          className="flex flex-col flex-1 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AdminHeader toggleTheme={toggleTheme} isDarkMode={theme === 'dark'} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 transition-all">
            {children}
          </main>
        </motion.div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
