
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import authService from '@/services/authService';

const PhoneLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await authService.requestOtp(phoneNumber);
      
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your phone",
      });
      
      setStep('otp');
    } catch (error) {
      toast({
        title: "Failed to send OTP",
        description: "There was an error sending the verification code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otpCode || otpCode.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid verification code",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await authService.loginWithOtp({
        phone_number: phoneNumber,
        otp_code: otpCode
      });
      
      toast({
        title: "Login Successful",
        description: "Welcome to QueueMe Admin Dashboard",
      });
      
      // Use navigate instead of window.location for React Router navigation
      navigate('/');
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Invalid or expired verification code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePhone = () => {
    setStep('phone');
    setOtpCode('');
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      {step === 'phone' ? (
        <motion.form
          key="phone-form"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onSubmit={handleRequestOtp}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Sending Code...' : 'Get Verification Code'}
          </Button>
        </motion.form>
      ) : (
        <motion.form
          key="otp-form"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onSubmit={handleVerifyOtp}
          className="space-y-4"
        >
          <div className="text-center mb-4 space-y-2">
            <p className="text-sm">Enter verification code sent to</p>
            <p className="font-medium">{phoneNumber}</p>
          </div>
          <div className="flex justify-center mb-4">
            <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
            <Button type="button" variant="ghost" onClick={handleChangePhone}>
              Change Phone Number
            </Button>
          </div>
        </motion.form>
      )}
    </>
  );
};

export default PhoneLoginForm;
