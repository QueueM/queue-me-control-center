
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Subscriptions, 
  CreditCard, 
  MessageSquare, 
  BarChart, 
  Bell, 
  Settings 
} from "lucide-react";

const AdminSidebar: React.FC = () => {
  // Define navigation items
  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Users', icon: Users, path: '/users' },
    { name: 'Shops', icon: Store, path: '/shops' },
    { name: 'Subscriptions', icon: Subscriptions, path: '/subscriptions' },
    { name: 'Payments', icon: CreditCard, path: '/payments' },
    { name: 'Chat Support', icon: MessageSquare, path: '/support' },
    { name: 'Analytics', icon: BarChart, path: '/analytics' },
    { name: 'Notifications', icon: Bell, path: '/notifications' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <img src="/logo.svg" alt="QueueMe Logo" className="h-8" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-sm text-muted-foreground">
          QueueMe Admin Panel v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
