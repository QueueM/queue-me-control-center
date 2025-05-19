import { toast } from '@/hooks/use-toast';

export type ApiError = {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, any>;
};

export const handleApiError = (error: any, defaultMessage: string = "An unexpected error occurred"): ApiError => {
  // Check if it's an axios error with response
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.message || defaultMessage;
    const code = error.response.data?.code;
    const details = error.response.data?.details;
    
    // Handle specific status codes
    switch (status) {
      case 401:
        // Unauthorized - handled by axios interceptor in api.ts
        return { status, message: "Authentication required", code: "UNAUTHORIZED" };
      case 403:
        return { status, message: "You don't have permission to perform this action", code: "FORBIDDEN" };
      case 404:
        return { status, message: "The requested resource was not found", code: "NOT_FOUND" };
      case 422:
        return { status, message: "Validation failed", code: "VALIDATION_ERROR", details };
      case 429:
        return { status, message: "Too many requests, please try again later", code: "RATE_LIMITED" };
      case 500:
        return { status, message: "Server error, please try again later", code: "SERVER_ERROR" };
      default:
        return { status, message, code, details };
    }
  }
  
  // Network errors
  if (error.request) {
    return { 
      status: 0, 
      message: "Network error. Please check your connection and try again",
      code: "NETWORK_ERROR"
    };
  }
  
  // Other errors
  return {
    status: 0,
    message: error.message || defaultMessage,
    code: "UNKNOWN_ERROR"
  };
};

export const showApiError = (error: any, defaultMessage: string = "An unexpected error occurred"): ApiError => {
  const apiError = handleApiError(error, defaultMessage);
  
  toast({
    title: `Error ${apiError.status ? `(${apiError.status})` : ''}`,
    description: apiError.message,
    variant: "destructive"
  });
  
  return apiError;
};
