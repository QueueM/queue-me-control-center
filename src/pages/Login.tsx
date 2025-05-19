
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { motion } from 'framer-motion';
import authService from '@/services/authService';
import PhoneLoginForm from '@/components/auth/PhoneLoginForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      await authService.login({ username, password });
      toast({
        title: 'Login Successful',
        description: 'Welcome to the QueueMe Admin Panel',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid username or password',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent/10 p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        <Card className="border-accent/20 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <motion.div variants={itemVariants}>
              <img src="/logo.svg" alt="QueueMe Logo" className="h-12 mx-auto mb-4" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-semibold">Admin Login</CardTitle>
            </motion.div>
            <motion.div variants={itemVariants}>
              <CardDescription>Enter your credentials to access the admin panel</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="credentials">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="credentials">Credentials</TabsTrigger>
                <TabsTrigger value="phone">Phone</TabsTrigger>
              </TabsList>
              <TabsContent value="credentials">
                <motion.form 
                  variants={itemVariants} 
                  onSubmit={handleLogin} 
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Input
                      id="username"
                      placeholder="Username or Email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </motion.form>
              </TabsContent>
              <TabsContent value="phone">
                <PhoneLoginForm />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-center text-sm text-muted-foreground">
            <motion.div variants={itemVariants}>
              <p>Protected access for QueueMe administrators.</p>
              <p>© 2025 QueueMe. All rights reserved.</p>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoginPage;
