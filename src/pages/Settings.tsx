
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Lock, 
  Shield, 
  CreditCard, 
  Globe, 
  Paintbrush, 
  MailCheck,
  Save,
  Plus,
  MessageSquare,
  Mail
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  
  // General settings
  const [companyName, setCompanyName] = useState('QueueMe Inc.');
  const [supportEmail, setSupportEmail] = useState('support@queueme.com');
  const [primaryColor, setPrimaryColor] = useState('#8b5cf6');
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');
  
  // Email settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [systemAlerts, setSystemAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Security settings
  const [requireMFA, setRequireMFA] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('60');
  const [passwordRotation, setPasswordRotation] = useState('90');
  const [minPasswordLength, setMinPasswordLength] = useState('8');
  
  // API & Integrations
  const [apiKey] = useState('sk_live_XXXXXXXXXXXXXXXXXXXX');
  const [webhookUrl, setWebhookUrl] = useState('https://yourdomain.com/webhook');
  
  const resetSettings = () => {
    toast({
      title: "Settings reset",
      description: "All settings have been reset to default values."
    });
  };
  
  const saveSettings = () => {
    setIsFormSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsFormSubmitting(false);
      toast({
        title: "Settings saved",
        description: "Your changes have been saved successfully."
      });
    }, 1000);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard."
    });
  };
  
  const regenerateApiKey = () => {
    toast({
      title: "API key regenerated",
      description: "A new API key has been generated. Make sure to update your integrations."
    });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
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
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage application settings and preferences</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetSettings}>Reset</Button>
          <Button 
            className="flex items-center gap-2" 
            onClick={saveSettings} 
            disabled={isFormSubmitting}
          >
            {isFormSubmitting ? (
              <>
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save Changes</span>
              </>
            )}
          </Button>
        </div>
      </motion.div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="general">
            <SettingsIcon className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="email">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="api">
            <Globe className="h-4 w-4 mr-2" />
            API & Integrations
          </TabsTrigger>
        </TabsList>
        
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your application's general settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input 
                      id="supportEmail" 
                      type="email" 
                      value={supportEmail} 
                      onChange={(e) => setSupportEmail(e.target.value)} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={timezone} onValueChange={setTimezone}>
                        <SelectTrigger id="timezone">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                          <SelectItem value="CST">Central Time (CST)</SelectItem>
                          <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                          <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Appearance</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <Input 
                        id="primaryColor" 
                        type="color" 
                        className="w-12 h-10" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                      />
                      <Input 
                        type="text" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)} 
                        className="flex-1" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark mode
                      </p>
                    </div>
                    <div>
                      <Button variant="outline">
                        <Paintbrush className="h-4 w-4 mr-2" />
                        Toggle Theme
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important events
                      </p>
                    </div>
                    <Switch 
                      id="emailNotifications" 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of platform activity
                      </p>
                    </div>
                    <Switch 
                      id="weeklyDigest" 
                      checked={weeklyDigest} 
                      onCheckedChange={setWeeklyDigest} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="systemAlerts">System Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about system updates and maintenance
                      </p>
                    </div>
                    <Switch 
                      id="systemAlerts" 
                      checked={systemAlerts} 
                      onCheckedChange={setSystemAlerts} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive promotional emails and newsletters
                      </p>
                    </div>
                    <Switch 
                      id="marketingEmails" 
                      checked={marketingEmails} 
                      onCheckedChange={setMarketingEmails} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Email Templates</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">Welcome Email</span>
                        <p className="text-sm text-muted-foreground">Sent when a new user registers</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">Payment Confirmation</span>
                        <p className="text-sm text-muted-foreground">Sent after successful payment</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">Password Reset</span>
                        <p className="text-sm text-muted-foreground">Sent when a user requests password reset</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage security settings and policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="requireMFA">Require Multi-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Require all users to set up MFA for enhanced security
                      </p>
                    </div>
                    <Switch 
                      id="requireMFA" 
                      checked={requireMFA} 
                      onCheckedChange={setRequireMFA} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="sessionTimeout" 
                      type="number" 
                      min="5" 
                      max="480" 
                      value={sessionTimeout} 
                      onChange={(e) => setSessionTimeout(e.target.value)} 
                    />
                    <p className="text-xs text-muted-foreground">
                      Automatically log users out after the specified period of inactivity
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Password Policy</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="passwordRotation">Password Rotation (days)</Label>
                      <Input 
                        id="passwordRotation" 
                        type="number" 
                        min="0" 
                        max="365" 
                        value={passwordRotation} 
                        onChange={(e) => setPasswordRotation(e.target.value)} 
                      />
                      <p className="text-xs text-muted-foreground">
                        Require password change every X days (0 to disable)
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="minPasswordLength">Minimum Password Length</Label>
                      <Input 
                        id="minPasswordLength" 
                        type="number" 
                        min="6" 
                        max="32" 
                        value={minPasswordLength} 
                        onChange={(e) => setMinPasswordLength(e.target.value)} 
                      />
                      <p className="text-xs text-muted-foreground">
                        Minimum number of characters required
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Complex Passwords</Label>
                      <p className="text-sm text-muted-foreground">
                        Require uppercase, lowercase, numbers and symbols
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Admin Actions</h3>
                  
                  <div className="flex flex-col gap-3">
                    <Button variant="outline" className="justify-start">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Admin Password
                    </Button>
                    
                    <Button variant="outline" className="justify-start">
                      <MailCheck className="h-4 w-4 mr-2" />
                      Verify Admin Email
                    </Button>
                    
                    <Button variant="outline" className="justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Manage Admin Accounts
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>
                  Manage API keys and webhook settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="apiKey" 
                        value={apiKey} 
                        readOnly 
                        type="password"
                        className="flex-1" 
                      />
                      <Button variant="outline" onClick={copyApiKey}>Copy</Button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-muted-foreground">
                        <strong>Warning:</strong> Keep this key secret. Anyone with this key can access your API.
                      </p>
                      <Button variant="outline" size="sm" onClick={regenerateApiKey}>
                        Regenerate
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input 
                      id="webhookUrl" 
                      value={webhookUrl} 
                      onChange={(e) => setWebhookUrl(e.target.value)} 
                    />
                    <p className="text-xs text-muted-foreground">
                      URL to receive webhook notifications
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Connected Integrations</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Stripe</h4>
                          <p className="text-xs text-muted-foreground">Payment processing</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Connected
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Mailchimp</h4>
                          <p className="text-xs text-muted-foreground">Email marketing</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                        Not connected
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <MessageSquare className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Slack</h4>
                          <p className="text-xs text-muted-foreground">Notifications</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                        Not connected
                      </Badge>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Integration
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
