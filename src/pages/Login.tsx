
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneLoginForm from '@/components/auth/PhoneLoginForm';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const navigate = useNavigate();

  // Check if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <PhoneLoginForm />
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary/80 via-primary to-secondary flex flex-col items-center justify-center p-8 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-lg text-center space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">QueueMe Admin</h1>
          <p className="text-xl opacity-90">
            Manage your business operations, analyze performance, and drive growth from a single dashboard.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-1">Real-time Analytics</h3>
              <p className="text-sm opacity-80">Monitor business metrics and performance in real-time</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-1">User Management</h3>
              <p className="text-sm opacity-80">Manage users, roles, and permissions efficiently</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-1">Shop Controls</h3>
              <p className="text-sm opacity-80">Configure and monitor all your business locations</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-left">
              <h3 className="font-semibold mb-1">Payment Processing</h3>
              <p className="text-sm opacity-80">Track transactions and manage payment methods</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
