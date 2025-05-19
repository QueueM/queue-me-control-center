
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import authService from './authService';
import appConfig from '@/config/appConfig';
import { handleApiError } from './errorService';

// Create axios instance with configuration
const api: AxiosInstance = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: appConfig.apiTimeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config): AxiosRequestConfig => {
    const token = authService.getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for performance monitoring
    config.metadata = { 
      ...config.metadata,
      requestStartTime: Date.now() 
    };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    const config = response.config;
    
    // Calculate request duration for performance monitoring
    if (config.metadata) {
      const requestStartTime = config.metadata.requestStartTime;
      const requestEndTime = Date.now();
      const duration = requestEndTime - requestStartTime;
      
      // Log slow requests (over 1s) in development
      if (appConfig.environment === 'development' && duration > 1000) {
        console.warn(`Slow API request: ${config.method?.toUpperCase()} ${config.url} took ${duration}ms`);
      }
    }
    
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 and we haven't already tried to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token
        await authService.refreshToken();
        
        // Update the Authorization header
        const token = authService.getToken();
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, log out the user
        authService.logout();
        
        // Only redirect if we're in a browser environment
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other API errors
    return Promise.reject(error);
  }
);

// Helper methods for consistent API interaction
const apiService = {
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await api.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  post: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await api.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  put: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await api.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  patch: async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await api.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
      const response = await api.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default apiService;
export { api }; // Export the axios instance for advanced use cases
