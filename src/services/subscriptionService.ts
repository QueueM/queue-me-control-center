
import api from './api';

// Types
export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  billing_cycle: 'monthly' | 'yearly' | 'quarterly';
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: number;
  user_id: number;
  company_id: number;
  plan_id: number;
  plan: SubscriptionPlan;
  status: 'active' | 'canceled' | 'expired' | 'trial';
  start_date: string;
  end_date: string;
  trial_ends_at?: string;
  created_at: string;
  updated_at: string;
  payment_method: {
    id: number;
    type: string;
    last4?: string;
    exp_month?: number;
    exp_year?: number;
  };
}

const subscriptionService = {
  getPlans: async () => {
    const response = await api.get('/api/subscriptions/plans/');
    return response.data;
  },

  getPlan: async (id: number | string) => {
    const response = await api.get(`/api/subscriptions/plans/${id}/`);
    return response.data;
  },

  getSubscriptions: async (page = 1, limit = 10) => {
    const response = await api.get('/api/subscriptions/', {
      params: { page, limit }
    });
    return response.data;
  },

  getSubscription: async (id: number | string) => {
    const response = await api.get(`/api/subscriptions/${id}/`);
    return response.data;
  },

  getUserSubscription: async (userId: number | string) => {
    const response = await api.get(`/api/subscriptions/user/${userId}/`);
    return response.data;
  },

  updateSubscription: async (id: number | string, data: any) => {
    const response = await api.put(`/api/subscriptions/${id}/`, data);
    return response.data;
  },

  cancelSubscription: async (id: number | string, reason?: string) => {
    const response = await api.post(`/api/subscriptions/${id}/cancel/`, { reason });
    return response.data;
  },

  changePlan: async (subscriptionId: number | string, planId: number | string) => {
    const response = await api.post(`/api/subscriptions/${subscriptionId}/change-plan/`, { plan_id: planId });
    return response.data;
  },

  getSubscriptionInvoices: async (subscriptionId: number | string) => {
    const response = await api.get(`/api/subscriptions/${subscriptionId}/invoices/`);
    return response.data;
  },
  
  getSubscriptionFeatures: async () => {
    const response = await api.get('/api/subscriptions/features/');
    return response.data;
  }
};

export default subscriptionService;
