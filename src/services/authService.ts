
import api from './api';

interface LoginCredentials {
  username: string;
  password: string;
}

interface OtpVerification {
  phone_number: string;
  otp_code: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    roles: string[];
    permissions: string[];
  };
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login/', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  loginWithOtp: async (data: OtpVerification): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/verify-otp/', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  requestOtp: async (phoneNumber: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post('/api/auth/request-otp/', { phone_number: phoneNumber });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Additional cleanup as needed
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  hasPermission: (permission: string): boolean => {
    const user = authService.getCurrentUser();
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  },

  hasRole: (role: string): boolean => {
    const user = authService.getCurrentUser();
    if (!user || !user.roles) return false;
    return user.roles.includes(role);
  },

  refreshToken: async (): Promise<any> => {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject('No token found');
    
    try {
      const response = await api.post('/api/auth/token/refresh/', { token });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      // If refresh fails, logout the user
      authService.logout();
      return Promise.reject(error);
    }
  }
};

export default authService;
