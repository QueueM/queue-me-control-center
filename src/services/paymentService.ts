
import api from './api';

export interface Payment {
  id: number;
  subscriptionId: number;
  shopId: number;
  shopName: string;
  amount: number;
  status: string;
  transactionId: string;
  paymentMethod: string;
  createdAt: string;
}

export interface Payout {
  id: number;
  shopId: number;
  shopName: string;
  amount: number;
  status: string;
  bankAccount: string;
  processedAt: string;
}

export const paymentService = {
  getPayments: async (page = 1, limit = 10) => {
    const response = await api.get(`/payments/?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  getPaymentById: async (paymentId: number) => {
    const response = await api.get(`/payments/${paymentId}/`);
    return response.data;
  },
  
  getPayouts: async (page = 1, limit = 10) => {
    const response = await api.get(`/payouts/?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  processPayment: async (paymentId: number, status: string) => {
    const response = await api.patch(`/payments/${paymentId}/process/`, { status });
    return response.data;
  },
  
  createPayout: async (payoutData: Partial<Payout>) => {
    const response = await api.post('/payouts/', payoutData);
    return response.data;
  }
};
