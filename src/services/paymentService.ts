
import api from './api';

// Types
export interface Payment {
  id: number;
  user_id: number;
  company_id?: number;
  shop_id?: number;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  payment_method_details?: any;
  description?: string;
  created_at: string;
  updated_at: string;
  metadata?: any;
}

export interface PayoutRequest {
  id: number;
  shop_id: number;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  bank_details: any;
  requested_at: string;
  processed_at?: string;
  notes?: string;
}

const paymentService = {
  getPayments: async (page = 1, limit = 10, filters?: any) => {
    const response = await api.get('/api/payments/', {
      params: { page, limit, ...filters }
    });
    return response.data;
  },
  
  getPayment: async (id: number | string) => {
    const response = await api.get(`/api/payments/${id}/`);
    return response.data;
  },
  
  getInvoices: async (page = 1, limit = 10) => {
    const response = await api.get('/api/payments/invoices/', {
      params: { page, limit }
    });
    return response.data;
  },
  
  getInvoice: async (id: number | string) => {
    const response = await api.get(`/api/payments/invoices/${id}/`);
    return response.data;
  },
  
  downloadInvoice: async (id: number | string) => {
    const response = await api.get(`/api/payments/invoices/${id}/download/`, {
      responseType: 'blob'
    });
    return response.data;
  },
  
  processRefund: async (paymentId: number | string, amount?: number, reason?: string) => {
    const response = await api.post(`/api/payments/refund/${paymentId}/`, { amount, reason });
    return response.data;
  },
  
  getPaymentSettings: async () => {
    const response = await api.get('/api/payments/settings/');
    return response.data;
  },
  
  updatePaymentSettings: async (settings: any) => {
    const response = await api.put('/api/payments/settings/', settings);
    return response.data;
  },
  
  // Payouts
  getPayoutRequests: async (page = 1, limit = 10, status?: string) => {
    const response = await api.get('/api/payouts/', {
      params: { page, limit, status }
    });
    return response.data;
  },
  
  getPayoutRequest: async (id: number | string) => {
    const response = await api.get(`/api/payouts/${id}/`);
    return response.data;
  },
  
  approvePayoutRequest: async (id: number | string, notes?: string) => {
    const response = await api.post(`/api/payouts/${id}/approve/`, { notes });
    return response.data;
  },
  
  rejectPayoutRequest: async (id: number | string, reason: string) => {
    const response = await api.post(`/api/payouts/${id}/reject/`, { reason });
    return response.data;
  }
};

export default paymentService;
