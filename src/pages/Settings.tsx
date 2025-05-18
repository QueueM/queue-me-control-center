
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { 
  User, 
  Lock, 
  BellRing, 
  Globe, 
  CreditCard, 
  Users, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Upload,
  Save,
  LogOut
} from 'lucide-react';

const SettingsPage = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: 'Admin User',
    email: 'admin@queueme.net',
    phone: '+1 (555) 123-4567',
    bio: 'QueueMe system administrator with full access privileges.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    loginAlerts: true,
    weeklyReports: true,
    systemUpdates: true
  });

  const [generalSettings, setGeneralSettings] = useState({
    language: 'en',
    timezone: 'UTC-5',
    darkMode: false,
    autoLogout: 30
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecurityForm({
      ...securityForm,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationToggle = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key]
    });
  };

  const handleGeneralChange = (key: keyof typeof generalSettings, value: any) => {
    setGeneralSettings({
      ...generalSettings,
      [key]: value
    });
  };

  const handleUpdateProfile = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved.",
      });
    }, 1000);
  };

  const handleUpdatePassword = () => {
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Your new password and confirmation don't match.",
        variant: "destructive"
      });
      return;
    }

    if (securityForm.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Your password should be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSecurityForm({
        ...securityForm,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    }, 1000);
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
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
        variants={fadeIn}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>
      </motion.div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:w-[600px] mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex flex-col items-center space-y-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileForm.avatarUrl} alt={profileForm.name} />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Change
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={profileForm.name} 
                          onChange={handleProfileChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          value={profileForm.email} 
                          onChange={handleProfileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          value={profileForm.phone} 
                          onChange={handleProfileChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input 
                          id="role" 
                          value="Administrator" 
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileForm.bio}
                        onChange={handleProfileChange}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleUpdateProfile}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  {saving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="security">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your account password
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    name="currentPassword"
                    type="password" 
                    value={securityForm.currentPassword} 
                    onChange={handleSecurityChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      id="newPassword" 
                      name="newPassword"
                      type="password" 
                      value={securityForm.newPassword} 
                      onChange={handleSecurityChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password" 
                      value={securityForm.confirmPassword} 
                      onChange={handleSecurityChange}
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleUpdatePassword}
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  {saving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Update Password
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">
                      Receive a one-time code via SMS or authentication app
                    </div>
                  </div>
                  <Switch 
                    checked={securityForm.twoFactorEnabled} 
                    onCheckedChange={(checked) => setSecurityForm({...securityForm, twoFactorEnabled: checked})}
                  />
                </div>
                
                {securityForm.twoFactorEnabled && (
                  <div className="pt-2">
                    <Alert>
                      <Shield className="h-4 w-4" />
                      <AlertTitle>Your account is protected</AlertTitle>
                      <AlertDescription>
                        Two-factor authentication is currently enabled for your account.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>
                  Manage your active sessions and devices
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-muted-foreground">Chrome on Windows • IP: 192.168.1.1</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Active Now
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <Globe className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mobile App</p>
                        <p className="text-xs text-muted-foreground">iOS • Last active: 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-destructive">
                      Revoke
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="outline" className="w-full text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out from all devices
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Channels</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive email notifications about account activity
                      </div>
                    </div>
                    <Switch 
                      checked={notificationSettings.email} 
                      onCheckedChange={() => handleNotificationToggle('email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive push notifications in your browser
                      </div>
                    </div>
                    <Switch 
                      checked={notificationSettings.push} 
                      onCheckedChange={() => handleNotificationToggle('push')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">SMS Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive text messages for urgent alerts
                      </div>
                    </div>
                    <Switch 
                      checked={notificationSettings.sms} 
                      onCheckedChange={() => handleNotificationToggle('sms')}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Notification Types</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Login Alerts</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified when someone logs into your account
                      </div>
                    </div>
                    <Switch 
                      checked={notificationSettings.loginAlerts} 
                      onCheckedChange={() => handleNotificationToggle('loginAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Weekly Reports</div>
                      <div className="text-sm text-muted-foreground">
                        Receive a weekly summary of platform activity
                      </div>
                    </div>
                    <Switch 
                      checked={notificationSettings.weeklyReports} 
                      onCheckedChange={() => handleNotificationToggle('weeklyReports')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">System Updates</div>
                      <div className="text-sm text-muted-foreground">
                        Get notified about system updates and maintenance
                      </div>
                    </div>
                    <Switch 
                      checked={notificationSettings.systemUpdates} 
                      onCheckedChange={() => handleNotificationToggle('systemUpdates')}
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="general">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure your application preferences
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={generalSettings.language}
                    onChange={(e) => handleGeneralChange('language', e.target.value)}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={generalSettings.timezone}
                    onChange={(e) => handleGeneralChange('timezone', e.target.value)}
                  >
                    <option value="UTC-12">UTC-12:00</option>
                    <option value="UTC-8">UTC-08:00 (PST)</option>
                    <option value="UTC-5">UTC-05:00 (EST)</option>
                    <option value="UTC">UTC+00:00</option>
                    <option value="UTC+1">UTC+01:00</option>
                    <option value="UTC+2">UTC+02:00</option>
                    <option value="UTC+8">UTC+08:00</option>
                    <option value="UTC+10">UTC+10:00</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Dark Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Use dark mode for the admin interface
                    </div>
                  </div>
                  <Switch 
                    checked={generalSettings.darkMode} 
                    onCheckedChange={(checked) => handleGeneralChange('darkMode', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="autoLogout">Auto Logout (minutes)</Label>
                  <Input 
                    id="autoLogout" 
                    type="number" 
                    value={generalSettings.autoLogout} 
                    onChange={(e) => handleGeneralChange('autoLogout', parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Set to 0 to disable auto logout
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>
                  Manage your API keys and access tokens
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Public API Key</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">
                      pk_live_51LxGHx*****************
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Show
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Secret API Key</div>
                    <div className="font-mono text-xs text-muted-foreground mt-1">
                      sk_live_51LxGHx*****************
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Show
                  </Button>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="outline" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Regenerate API Keys
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible and destructive actions
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Alert className="border-destructive">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <AlertTitle className="text-destructive">Warning</AlertTitle>
                  <AlertDescription>
                    These actions cannot be undone. This will permanently affect your account and data.
                  </AlertDescription>
                </Alert>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2">
                <Button variant="outline" className="w-full border-dashed border-destructive text-destructive hover:bg-destructive/10">
                  Reset Application Settings
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
