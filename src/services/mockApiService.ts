import { shopsMockApi } from './mockApiService/shopsMock';

// Enable/disable mock API globally
export const useMockApi = true;

// Collection of mock API implementations
export const mockApi = {
  dashboard: {
    // Dashboard mock service functions here
  },
  shops: shopsMockApi
};
