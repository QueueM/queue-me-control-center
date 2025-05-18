
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  CreditCard, 
  AlertTriangle, 
  UserPlus, 
  Store, 
  Mail, 
  Calendar, 
  Trash
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'alert' | 'info' | 'success' | 'payment';
  isRead: boolean;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New user registered',
      description: 'John Smith has created a new account. Verify their account details.',
      time: '5 minutes ago',
      type: 'info',
      isRead: false
    },
    {
      id: '2',
      title: 'Payment successful',
      description: 'Payment from Cafe Bistro processed successfully: $129.99',
      time: '2 hours ago',
      type: 'payment',
      isRead: false
    },
    {
      id: '3',
      title: 'Shop verification request',
      description: 'New shop "Garden Eats" requesting verification.',
      time: '3 hours ago',
      type: 'alert',
      isRead: false
    },
    {
      id: '4',
      title: 'System update completed',
      description: 'The platform has been updated to version 2.4.0 successfully.',
      time: '1 day ago',
      type: 'success',
      isRead: true
    },
    {
      id: '5',
      title: 'Failed payment detected',
      description: 'Payment from Urban Boutique failed: Insufficient funds',
      time: '1 day ago',
      type: 'alert',
      isRead: true
    },
    {
      id: '6',
      title: 'Subscription expiring',
      description: '5 shop subscriptions will expire in the next 7 days.',
      time: '2 days ago',
      type: 'info',
      isRead: true
    }
  ]);
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    payments: true,
    users: true,
    shops: true,
    system: true
  });

  // Filter notifications based on the read status
  const unreadNotifications = notifications.filter(n => !n.isRead);
  const allNotifications = notifications;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };
  
  const updateSetting = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };
  
  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'alert':
        return <AlertTriangle className="text-amber-500" />;
      case 'info':
        return <Bell className="text-blue-500" />;
      case 'success':
        return <CheckCircle className="text-green-500" />;
      case 'payment':
        return <CreditCard className="text-purple-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Manage notifications and preferences
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={!unreadNotifications.length}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
          
          <Button>
            <Bell className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="unread">
            <TabsList>
              <TabsTrigger value="unread">
                Unread
                {unreadNotifications.length > 0 && (
                  <Badge className="ml-2 bg-primary">
                    {unreadNotifications.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            
            <TabsContent value="unread" className="mt-4">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {unreadNotifications.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 flex flex-col items-center justify-center text-center">
                      <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">All caught up! No unread notifications.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {unreadNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        variants={fadeInUp}
                      >
                        <Card className="overflow-hidden border-l-4 border-l-primary">
                          <CardContent className="p-0">
                            <div className="p-4 flex gap-4">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                {getNotificationIcon(notification.type)}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold">{notification.title}</h3>
                                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <Clock className="h-3 w-3" />
                                    {notification.time}
                                  </div>
                                </div>
                                <p className="text-muted-foreground text-sm mt-1">
                                  {notification.description}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex border-t">
                              <button 
                                onClick={() => markAsRead(notification.id)}
                                className="px-4 py-2 text-xs text-primary flex items-center justify-center flex-1 hover:bg-primary/5 transition-colors"
                              >
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Mark as read
                              </button>
                              <div className="border-l" />
                              <button 
                                onClick={() => deleteNotification(notification.id)}
                                className="px-4 py-2 text-xs text-muted-foreground flex items-center justify-center flex-1 hover:bg-muted/10 transition-colors"
                              >
                                <Trash className="h-3 w-3 mr-1" />
                                Delete
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>
            
            <TabsContent value="all" className="mt-4">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {allNotifications.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 flex flex-col items-center justify-center text-center">
                      <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No notifications yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {allNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        variants={fadeInUp}
                      >
                        <Card className={notification.isRead ? "opacity-80" : "border-l-4 border-l-primary"}>
                          <CardContent className="p-0">
                            <div className="p-4 flex gap-4">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                {getNotificationIcon(notification.type)}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <h3 className={`font-semibold ${notification.isRead ? 'text-muted-foreground' : ''}`}>
                                    {notification.title}
                                  </h3>
                                  <div className="flex items-center text-xs text-muted-foreground gap-1">
                                    <Clock className="h-3 w-3" />
                                    {notification.time}
                                  </div>
                                </div>
                                <p className="text-muted-foreground text-sm mt-1">
                                  {notification.description}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex border-t">
                              <button 
                                onClick={() => notification.isRead 
                                  ? setNotifications(notifications.map(n => 
                                      n.id === notification.id ? { ...n, isRead: false } : n
                                    ))
                                  : markAsRead(notification.id)
                                }
                                className="px-4 py-2 text-xs text-primary flex items-center justify-center flex-1 hover:bg-primary/5 transition-colors"
                              >
                                {notification.isRead ? (
                                  <>
                                    <Bell className="h-3 w-3 mr-1" />
                                    Mark as unread
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Mark as read
                                  </>
                                )}
                              </button>
                              <div className="border-l" />
                              <button 
                                onClick={() => deleteNotification(notification.id)}
                                className="px-4 py-2 text-xs text-muted-foreground flex items-center justify-center flex-1 hover:bg-muted/10 transition-colors"
                              >
                                <Trash className="h-3 w-3 mr-1" />
                                Delete
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Channels</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">Email Notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.email} 
                    onCheckedChange={() => updateSetting('email')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">Push Notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.push} 
                    onCheckedChange={() => updateSetting('push')}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Categories</h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">Payments</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.payments} 
                    onCheckedChange={() => updateSetting('payments')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserPlus className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">User Activities</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.users} 
                    onCheckedChange={() => updateSetting('users')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Store className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">Shop Updates</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.shops} 
                    onCheckedChange={() => updateSetting('shops')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm">System Notifications</p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationSettings.system} 
                    onCheckedChange={() => updateSetting('system')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
