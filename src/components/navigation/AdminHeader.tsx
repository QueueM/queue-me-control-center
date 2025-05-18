
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AdminHeaderProps {
  children?: React.ReactNode;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ children }) => {
  return (
    <header className="h-16 border-b bg-background flex items-center px-4 md:px-6">
      <SidebarTrigger />
      
      <h1 className="text-xl font-semibold ml-4">QueueMe Admin</h1>
      
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Mail className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">5</Badge>
        </Button>
        
        {children}
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium hidden md:inline">Admin User</span>
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
