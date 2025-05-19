
import apiService from './api';
import { createService } from './mockedServiceWrapper';

// Real API implementation
const realDashboardService = {
  getOverview: async () => {
    return await apiService.get('/api/dashboard/overview');
  },
  
  getStatistics: async () => {
    return await apiService.get('/api/dashboard/statistics');
  },
  
  getCharts: async (type: string) => {
    return await apiService.get(`/api/dashboard/charts/${type}`);
  },
  
  getActivities: async () => {
    return await apiService.get('/api/dashboard/activities');
  }
};

// Create service that can switch between real and mock implementation
const dashboardService = createService(realDashboardService, 'dashboard');

export default dashboardService;
