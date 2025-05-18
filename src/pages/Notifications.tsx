
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { Bell, Search, CheckCircle2, AlertCircle, InfoIcon, PlusCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock notification data
const notifications = [
  {
    id: '1',
    title: 'New shop registered',
    message: 'A new shop "Fashion Store" has registered and is awaiting verification.',
    type: 'info',
    read: false,
    timestamp: '2023-05-18T09:30:00',
    link: '/shops'
  },
  {
    id: '2',
    title: 'Payment failed',
    message: 'Payment for "Tech Gadgets" subscription has failed. Action required.',
    type: 'error',
    read: false,
    timestamp: '2023-05-18T08:45:00',
    link: '/payments'
  },
  {
    id: '3',
    title: 'System update completed',
    message: 'The scheduled system maintenance has been completed successfully.',
    type: 'success',
    read: true,
    timestamp: '2023-05-17T23:15:00'
  },
  {
    id: '4',
    title: 'New support ticket',
    message: 'A high priority support ticket has been created and needs attention.',
    type: 'warning',
    read: false,
    timestamp: '2023-05-17T16:20:00',
    link: '/support'
  },
  {
    id: '5',
    title: 'Subscription upgraded',
    message: '"Cafe Delight" has upgraded their subscription to the Premium plan.',
    type: 'success',
    read: true,
    timestamp: '2023-05-17T14:10:00',
    link: '/subscriptions'
  },
  {
    id: '6',
    title: 'Low storage warning',
    message: 'The system is approaching storage capacity limits. Consider cleanup or expansion.',
    type: 'warning',
    read: true,
    timestamp: '2023-05-17T11:05:00'
  },
  {
    id: '7',
    title: 'New admin user added',
    message: 'A new administrator "Jane Smith" has been added to the platform.',
    type: 'info',
    read: true,
    timestamp: '2023-05-16T16:45:00',
    link: '/users'
  },
  {
    id: '8',
    title: 'API rate limit reached',
    message: 'API rate limit reached for "Booking API". Some requests may be throttled.',
    type: 'error',
    read: true,
    timestamp: '2023-05-16T10:30:00',
    link: '/settings/api'
  }
];

// Mock notification templates
const notificationTemplates = [
  {
    id: '1',
    name: 'New User Registration',
    channels: ['Email', 'In-app'],
    lastUpdated: '2023-05-10'
  },
  {
    id: '2',
    name: 'Payment Confirmation',
    channels: ['Email', 'SMS', 'In-app'],
    lastUpdated: '2023-05-12'
  },
  {
    id: '3',
    name: 'Subscription Renewal',
    channels: ['Email', 'In-app'],
    lastUpdated: '2023-05-14'
  },
  {
    id: '4',
    name: 'Password Reset',
    channels: ['Email'],
    lastUpdated: '2023-05-08'
  },
  {
    id: '5',
    name: 'Support Ticket Update',
    channels: ['Email', 'In-app'],
    lastUpdated: '2023-05-15'
  }
];

const NotificationsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsList, setNotificationsList] = useState(notifications);

  const markAsRead = (id: string) => {
    setNotificationsList(
      notificationsList.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
    
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read."
    });
  };

  const deleteNotification = (id: string) => {
    setNotificationsList(
      notificationsList.filter(notification => notification.id !== id)
    );
    
    toast({
      title: "Notification deleted",
      description: "The notification has been deleted."
    });
  };

  const markAllAsRead = () => {
    setNotificationsList(
      notificationsList.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read."
    });
  };

  const filteredNotifications = notificationsList.filter(notification => {
    // Filter by search query
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by tab
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'unread') return matchesSearch && !notification.read;
    if (activeTab === 'info') return matchesSearch && notification.type === 'info';
    if (activeTab === 'success') return matchesSearch && notification.type === 'success';
    if (activeTab === 'warning') return matchesSearch && notification.type === 'warning';
    if (activeTab === 'error') return matchesSearch && notification.type === 'error';
    
    return matchesSearch;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'success': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'info': default: return <InfoIcon className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return diffInHours === 0 
        ? 'Just now' 
        : `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">View and manage platform notifications.</p>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex gap-2"
        >
          <Button variant="outline" onClick={markAllAsRead}>Mark All Read</Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Notification Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="font-bold text-2xl">{notificationsList.length}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Unread</div>
                  <div className="font-bold text-2xl">
                    {notificationsList.filter(n => !n.read).length}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <div>Info</div>
                  </div>
                  <div className="font-medium">
                    {notificationsList.filter(n => n.type === 'info').length}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <div>Success</div>
                  </div>
                  <div className="font-medium">
                    {notificationsList.filter(n => n.type === 'success').length}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                    <div>Warning</div>
                  </div>
                  <div className="font-medium">
                    {notificationsList.filter(n => n.type === 'warning').length}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                    <div>Error</div>
                  </div>
                  <div className="font-medium">
                    {notificationsList.filter(n => n.type === 'error').length}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[150px] flex items-center justify-center text-muted-foreground">
            <p>Activity chart will appear here</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
            <TabsTrigger value="success">Success</TabsTrigger>
            <TabsTrigger value="warning">Warning</TabsTrigger>
            <TabsTrigger value="error">Error</TabsTrigger>
          </TabsList>
          
          <div className="rounded-md border">
            <div className="p-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            
            <TabsContent value={activeTab} className="m-0 p-0">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-h-[500px] overflow-y-auto"
              >
                {filteredNotifications.length === 0 ? (
                  <div className="py-10 text-center text-muted-foreground">
                    No notifications found
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      variants={item}
                      className={`border-b last:border-0 p-4 hover:bg-muted/50 ${!notification.read ? 'bg-muted/30' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-start justify-between">
                            <h3 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(notification.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between pt-1">
                            {notification.link ? (
                              <Button variant="link" size="sm" className="p-0 h-auto text-primary">
                                View Details
                              </Button>
                            ) : (
                              <div />
                            )}
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  Mark as read
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>
                Manage notification templates for different events.
              </CardDescription>
            </div>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Template
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Template Name</TableHead>
                  <TableHead>Channels</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notificationTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {template.channels.map((channel) => (
                          <span 
                            key={channel} 
                            className="px-2 py-0.5 bg-secondary text-xs rounded-full"
                          >
                            {channel}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{template.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotificationsPage;
