import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { motion } from 'framer-motion';
import { 
  Save, 
  Mail, 
  MessageSquare, 
  Bell, 
  Shield, 
  Users, 
  Globe, 
  CreditCard, 
  Settings as SettingsIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  const saveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your changes have been successfully saved.",
    });
  };
  
  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Keys', icon: Globe },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'team', label: 'Team', icon: Users },
  ];

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

  return (
    <div className="p-6 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings for Queue Me platform.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex flex-wrap">
            {tabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="general" className="m-0">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Platform Information</CardTitle>
                    <CardDescription>
                      Update basic information about the platform.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="platform-name">Platform Name</Label>
                        <Input id="platform-name" defaultValue="Queue Me" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="domain">Primary Domain</Label>
                        <Input id="domain" defaultValue="queueme.net" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Platform Description</Label>
                        <Textarea 
                          id="description" 
                          defaultValue="Queue Me is a virtual queue and appointment management platform for businesses." 
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>
                      Configure platform-wide contact details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="support-email">Support Email</Label>
                        <Input 
                          id="support-email" 
                          type="email" 
                          defaultValue="support@queueme.net" 
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">Contact Phone</Label>
                        <Input id="contact-phone" defaultValue="+1 (555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sales-email">Sales Email</Label>
                        <Input 
                          id="sales-email" 
                          type="email" 
                          defaultValue="sales@queueme.net" 
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-email">Billing Email</Label>
                        <Input 
                          id="billing-email" 
                          type="email" 
                          defaultValue="billing@queueme.net" 
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>
                      Configure system-wide behavior and preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Default Timezone</Label>
                        <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date-format">Default Date Format</Label>
                        <Input id="date-format" defaultValue="MM/DD/YYYY" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={saveSettings} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="notifications" className="m-0">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                    <CardDescription>
                      Configure system-wide email notification settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-sender">Default Sender</Label>
                        <Input id="email-sender" defaultValue="noreply@queueme.net" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-template">Email Template Theme</Label>
                        <Input id="email-template" defaultValue="Queue Me Default" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email-footer">Default Email Footer</Label>
                        <Textarea 
                          id="email-footer" 
                          defaultValue="Queue Me Inc. | 123 Main St, City, State | Privacy Policy: https://queueme.net/privacy" 
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Email Templates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start">
                          <Mail className="mr-2 h-4 w-4" />
                          User Welcome Email
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Mail className="mr-2 h-4 w-4" />
                          Password Reset
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Mail className="mr-2 h-4 w-4" />
                          Payment Receipt
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Mail className="mr-2 h-4 w-4" />
                          Subscription Renewal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={saveSettings} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
              
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>SMS Notifications</CardTitle>
                    <CardDescription>
                      Configure SMS and text message settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sms-provider">SMS Provider</Label>
                        <Input id="sms-provider" defaultValue="Twilio" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sender-number">Default Sender Number</Label>
                        <Input id="sender-number" defaultValue="+1 (555) 987-6543" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={saveSettings} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
              
              <motion.div variants={item}>
                <Card>
                  <CardHeader>
                    <CardTitle>In-App Notifications</CardTitle>
                    <CardDescription>
                      Configure system-wide in-app notification settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Default Notification Types</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start">
                          <Bell className="mr-2 h-4 w-4" />
                          New Registration Alerts
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Bell className="mr-2 h-4 w-4" />
                          Payment Alerts
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Bell className="mr-2 h-4 w-4" />
                          Support Tickets
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Bell className="mr-2 h-4 w-4" />
                          System Updates
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={saveSettings} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="security" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and access controls.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                <p>Security settings content will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Manage API keys and access.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                <p>API settings content will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment providers and options.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                <p>Payment settings content will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="team" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
                <CardDescription>Manage administrators and staff members.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center text-muted-foreground">
                <p>Team management content will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
