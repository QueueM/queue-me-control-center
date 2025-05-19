
import { faker } from '@faker-js/faker';
import { format, addDays, subDays } from 'date-fns';

// Enable when in development mode
const useMockApi = import.meta.env.DEV || import.meta.env.VITE_USE_MOCK_API === 'true';

// Add artificial delay to simulate network latency
const addDelay = async (minMs = 300, maxMs = 1200): Promise<void> => {
  if (!useMockApi) return;
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Simulate API errors with a specific probability
const simulateError = (probability = 0.05): void => {
  if (!useMockApi) return;
  if (Math.random() < probability) {
    throw {
      response: {
        status: faker.helpers.arrayElement([400, 401, 403, 404, 500]),
        data: {
          message: faker.helpers.arrayElement([
            'An unexpected error occurred',
            'Resource not found',
            'Unauthorized access',
            'Validation failed',
            'Server error'
          ])
        }
      }
    };
  }
};

// Generate mock data for common entities
const generateUsers = (count = 10) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    username: faker.internet.userName(),
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    avatar: faker.image.avatar(),
    role: faker.helpers.arrayElement(['admin', 'manager', 'user']),
    status: faker.helpers.arrayElement(['active', 'inactive']),
    created_at: faker.date.past().toISOString(),
    last_login: faker.date.recent().toISOString()
  }));
};

const generateShops = (count = 10) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: faker.company.name(),
    description: faker.company.catchPhrase(),
    owner: {
      id: faker.number.int({ min: 1, max: 100 }),
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email()
    },
    category: faker.helpers.arrayElement([
      'Beauty & Spa', 'Health & Medical', 'Restaurant', 
      'Retail', 'Professional Services', 'Auto Services'
    ]),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode()
    },
    phone: faker.phone.number(),
    email: faker.internet.email(),
    website: faker.internet.url(),
    isVerified: faker.datatype.boolean(),
    rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
    reviewCount: faker.number.int({ min: 0, max: 500 }),
    created_at: faker.date.past().toISOString(),
    subscription: {
      id: faker.number.int({ min: 1, max: 1000 }),
      plan: faker.helpers.arrayElement(['Free', 'Basic', 'Premium', 'Enterprise']),
      status: faker.helpers.arrayElement(['active', 'trial', 'expired', 'canceled']),
      start_date: faker.date.past().toISOString(),
      end_date: faker.date.future().toISOString()
    }
  }));
};

const generateSubscriptionPlans = () => {
  return [
    {
      id: 1,
      name: 'Free',
      description: 'Basic features for new businesses',
      price: 0,
      features: [
        'Up to 5 staff members',
        'Basic queue management',
        'Email notifications',
        'Customer feedback'
      ],
      statistics: {
        activeUsers: faker.number.int({ min: 1000, max: 5000 }),
        revenue: 0,
        cancellationRate: '0%'
      }
    },
    {
      id: 2,
      name: 'Basic',
      description: 'Essential features for growing businesses',
      price: 29,
      features: [
        'Up to 10 staff members',
        'Advanced queue management',
        'SMS notifications',
        'Basic analytics',
        'Customer profiles',
        'Email support'
      ],
      statistics: {
        activeUsers: faker.number.int({ min: 500, max: 2000 }),
        revenue: faker.number.int({ min: 5000, max: 20000 }),
        cancellationRate: '5%'
      }
    },
    {
      id: 3,
      name: 'Premium',
      description: 'Advanced features for established businesses',
      price: 79,
      features: [
        'Unlimited staff members',
        'Advanced booking system',
        'Customer loyalty program',
        'Advanced analytics',
        'Custom branding',
        'Priority support',
        'API access'
      ],
      statistics: {
        activeUsers: faker.number.int({ min: 200, max: 1000 }),
        revenue: faker.number.int({ min: 20000, max: 50000 }),
        cancellationRate: '3%'
      }
    },
    {
      id: 4,
      name: 'Enterprise',
      description: 'Complete solution for large organizations',
      price: 199,
      features: [
        'Multiple locations',
        'White label solution',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantees',
        '24/7 premium support',
        'Advanced security features'
      ],
      statistics: {
        activeUsers: faker.number.int({ min: 50, max: 200 }),
        revenue: faker.number.int({ min: 50000, max: 100000 }),
        cancellationRate: '2%'
      }
    }
  ];
};

const generateSubscriptions = (count = 20) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    shopName: faker.company.name(),
    shopId: faker.number.int({ min: 1, max: 1000 }),
    plan: faker.helpers.arrayElement(['Free', 'Basic', 'Premium', 'Enterprise']),
    status: faker.helpers.arrayElement(['active', 'trial', 'past_due', 'canceled']),
    amount: faker.helpers.arrayElement([0, 29, 79, 199]),
    startDate: format(faker.date.past(), 'yyyy-MM-dd'),
    nextPaymentDate: format(faker.date.future(), 'yyyy-MM-dd'),
    paymentMethod: faker.helpers.arrayElement(['credit_card', 'paypal', 'bank_transfer']),
    autoRenew: faker.datatype.boolean()
  }));
};

const generateDashboardStats = () => {
  const today = new Date();
  
  return {
    users: {
      total: faker.number.int({ min: 5000, max: 10000 }),
      new: faker.number.int({ min: 50, max: 200 }),
      active: faker.number.int({ min: 2000, max: 5000 }),
      growth: faker.number.float({ min: 5, max: 25, precision: 0.1 })
    },
    shops: {
      total: faker.number.int({ min: 100, max: 500 }),
      active: faker.number.int({ min: 80, max: 300 }),
      pending: faker.number.int({ min: 10, max: 50 }),
      categories: [
        { name: 'Beauty & Spa', count: faker.number.int({ min: 20, max: 100 }) },
        { name: 'Health & Medical', count: faker.number.int({ min: 15, max: 80 }) },
        { name: 'Restaurant', count: faker.number.int({ min: 30, max: 120 }) },
        { name: 'Retail', count: faker.number.int({ min: 25, max: 90 }) },
        { name: 'Professional Services', count: faker.number.int({ min: 10, max: 70 }) },
        { name: 'Auto Services', count: faker.number.int({ min: 5, max: 40 }) }
      ]
    },
    appointments: {
      daily: faker.number.int({ min: 500, max: 1000 }),
      weekly: faker.number.int({ min: 3000, max: 7000 }),
      completed: faker.number.int({ min: 400, max: 800 }),
      cancelled: faker.number.int({ min: 50, max: 150 }),
      completionRate: faker.number.int({ min: 80, max: 95 })
    },
    subscriptions: {
      total: faker.number.int({ min: 200, max: 400 }),
      active: faker.number.int({ min: 150, max: 300 }),
      trial: faker.number.int({ min: 20, max: 60 }),
      expired: faker.number.int({ min: 10, max: 40 }),
      monthly: faker.number.int({ min: 100, max: 200 }),
      revenue: faker.number.int({ min: 10000, max: 50000 })
    },
    payments: {
      daily: faker.number.int({ min: 1000, max: 5000 }),
      weekly: faker.number.int({ min: 7000, max: 35000 }),
      monthly: faker.number.int({ min: 30000, max: 150000 }),
      total: faker.number.int({ min: 100000, max: 500000 }),
      refunds: faker.number.int({ min: 500, max: 5000 })
    },
    queues: {
      active: faker.number.int({ min: 50, max: 200 }),
      waiting: faker.number.int({ min: 100, max: 500 }),
      averageWaitTime: faker.number.int({ min: 5, max: 20 })
    },
    charts: {
      revenue: Array.from({ length: 12 }, (_, i) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return {
          name: monthNames[i],
          amount: faker.number.int({ min: 5000, max: 50000 })
        };
      }),
      users: Array.from({ length: 12 }, (_, i) => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return {
          name: monthNames[i],
          count: faker.number.int({ min: 100, max: 1000 })
        };
      }),
      bookings: Array.from({ length: 7 }, (_, i) => {
        const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return {
          name: dayNames[i],
          completed: faker.number.int({ min: 30, max: 100 }),
          canceled: faker.number.int({ min: 5, max: 20 })
        };
      }),
      services: [
        { name: 'Haircut', value: faker.number.int({ min: 200, max: 500 }) },
        { name: 'Massage', value: faker.number.int({ min: 150, max: 400 }) },
        { name: 'Nails', value: faker.number.int({ min: 100, max: 350 }) },
        { name: 'Facial', value: faker.number.int({ min: 80, max: 300 }) },
        { name: 'Makeup', value: faker.number.int({ min: 50, max: 200 }) }
      ]
    },
    recentActivities: Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      icon: faker.helpers.arrayElement(['user', 'store', 'payment', 'success', 'error', 'time', 'notification', 'calendar', 'security', 'system']),
      message: faker.helpers.arrayElement([
        'New user registered',
        'Shop verification completed',
        'Payment received',
        'Appointment scheduled',
        'Appointment completed',
        'Subscription upgraded',
        'Support ticket opened',
        'Support ticket resolved',
        'System update completed',
        'Security alert triggered'
      ]),
      timestamp: faker.date.recent().toISOString(),
      user: {
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        role: faker.helpers.arrayElement(['Admin', 'Manager', 'Support'])
      },
      resourceType: faker.helpers.arrayElement(['user', 'shop', 'payment', 'appointment', 'subscription']),
      resourceId: faker.number.int({ min: 1, max: 1000 }),
      status: faker.helpers.arrayElement(['success', 'warning', 'error', 'info'])
    }))
  };
};

// Mock API handlers
const mockApi = {
  users: {
    async getUsers() {
      await addDelay();
      simulateError();
      return { data: generateUsers(20) };
    },
    async getUser(id: number) {
      await addDelay();
      simulateError();
      const user = generateUsers(1)[0];
      user.id = id;
      return { data: user };
    }
  },
  shops: {
    async getShops() {
      await addDelay();
      simulateError();
      return { data: generateShops(20) };
    },
    async getShop(id: number) {
      await addDelay();
      simulateError();
      const shop = generateShops(1)[0];
      shop.id = id;
      return { data: shop };
    }
  },
  subscriptions: {
    async getPlans() {
      await addDelay();
      simulateError();
      return { 
        plans: generateSubscriptionPlans(),
        subscriptions: generateSubscriptions(15)
      };
    },
    async getSubscriptions() {
      await addDelay();
      simulateError();
      return {
        totalRevenue: faker.number.int({ min: 50000, max: 200000 }),
        activeCount: faker.number.int({ min: 100, max: 300 }),
        expiringSoon: faker.number.int({ min: 5, max: 20 }),
        conversionRate: faker.number.float({ min: 60, max: 90, precision: 0.1 }),
        subscriptions: generateSubscriptions(15)
      };
    }
  },
  dashboard: {
    async getOverview() {
      await addDelay();
      simulateError();
      const stats = generateDashboardStats();
      return stats;
    },
    async getStatistics() {
      await addDelay();
      simulateError();
      const stats = generateDashboardStats();
      return stats;
    },
    async getCharts(type: string) {
      await addDelay();
      simulateError();
      const stats = generateDashboardStats();
      return stats.charts;
    },
    async getActivities() {
      await addDelay();
      simulateError();
      const stats = generateDashboardStats();
      return { data: stats.recentActivities };
    }
  },
  activities: {
    async getActivities() {
      await addDelay();
      simulateError();
      const stats = generateDashboardStats();
      return { data: stats.recentActivities };
    }
  }
};

export { useMockApi, mockApi };
export default mockApi;
