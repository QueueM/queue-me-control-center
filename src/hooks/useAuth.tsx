
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAppContext } from '@/contexts/AppContext';
import authService from '@/services/authService';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login({ username, password });
      dispatch({ type: 'SET_USER', payload: response.user });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${response.user.first_name || response.user.username}!`,
      });
      
      navigate('/');
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid username or password');
      toast({
        title: 'Authentication Failed',
        description: err.response?.data?.message || 'Invalid username or password',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, dispatch, toast]);

  const loginWithOtp = useCallback(async (phoneNumber: string, otpCode: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.loginWithOtp({ 
        phone_number: phoneNumber,
        otp_code: otpCode
      });
      
      dispatch({ type: 'SET_USER', payload: response.user });
      dispatch({ type: 'SET_AUTHENTICATED', payload: true });
      
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${response.user.first_name || response.user.username}!`,
      });
      
      navigate('/');
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP code');
      toast({
        title: 'Authentication Failed',
        description: err.response?.data?.message || 'Invalid OTP code',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, dispatch, toast]);

  const logout = useCallback(() => {
    authService.logout();
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_AUTHENTICATED', payload: false });
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    });
    navigate('/login');
  }, [navigate, dispatch, toast]);

  const checkAuth = useCallback(async () => {
    if (!authService.isAuthenticated()) {
      return false;
    }
    
    // Verify token validity with backend
    try {
      const user = authService.getCurrentUser();
      if (user) {
        dispatch({ type: 'SET_USER', payload: user });
        dispatch({ type: 'SET_AUTHENTICATED', payload: true });
        return true;
      }
      return false;
    } catch (err) {
      logout();
      return false;
    }
  }, [dispatch, logout]);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    isLoading,
    error,
    login,
    loginWithOtp,
    logout,
    checkAuth,
    isAuthenticated: state.isAuthenticated,
    user: state.user
  };
};
