
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Store, 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import dashboardService from '@/services/dashboardService';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { useFetch } from '@/hooks/useFetch';
import { showApiError } from '@/services/errorService';

const DashboardPage: React.FC = () => {
  const [activeChart, setActiveChart] = React.useState("revenue");
  
  // Fetch dashboard data with the enhanced useFetch hook
  const { 
    data: dashboardData, 
    isLoading: isDashboardLoading 
  } = useFetch(
    ['dashboardOverview'], 
    dashboardService.getOverview,
    { 
      showErrors: true,
      errorMessage: "Failed to load dashboard overview"
    }
  );
    
  // Fetch statistics data
  const { 
    data: statisticsData,
    isLoading: isStatsLoading
  } = useFetch(
    ['dashboardStatistics'], 
    dashboardService.getStatistics,
    {
      showErrors: true,
      errorMessage: "Failed to load statistics"
    }
  );
    
  // Fetch chart data based on active chart
  const { 
    data: chartData,
    isLoading: isChartLoading
  } = useFetch(
    ['dashboardChart', activeChart], 
    () => dashboardService.getCharts(activeChart),
    {
      showErrors: true,
      errorMessage: "Failed to load chart data"
    }
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };
  
  // Chart colors
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];
  
  // Use real data if available, otherwise use sample data
  const revenueData = chartData?.revenue || [];
  const bookingsData = chartData?.bookings || [];
  const servicesData = chartData?.services || [];
  
  // Dashboard summary stats
  const stats = {
    totalUsers: statisticsData?.users?.total || 0,
    activeShops: statisticsData?.shops?.active || 0,
    totalRevenue: statisticsData?.payments?.total || 0,
    monthlySubscriptions: statisticsData?.subscriptions?.monthly || 0,
    dailyAppointments: statisticsData?.appointments?.daily || 0,
    completionRate: statisticsData?.appointments?.completionRate || 0,
    averageWaitTime: statisticsData?.queues?.averageWaitTime || 0,
  };

  const isLoading = isDashboardLoading || isStatsLoading || isChartLoading;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of QueueMe platform metrics and performance.
        </p>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Shops
              </CardTitle>
              <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeShops.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Subscriptions
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlySubscriptions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Second row of stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Daily Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.dailyAppointments.toLocaleString()}</div>
              <div className="flex items-center pt-1">
                <ArrowUp className="h-3.5 w-3.5 mr-1 text-green-500" />
                <span className="text-xs text-green-500">5% increase</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completionRate}%</div>
              <div className="flex items-center pt-1">
                <ArrowUp className="h-3.5 w-3.5 mr-1 text-green-500" />
                <span className="text-xs text-green-500">2% improvement</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Average Wait Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageWaitTime} mins</div>
              <div className="flex items-center pt-1">
                <ArrowDown className="h-3.5 w-3.5 mr-1 text-green-500" />
                <span className="text-xs text-green-500">8% improvement</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chart Section */}
      <motion.div variants={itemVariants}>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>
              Platform performance metrics over time.
            </CardDescription>
            <Tabs 
              defaultValue="revenue" 
              className="w-full"
              onValueChange={setActiveChart}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
              </TabsList>
              <TabsContent value="revenue" className="pt-4">
                {isLoading ? (
                  <div className="h-[350px] flex items-center justify-center">
                    <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="amount"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>
              <TabsContent value="bookings" className="pt-4">
                {isLoading ? (
                  <div className="h-[350px] flex items-center justify-center">
                    <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={bookingsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#8884d8" name="Completed" />
                      <Bar dataKey="canceled" fill="#82ca9d" name="Canceled" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>
              <TabsContent value="services" className="pt-4">
                {isLoading ? (
                  <div className="h-[350px] flex items-center justify-center">
                    <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={servicesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {servicesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </TabsContent>
            </Tabs>
          </CardHeader>
          <CardContent className="px-2">
            <div className="flex justify-end pt-4">
              <Button variant="outline">Download Report</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Customers */}
        <motion.div variants={itemVariants} className="col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Signups</CardTitle>
              <CardDescription>
                Latest users who registered in the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 text-left font-medium">User</th>
                    <th className="p-3 text-left font-medium">Email</th>
                    <th className="p-3 text-left font-medium">Date</th>
                    <th className="p-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array(5).fill(0).map((_, i) => (
                      <tr key={i} className="border-b">
                        <td colSpan={4} className="p-3">
                          <div className="h-8 bg-muted animate-pulse rounded-md"></div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    // Use real data or show sample users
                    dashboardData?.recentUsers?.slice(0, 5).map((user: any, i: number) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="p-3 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-4 w-4" />
                          </div>
                          <span>{user?.name || `User ${i + 1}`}</span>
                        </td>
                        <td className="p-3">{user?.email || `user${i + 1}@example.com`}</td>
                        <td className="p-3">{user?.date || new Date().toLocaleDateString()}</td>
                        <td className="p-3">
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            {user?.status || 'Active'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="p-4 text-center">
                <Button variant="outline">View All Users</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Feed */}
        <motion.div variants={itemVariants} className="col-span-3">
          <ActivityFeed height={400} maxItems={5} autoRefresh={true} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
