
import api from './api';

// Types
export interface Shop {
  id: number;
  name: string;
  description?: string;
  address: string;
  logo_url?: string;
  cover_image_url?: string;
  company_id: number;
  created_at: string;
  updated_at: string;
  status: 'active' | 'inactive' | 'suspended';
  owner_id: number;
  rating?: number;
  category_ids: number[];
}

export interface CreateShopDto {
  name: string;
  description?: string;
  address: string;
  company_id: number;
  owner_id: number;
  category_ids?: number[];
}

export interface UpdateShopDto {
  name?: string;
  description?: string;
  address?: string;
  status?: 'active' | 'inactive' | 'suspended';
  category_ids?: number[];
}

const shopsService = {
  getShops: async (page = 1, limit = 10, search = '') => {
    const response = await api.get('/api/shops/', {
      params: { page, limit, search }
    });
    return response.data;
  },
  
  getShop: async (id: number | string) => {
    const response = await api.get(`/api/shops/${id}/`);
    return response.data;
  },
  
  createShop: async (shopData: CreateShopDto) => {
    const response = await api.post('/api/shops/', shopData);
    return response.data;
  },
  
  updateShop: async (id: number | string, shopData: UpdateShopDto) => {
    const response = await api.put(`/api/shops/${id}/`, shopData);
    return response.data;
  },
  
  deleteShop: async (id: number | string) => {
    const response = await api.delete(`/api/shops/${id}/`);
    return response.data;
  },
  
  getShopServices: async (id: number | string) => {
    const response = await api.get(`/api/shops/${id}/services/`);
    return response.data;
  },
  
  getShopSpecialists: async (id: number | string) => {
    const response = await api.get(`/api/shops/${id}/specialists/`);
    return response.data;
  },
  
  getShopStatistics: async (id: number | string) => {
    const response = await api.get(`/api/shops/${id}/statistics/`);
    return response.data;
  },
  
  getShopSettings: async (id: number | string) => {
    const response = await api.get(`/api/shops/${id}/settings/`);
    return response.data;
  },
  
  updateShopSettings: async (id: number | string, settings: any) => {
    const response = await api.put(`/api/shops/${id}/settings/`, settings);
    return response.data;
  },
  
  getShopCategories: async () => {
    const response = await api.get('/api/shops/categories/');
    return response.data;
  }
};

export default shopsService;
