
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity,
  User,
  Store,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Bell,
  Calendar,
  ShieldAlert,
  Terminal,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import apiService from '@/services/api';

export interface ActivityItem {
  id: string | number;
  icon: string;
  message: string;
  timestamp: string;
  user?: {
    name: string;
    role: string;
  };
  resourceType?: string;
  resourceId?: string | number;
  status?: 'success' | 'warning' | 'error' | 'info';
}

interface ActivityFeedProps {
  title?: string;
  description?: string;
  maxItems?: number;
  filterByType?: string[];
  showUser?: boolean;
  className?: string;
  height?: string | number;
  autoRefresh?: boolean;
  onItemClick?: (item: ActivityItem) => void;
}

// Map of icon names to Lucide icons
const iconMap: Record<string, React.ElementType> = {
  user: User,
  store: Store,
  payment: CreditCard,
  success: CheckCircle,
  error: XCircle,
  time: Clock,
  notification: Bell,
  calendar: Calendar,
  security: ShieldAlert,
  system: Terminal,
  document: FileText,
  activity: Activity,
};

// Function to get icon or fallback to Activity
const getIcon = (iconName: string): React.ElementType => {
  return iconMap[iconName.toLowerCase()] || Activity;
};

// Function to get status color
const getStatusColor = (status?: string): string => {
  switch (status) {
    case 'success': return 'bg-green-500';
    case 'warning': return 'bg-amber-500';
    case 'error': return 'bg-red-500';
    case 'info': return 'bg-blue-500';
    default: return 'bg-primary/10';
  }
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({
  title = "Activity Feed",
  description = "Recent system activities",
  maxItems = 10,
  filterByType,
  showUser = true,
  className = "",
  height = 350,
  autoRefresh = true,
  onItemClick
}) => {
  const { toast } = useToast();
  
  // Fetch activity data
  const { data, isLoading, error } = useQuery({
    queryKey: ['activity-feed', filterByType],
    queryFn: async () => {
      const params: Record<string, any> = { 
        limit: maxItems
      };
      
      if (filterByType && filterByType.length > 0) {
        params.types = filterByType.join(',');
      }
      
      return await apiService.get<{ data: ActivityItem[] }>('/api/activities', { params });
    },
    refetchInterval: autoRefresh ? 30000 : false, // Auto-refresh every 30 seconds if enabled
    meta: {
      onError: (err: Error) => {
        toast({
          title: "Error loading activity feed",
          description: "Could not load recent activities",
          variant: "destructive"
        });
      }
    }
  });
  
  const activities = data?.data || [];
  
  // Animation variants
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  const handleItemClick = (item: ActivityItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <Card className={`h-full ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" /> {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className={`h-[${typeof height === 'number' ? `${height}px` : height}]`}>
          {isLoading ? (
            <div className="px-6 py-8 flex justify-center items-center">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="px-6 py-8 text-center text-muted-foreground">
              <XCircle className="mx-auto h-8 w-8 mb-2 text-destructive" />
              <p>Failed to load activity feed</p>
            </div>
          ) : activities.length === 0 ? (
            <div className="px-6 py-8 text-center text-muted-foreground">
              <Activity className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>No recent activity</p>
            </div>
          ) : (
            <motion.div 
              className="px-6 py-2 space-y-4"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {activities.map((item) => {
                const IconComponent = getIcon(item.icon);
                const timeAgo = formatDistanceToNow(new Date(item.timestamp), { addSuffix: true });
                const formattedTime = format(new Date(item.timestamp), 'MMM d, h:mm a');
                const statusColor = getStatusColor(item.status);
                
                return (
                  <motion.div 
                    key={item.id}
                    className="flex items-start space-x-3 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                    onClick={() => handleItemClick(item)}
                    variants={itemVariants}
                  >
                    <div className={`rounded-full ${statusColor} p-2 flex-none`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        {item.message}
                        {showUser && item.user && (
                          <span className="text-xs font-medium text-muted-foreground ml-1">
                            by {item.user.name}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground" title={formattedTime}>
                        {timeAgo}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
