
import api from './api';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  date_joined: string;
  last_login: string;
  roles: string[];
  permissions: string[];
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  roles?: string[];
}

export interface UpdateUserDto {
  email?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  roles?: string[];
}

const usersService = {
  getUsers: async (page = 1, limit = 10, search = '') => {
    const response = await api.get('/api/auth/users/', {
      params: { page, limit, search }
    });
    return response.data;
  },
  
  getUser: async (id: number | string) => {
    const response = await api.get(`/api/auth/users/${id}/`);
    return response.data;
  },
  
  createUser: async (userData: CreateUserDto) => {
    const response = await api.post('/api/auth/users/', userData);
    return response.data;
  },
  
  updateUser: async (id: number | string, userData: UpdateUserDto) => {
    const response = await api.put(`/api/auth/users/${id}/`, userData);
    return response.data;
  },
  
  deleteUser: async (id: number | string) => {
    const response = await api.delete(`/api/auth/users/${id}/`);
    return response.data;
  },
  
  getRoles: async () => {
    const response = await api.get('/api/roles/');
    return response.data;
  },
  
  getPermissions: async () => {
    const response = await api.get('/api/roles/permissions/');
    return response.data;
  },
  
  updateUserPermissions: async (id: number | string, permissions: string[]) => {
    const response = await api.put(`/api/auth/users/${id}/permissions/`, { permissions });
    return response.data;
  }
};

export default usersService;
