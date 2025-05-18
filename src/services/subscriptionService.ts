
import api from './api';

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: number;
  billingCycle: string;
  features: string[];
}

export interface Subscription {
  id: number;
  shop: {
    id: number;
    name: string;
  };
  plan: SubscriptionPlan;
  status: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

export const subscriptionService = {
  getSubscriptionPlans: async () => {
    const response = await api.get('/subscription-plans/');
    return response.data;
  },
  
  getSubscriptions: async (page = 1, limit = 10) => {
    const response = await api.get(`/subscriptions/?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  getSubscriptionById: async (subscriptionId: number) => {
    const response = await api.get(`/subscriptions/${subscriptionId}/`);
    return response.data;
  },
  
  updateSubscription: async (subscriptionId: number, data: Partial<Subscription>) => {
    const response = await api.put(`/subscriptions/${subscriptionId}/`, data);
    return response.data;
  },

  getSubscriptionStats: async () => {
    const response = await api.get('/subscription-stats/');
    return response.data;
  }
};
