
import apiService from './api';
import { ApiResponse } from '@/types/api';
import { showApiError } from './errorService';

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

export interface ShopFilters {
  search?: string;
  category_id?: number;
  status?: 'active' | 'inactive' | 'suspended';
  isVerified?: boolean;
}

export interface CreateShopDto {
  name: string;
  category: string;
  address: string;
  phone: string;
  owner_id: number;
}

export interface UpdateShopDto {
  name?: string;
  category?: string;
  address?: string;
  phone?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

export const shopService = {
  getShops: async (page = 1, limit = 10, filters?: ShopFilters) => {
    try {
      const params = { page, limit, ...filters };
      const response = await apiService.get<ApiResponse<Shop[]>>('/shops', { params });
      return response;
    } catch (error) {
      showApiError(error, 'Failed to fetch shops');
      throw error;
    }
  },
  
  getShopById: async (shopId: number) => {
    try {
      const response = await apiService.get<ApiResponse<Shop>>(`/shops/${shopId}`);
      return response;
    } catch (error) {
      showApiError(error, 'Failed to fetch shop details');
      throw error;
    }
  },
  
  createShop: async (shopData: CreateShopDto) => {
    try {
      const response = await apiService.post<ApiResponse<Shop>>('/shops', shopData);
      return response;
    } catch (error) {
      showApiError(error, 'Failed to create shop');
      throw error;
    }
  },
  
  updateShop: async (shopId: number, shopData: UpdateShopDto) => {
    try {
      const response = await apiService.put<ApiResponse<Shop>>(`/shops/${shopId}`, shopData);
      return response;
    } catch (error) {
      showApiError(error, 'Failed to update shop');
      throw error;
    }
  },
  
  deleteShop: async (shopId: number) => {
    try {
      const response = await apiService.delete<ApiResponse<null>>(`/shops/${shopId}`);
      return response;
    } catch (error) {
      showApiError(error, 'Failed to delete shop');
      throw error;
    }
  },
  
  updateShopStatus: async (shopId: number, isVerified: boolean) => {
    try {
      const response = await apiService.patch<ApiResponse<Shop>>(`/shops/${shopId}/verify`, { isVerified });
      return response;
    } catch (error) {
      showApiError(error, 'Failed to update shop verification status');
      throw error;
    }
  },
  
  getShopCategories: async () => {
    try {
      const response = await apiService.get<ApiResponse<{ id: number; name: string }[]>>('/shops/categories');
      return response;
    } catch (error) {
      showApiError(error, 'Failed to fetch shop categories');
      throw error;
    }
  }
};

