
// Application-wide configuration settings

type Environment = 'development' | 'staging' | 'production';

interface AppConfig {
  environment: Environment;
  apiBaseUrl: string;
  apiTimeout: number;
  dateFormat: string;
  timeFormat: string;
  defaultPageSize: number;
  maxUploadFileSizeMB: number;
  supportEmail: string;
  version: string;
  features: {
    enableAnalytics: boolean;
    enableNotifications: boolean;
    enableSubscriptions: boolean;
  };
  theme: {
    colorScheme: 'light' | 'dark' | 'system';
    primaryColor: string;
    accentColor: string;
  };
  security: {
    sessionTimeout: number; // in minutes
    passwordRequirements: {
      minLength: number;
      requireNumbers: boolean;
      requireSymbols: boolean;
      requireUppercase: boolean;
      requireLowercase: boolean;
    }
  }
}

// Default configuration
const defaultConfig: AppConfig = {
  environment: import.meta.env.MODE as Environment || 'development',
  apiBaseUrl: import.meta.env.VITE_API_URL || 'https://api.queueme.net',
  apiTimeout: 30000, // 30 seconds
  dateFormat: 'MMM dd, yyyy',
  timeFormat: 'HH:mm',
  defaultPageSize: 10,
  maxUploadFileSizeMB: 5,
  supportEmail: 'support@queueme.net',
  version: '1.0.0',
  features: {
    enableAnalytics: true,
    enableNotifications: true,
    enableSubscriptions: true,
  },
  theme: {
    colorScheme: 'system',
    primaryColor: '#8B5CF6', // Vivid Purple
    accentColor: '#F97316', // Bright Orange
  },
  security: {
    sessionTimeout: 30, // 30 minutes
    passwordRequirements: {
      minLength: 8,
      requireNumbers: true,
      requireSymbols: true,
      requireUppercase: true,
      requireLowercase: true
    }
  }
};

// Environment-specific overrides
const environmentConfig: Record<Environment, Partial<AppConfig>> = {
  development: {
    apiBaseUrl: 'http://localhost:8000',
  },
  staging: {
    apiBaseUrl: 'https://api-staging.queueme.net',
  },
  production: {
    // Production uses the defaults
  }
};

// Merge default config with environment-specific config
const currentConfig = {
  ...defaultConfig,
  ...environmentConfig[defaultConfig.environment],
};

export default currentConfig;
