
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Phone, ArrowRight, Shield, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/services/api";

const PhoneLoginForm = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formattedPhone, setFormattedPhone] = useState('');
  
  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    
    if (input.length <= 10) {
      // Format as (XXX) XXX-XXXX
      let formatted = input;
      if (input.length > 3 && input.length <= 6) {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3)}`;
      } else if (input.length > 6) {
        formatted = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6, 10)}`;
      }
      setFormattedPhone(formatted);
      setPhoneNumber(input);
    }
  };
  
  const handleSendOTP = async () => {
    if (phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you'd call your API to send an OTP
      // const response = await api.post('/auth/send-otp', { phoneNumber });
      
      // Simulating API call for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsVerifying(true);
      toast({
        title: "OTP Sent",
        description: `A verification code has been sent to ${formattedPhone}`,
      });
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleVerifyOTP = async () => {
    if (otpCode.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit code",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, you'd call your API to verify the OTP
      // const response = await api.post('/auth/verify-otp', { 
      //   phoneNumber, 
      //   otpCode 
      // });
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store auth token
      localStorage.setItem('token', 'demo-token-12345');
      
      toast({
        title: "Login Successful",
        description: "Welcome to QueueMe Admin Dashboard",
      });
      
      // Redirect to dashboard
      window.location.href = '/';
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "The code entered is invalid or expired",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResetOTP = () => {
    setIsVerifying(false);
    setOtpCode('');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="border-0 shadow-xl bg-gradient-to-br from-background via-background to-accent/20">
        <CardHeader className="space-y-1 text-center">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto bg-primary/10 p-4 rounded-full"
          >
            {isVerifying ? 
              <Shield className="h-8 w-8 text-primary" /> : 
              <Phone className="h-8 w-8 text-primary" />
            }
          </motion.div>
          <CardTitle className="text-2xl font-bold">
            {isVerifying ? "Verify Your Phone" : "Admin Login"}
          </CardTitle>
          <CardDescription>
            {isVerifying 
              ? `Enter the 6-digit code sent to ${formattedPhone}` 
              : "Log in with your phone number to access the admin panel"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {!isVerifying ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                    +1
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="pl-8"
                    value={formattedPhone}
                    onChange={handlePhoneChange}
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  We'll send a one-time password to verify your phone
                </p>
              </div>
              
              <Button 
                className="w-full group"
                onClick={handleSendOTP}
                disabled={isLoading || phoneNumber.length < 10}
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Verification Code
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otpCode}
                    onChange={setOtpCode}
                    disabled={isLoading}
                    render={({ slots }) => (
                      <InputOTPGroup className="gap-2">
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} index={index} />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <button 
                    type="button"
                    className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                    onClick={handleResetOTP}
                    disabled={isLoading}
                  >
                    Change Number
                  </button>
                  <button 
                    type="button"
                    className="text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                    onClick={handleSendOTP}
                    disabled={isLoading}
                  >
                    Resend Code
                  </button>
                </div>
              </div>
              
              <Button 
                className="w-full"
                onClick={handleVerifyOTP}
                disabled={isLoading || otpCode.length < 6}
              >
                {isLoading ? "Verifying..." : "Verify & Login"}
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t pt-4">
          <p className="text-xs text-center w-full text-muted-foreground">
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PhoneLoginForm;
