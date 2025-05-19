
import { shopsMockApi } from './mockApiService/shopsMock';

// Enable/disable mock API globally
export const useMockApi = true;

// Collection of mock API implementations
export const mockApi = {
  dashboard: {
    // Dashboard mock service functions here
    getStats: () => ({
      data: {
        shops: {
          total: 248,
          active: 198,
          pending: 32,
          suspended: 18,
          growth: 12.5
        },
        revenue: {
          total: 456789.45,
          monthly: 42567.89,
          growth: 8.2
        },
        users: {
          total: 1245,
          active: 987,
          new: 42,
          growth: 15.3
        },
        orders: {
          total: 5678,
          completed: 4890,
          pending: 567,
          cancelled: 221,
          growth: 5.7
        }
      },
      success: true
    }),
    
    getRecentActivity: () => ({
      data: [
        {
          id: 1,
          type: 'new_shop',
          user: 'John Doe',
          entity: 'Acme Co.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        },
        {
          id: 2,
          type: 'new_order',
          user: 'Jane Smith',
          entity: 'Order #12345',
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        },
        {
          id: 3,
          type: 'payment',
          user: 'Robert Johnson',
          entity: '$156.78',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
      ],
      success: true
    }),
    
    getRevenueData: () => ({
      data: [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 5000 },
        { name: 'Apr', revenue: 4500 },
        { name: 'May', revenue: 6000 },
        { name: 'Jun', revenue: 5500 },
      ],
      success: true
    }),
  },
  users: {
    // Users mock service functions here
  },
  shops: shopsMockApi,
  payments: {
    // Payments mock service functions here
  },
  subscriptions: {
    // Subscriptions mock service functions here
  }
};
