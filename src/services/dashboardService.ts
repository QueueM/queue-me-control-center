
import api from './api';

const dashboardService = {
  getOverview: async () => {
    const response = await api.get('/api/dashboard/');
    return response.data;
  },
  
  getStatistics: async () => {
    const response = await api.get('/api/dashboard/statistics/');
    return response.data;
  },
  
  getCharts: async (type: string) => {
    const response = await api.get(`/api/dashboard/charts/${type}/`);
    return response.data;
  },
  
  getPerformance: async () => {
    const response = await api.get('/api/dashboard/performance/');
    return response.data;
  },
  
  getCalendar: async () => {
    const response = await api.get('/api/dashboard/calendar/');
    return response.data;
  },
  
  getTasks: async () => {
    const response = await api.get('/api/dashboard/tasks/');
    return response.data;
  },
  
  createTask: async (task: any) => {
    const response = await api.post('/api/dashboard/tasks/', task);
    return response.data;
  }
};

export default dashboardService;
