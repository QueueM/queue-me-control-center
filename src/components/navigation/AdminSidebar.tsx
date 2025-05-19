
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  CreditCard, 
  MessageSquare, 
  BarChart, 
  Bell, 
  Settings,
  BookOpen,
  Calendar,
  HelpCircle,
  PieChart,
  Building,
  Menu,
  Layers
} from "lucide-react";
import { motion } from 'framer-motion';
import { useAppContext } from '@/contexts/AppContext';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { state } = useAppContext();
  const { user } = state;
  
  // Define navigation items
  const navigationItems = [
    { 
      name: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/',
      permission: 'view_dashboard'
    },
    { 
      name: 'Users', 
      icon: Users, 
      path: '/users',
      permission: 'view_users'
    },
    { 
      name: 'Companies', 
      icon: Building, 
      path: '/companies',
      permission: 'view_companies'
    },
    { 
      name: 'Shops', 
      icon: Store, 
      path: '/shops',
      permission: 'view_shops'
    },
    { 
      name: 'Appointments', 
      icon: Calendar, 
      path: '/appointments',
      permission: 'view_appointments'
    },
    { 
      name: 'Subscriptions', 
      icon: BookOpen, 
      path: '/subscriptions',
      permission: 'view_subscriptions'
    },
    { 
      name: 'Payments', 
      icon: CreditCard, 
      path: '/payments',
      permission: 'view_payments'
    },
    { 
      name: 'Chat Support', 
      icon: MessageSquare, 
      path: '/support',
      permission: 'view_support'
    },
    { 
      name: 'Analytics', 
      icon: BarChart, 
      path: '/analytics',
      permission: 'view_analytics'
    },
    { 
      name: 'Advanced Reports', 
      icon: PieChart, 
      path: '/reports',
      permission: 'view_reports'
    },
    { 
      name: 'Notifications', 
      icon: Bell, 
      path: '/notifications',
      permission: 'view_notifications'
    },
    { 
      name: 'Services', 
      icon: Layers, 
      path: '/services',
      permission: 'view_services'
    },
    { 
      name: 'Settings', 
      icon: Settings, 
      path: '/settings',
      permission: 'view_settings'
    },
    { 
      name: 'Help', 
      icon: HelpCircle, 
      path: '/help',
      permission: null // Everyone can access help
    }
  ];

  // Filter navigation items based on user permissions
  const filteredNavigationItems = user?.permissions 
    ? navigationItems.filter(item => !item.permission || user.permissions.includes(item.permission))
    : navigationItems; // Show all items if permissions aren't loaded yet

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0, 
      transition: { 
        delay: i * 0.05,
        duration: 0.3
      } 
    })
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 flex items-center"
        >
          <img src="/logo.svg" alt="QueueMe Logo" className="h-8 mr-2" />
          <span className="font-bold text-lg">QueueMe</span>
        </motion.div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavigationItems.map((item, index) => (
                <SidebarMenuItem key={item.name}>
                  <motion.div
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="w-full"
                  >
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.path}
                        className={({ isActive }) => 
                          `flex items-center gap-3 ${isActive ? 'bg-primary/10 text-primary' : ''}`
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </motion.div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="p-4 text-sm text-muted-foreground"
        >
          QueueMe Admin Panel v1.0
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
