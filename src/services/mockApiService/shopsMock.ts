
import { faker } from '@faker-js/faker';

// Generate 50 shops
const generateShops = (count = 50) => {
  const categories = ['Restaurant', 'Café', 'Retail', 'Salon', 'Fitness', 'Healthcare'];
  const subscriptionPlans = ['Free', 'Basic', 'Standard', 'Premium', 'Enterprise'];
  const statuses = ['active', 'inactive', 'suspended'];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: faker.company.name(),
    owner: {
      id: index + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    },
    category: faker.helpers.arrayElement(categories),
    address: faker.location.streetAddress() + ', ' + faker.location.city(),
    phone: faker.phone.number(),
    isVerified: faker.datatype.boolean(),
    subscription: {
      id: index + 1,
      plan: faker.helpers.arrayElement(subscriptionPlans),
      status: faker.helpers.arrayElement(statuses),
    },
    createdAt: faker.date.past().toISOString(),
  }));
};

// Generate categories
const generateCategories = () => {
  const categories = ['Restaurant', 'Café', 'Retail', 'Salon', 'Fitness', 'Healthcare', 'Electronics', 'Clothing', 'Books', 'Jewelry'];
  
  return categories.map((name, index) => ({
    id: index + 1,
    name
  }));
};

const shops = generateShops();
const categories = generateCategories();

export const shopsMockApi = {
  getShops: (page = 1, limit = 10, filters = {}) => {
    let filteredShops = [...shops];
    
    // Apply filters
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredShops = filteredShops.filter(
        shop => 
          shop.name.toLowerCase().includes(searchTerm) ||
          shop.owner.name.toLowerCase().includes(searchTerm) ||
          shop.category.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category_id) {
      const category = categories.find(c => c.id === filters.category_id);
      if (category) {
        filteredShops = filteredShops.filter(shop => shop.category === category.name);
      }
    }
    
    if (filters.status) {
      filteredShops = filteredShops.filter(shop => shop.subscription.status === filters.status);
    }
    
    if (filters.isVerified !== undefined) {
      filteredShops = filteredShops.filter(shop => shop.isVerified === filters.isVerified);
    }
    
    // Calculate pagination
    const totalItems = filteredShops.length;
    const lastPage = Math.ceil(totalItems / limit);
    
    // Get paginated data
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedShops = filteredShops.slice(startIndex, endIndex);
    
    return {
      data: paginatedShops,
      meta: {
        pagination: {
          total: totalItems,
          per_page: limit,
          current_page: page,
          last_page: lastPage,
        },
      },
      success: true,
    };
  },
  
  getShopById: (id) => {
    const shop = shops.find(shop => shop.id === id);
    
    if (!shop) {
      throw new Error('Shop not found');
    }
    
    return {
      data: shop,
      success: true,
    };
  },
  
  createShop: (shopData) => {
    const newId = Math.max(...shops.map(shop => shop.id)) + 1;
    
    const newShop = {
      id: newId,
      name: shopData.name,
      owner: {
        id: shopData.owner_id || 1,
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
      category: shopData.category,
      address: shopData.address,
      phone: shopData.phone,
      isVerified: false,
      subscription: {
        id: newId,
        plan: 'Free',
        status: 'active',
      },
      createdAt: new Date().toISOString(),
    };
    
    shops.push(newShop);
    
    return {
      data: newShop,
      success: true,
    };
  },
  
  updateShop: (id, shopData) => {
    const shopIndex = shops.findIndex(shop => shop.id === id);
    
    if (shopIndex === -1) {
      throw new Error('Shop not found');
    }
    
    const updatedShop = {
      ...shops[shopIndex],
      ...shopData,
    };
    
    shops[shopIndex] = updatedShop;
    
    return {
      data: updatedShop,
      success: true,
    };
  },
  
  deleteShop: (id) => {
    const shopIndex = shops.findIndex(shop => shop.id === id);
    
    if (shopIndex === -1) {
      throw new Error('Shop not found');
    }
    
    shops.splice(shopIndex, 1);
    
    return {
      data: null,
      success: true,
    };
  },
  
  updateShopStatus: (id, isVerified) => {
    const shopIndex = shops.findIndex(shop => shop.id === id);
    
    if (shopIndex === -1) {
      throw new Error('Shop not found');
    }
    
    shops[shopIndex].isVerified = isVerified;
    
    return {
      data: shops[shopIndex],
      success: true,
    };
  },
  
  getShopCategories: () => {
    return {
      data: categories,
      success: true,
    };
  },
};
