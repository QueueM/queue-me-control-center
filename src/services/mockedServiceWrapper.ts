
import { useMockApi, mockApi } from './mockApiService';

// This wrapper provides a way to switch between real API services and mock services
// based on environment configuration

export function wrapWithMockCheck<T extends object>(realService: T, mockServicePath: keyof typeof mockApi): T {
  // Only use mock services when configured to do so
  if (!useMockApi) {
    return realService;
  }

  const mockServiceImplementation = mockApi[mockServicePath];
  if (!mockServiceImplementation) {
    console.warn(`No mock implementation found for ${String(mockServicePath)}`);
    return realService;
  }

  // Create a proxy that will intercept calls and redirect to mock service
  return new Proxy(realService, {
    get: (target, prop) => {
      const originalProp = (target as any)[prop];
      
      // If the property doesn't exist on the mock service, return the original
      if (typeof mockServiceImplementation[prop as keyof typeof mockServiceImplementation] !== 'function') {
        return originalProp;
      }
      
      // If in mock mode, return the mock implementation
      return mockServiceImplementation[prop as keyof typeof mockServiceImplementation];
    }
  });
}

// Helper to create a properly typed service that can be mocked
export function createService<T extends object>(realService: T, mockServicePath: keyof typeof mockApi): T {
  return wrapWithMockCheck(realService, mockServicePath);
}
