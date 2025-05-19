
import apiService from './api';
import authService from './authService';

export enum ActivityType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  VIEW = 'view',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  EXPORT = 'export',
  IMPORT = 'import',
  SYSTEM = 'system'
}

export interface AuditLog {
  id?: number;
  userId: number | null;
  username: string | null;
  activityType: ActivityType;
  resourceType: string;
  resourceId?: string | number;
  description: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp?: string;
}

class AuditService {
  private queue: AuditLog[] = [];
  private isFlushing = false;
  private flushInterval: number | null = null;

  constructor() {
    // Start the flush interval when service is instantiated
    this.startFlushInterval();
  }

  private startFlushInterval() {
    // Flush logs every 30 seconds if there are any
    this.flushInterval = window.setInterval(() => {
      if (this.queue.length > 0) {
        this.flush();
      }
    }, 30000) as unknown as number;
  }

  private stopFlushInterval() {
    if (this.flushInterval !== null) {
      clearInterval(this.flushInterval);
      this.flushInterval = null;
    }
  }

  async log(
    activityType: ActivityType,
    resourceType: string,
    description: string,
    resourceId?: string | number,
    metadata?: Record<string, any>
  ): Promise<void> {
    const currentUser = authService.getCurrentUser();
    
    const logEntry: AuditLog = {
      userId: currentUser?.id || null,
      username: currentUser?.username || null,
      activityType,
      resourceType,
      resourceId,
      description,
      metadata,
      ipAddress: 'client', // IP will be captured server-side
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    // Add to queue
    this.queue.push(logEntry);
    
    // If queue gets too large, flush immediately
    if (this.queue.length >= 10) {
      this.flush();
    }
  }

  async flush(): Promise<void> {
    if (this.isFlushing || this.queue.length === 0) {
      return;
    }

    this.isFlushing = true;
    const logsToSend = [...this.queue];
    this.queue = [];

    try {
      await apiService.post('/api/audit-logs/batch', { logs: logsToSend });
    } catch (error) {
      // On error, add logs back to queue for retry
      this.queue = [...logsToSend, ...this.queue];
      console.error('Failed to send audit logs', error);
    } finally {
      this.isFlushing = false;
    }
  }

  // Call on application unmount/cleanup
  cleanup(): void {
    this.stopFlushInterval();
    if (this.queue.length > 0) {
      this.flush();
    }
  }

  // Helper methods for common audit activities
  logLogin(): Promise<void> {
    return this.log(ActivityType.LOGIN, 'auth', 'User logged in');
  }

  logLogout(): Promise<void> {
    return this.log(ActivityType.LOGOUT, 'auth', 'User logged out');
  }

  logView(resourceType: string, resourceId?: string | number): Promise<void> {
    return this.log(ActivityType.VIEW, resourceType, `Viewed ${resourceType}`, resourceId);
  }

  logCreate(resourceType: string, resourceId?: string | number, metadata?: any): Promise<void> {
    return this.log(ActivityType.CREATE, resourceType, `Created ${resourceType}`, resourceId, metadata);
  }

  logUpdate(resourceType: string, resourceId?: string | number, metadata?: any): Promise<void> {
    return this.log(ActivityType.UPDATE, resourceType, `Updated ${resourceType}`, resourceId, metadata);
  }

  logDelete(resourceType: string, resourceId?: string | number, metadata?: any): Promise<void> {
    return this.log(ActivityType.DELETE, resourceType, `Deleted ${resourceType}`, resourceId, metadata);
  }
}

// Export singleton instance
const auditService = new AuditService();
export default auditService;
