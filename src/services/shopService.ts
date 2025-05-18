
import api from './api';

export interface Shop {
  id: number;
  name: string;
  owner: {
    id: number;
    name: string;
    email: string;
  };
  category: string;
  address: string;
  phone: string;
  isVerified: boolean;
  subscription: {
    id: number;
    plan: string;
    status: string;
  };
  createdAt: string;
}

export const shopService = {
  getShops: async (page = 1, limit = 10) => {
    const response = await api.get(`/shops/?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  getShopById: async (shopId: number) => {
    const response = await api.get(`/shops/${shopId}/`);
    return response.data;
  },
  
  updateShopStatus: async (shopId: number, isVerified: boolean) => {
    const response = await api.patch(`/shops/${shopId}/verify/`, { isVerified });
    return response.data;
  }
};
