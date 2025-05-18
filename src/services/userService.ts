
import api from './api';

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  dateJoined: string;
}

export const userService = {
  getUsers: async (page = 1, limit = 10) => {
    const response = await api.get(`/users/?page=${page}&limit=${limit}`);
    return response.data;
  },
  
  getUserById: async (userId: number) => {
    const response = await api.get(`/users/${userId}/`);
    return response.data;
  },
  
  createUser: async (userData: Partial<User>) => {
    const response = await api.post('/users/', userData);
    return response.data;
  },
  
  updateUser: async (userId: number, userData: Partial<User>) => {
    const response = await api.put(`/users/${userId}/`, userData);
    return response.data;
  },
  
  deleteUser: async (userId: number) => {
    const response = await api.delete(`/users/${userId}/`);
    return response.data;
  }
};
