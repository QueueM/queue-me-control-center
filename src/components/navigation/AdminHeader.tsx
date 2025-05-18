
import React, { useState } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Mail, LogOut, Settings, User, HelpCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AdminHeaderProps {
  children?: React.ReactNode;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSearch, setShowSearch] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate('/login');
  };
  
  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-30 flex items-center px-4 md:px-6">
      <SidebarTrigger />
      
      <h1 className="text-xl font-semibold ml-4 hidden md:block">QueueMe Admin</h1>
      
      {showSearch ? (
        <div className="flex-1 px-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search across dashboard..." 
              className="w-full pl-8"
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 ml-4">
          <Button variant="outline" size="sm" className="text-sm" onClick={() => setShowSearch(true)}>
            <Search className="h-4 w-4 mr-2" />
            <span>Search...</span>
          </Button>
        </div>
      )}
      
      <div className="ml-auto flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative md:hidden" onClick={() => setShowSearch(true)}>
              <Search className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader className="mb-4">
              <SheetTitle>Search</SheetTitle>
              <SheetDescription>
                Search across the entire admin panel
              </SheetDescription>
            </SheetHeader>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Type to search..." 
                className="w-full pl-8" 
                autoFocus 
              />
            </div>
          </SheetContent>
        </Sheet>
      
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Mail className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Messages</SheetTitle>
              <SheetDescription>
                You have 3 unread messages
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user-${i}`} alt="User" />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">User {i}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      New message regarding the recent update...
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {i} hour{i > 1 ? 's' : ''} ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">5</Badge>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Notifications</SheetTitle>
              <SheetDescription>
                You have 5 unread notifications
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="p-3 hover:bg-accent rounded-lg cursor-pointer">
                  <div className="font-medium">System Alert</div>
                  <div className="text-sm text-muted-foreground">
                    New user registered on the platform
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {i * 10} minutes ago
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        {children}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-sm font-medium hidden md:inline">Admin User</span>
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/support')}>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
