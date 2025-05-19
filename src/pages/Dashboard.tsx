
import React, { useEffect, useState } from 'react';
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
  XCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Activity 
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

const DashboardPage: React.FC = () => {
  const [activeChart, setActiveChart] = useState("revenue");
  
  // Fetch dashboard data
  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = 
    useQuery({
      queryKey: ['dashboardOverview'],
      queryFn: dashboardService.getOverview
    });
    
  // Fetch statistics data
  const { data: statisticsData, isLoading: isStatsLoading, error: statsError } =
    useQuery({
      queryKey: ['dashboardStatistics'],
      queryFn: dashboardService.getStatistics
    });
    
  // Fetch chart data based on active chart
  const { data: chartData, isLoading: isChartLoading, error: chartError } =
    useQuery({
      queryKey: ['dashboardChart', activeChart],
      queryFn: () => dashboardService.getCharts(activeChart)
    });

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
  
  // Sample data for charts if real data is not available
  const sampleRevenueData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 4500 },
    { name: 'May', amount: 6000 },
    { name: 'Jun', amount: 5500 },
  ];
  
  const sampleBookingsData = [
    { name: 'Mon', completed: 40, canceled: 5 },
    { name: 'Tue', completed: 30, canceled: 8 },
    { name: 'Wed', completed: 45, canceled: 10 },
    { name: 'Thu', completed: 50, canceled: 12 },
    { name: 'Fri', completed: 65, canceled: 15 },
    { name: 'Sat', completed: 75, canceled: 20 },
    { name: 'Sun', completed: 60, canceled: 18 },
  ];
  
  const sampleServicesData = [
    { name: 'Haircut', value: 400 },
    { name: 'Massage', value: 300 },
    { name: 'Nails', value: 300 },
    { name: 'Facial', value: 200 },
    { name: 'Makeup', value: 100 },
  ];

  // Use real data if available, otherwise use sample data
  const revenueData = chartData?.revenue || sampleRevenueData;
  const bookingsData = chartData?.bookings || sampleBookingsData;
  const servicesData = chartData?.services || sampleServicesData;
  
  // Dashboard summary stats
  const stats = {
    totalUsers: statisticsData?.users?.total || 5841,
    activeShops: statisticsData?.shops?.active || 187,
    totalRevenue: statisticsData?.payments?.total || '$286,458',
    monthlySubscriptions: statisticsData?.subscriptions?.monthly || 156,
    dailyAppointments: statisticsData?.appointments?.daily || 632,
    completionRate: statisticsData?.appointments?.completionRate || 89,
    averageWaitTime: statisticsData?.queues?.averageWaitTime || '12 mins',
  };

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
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
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
              <div className="text-2xl font-bold">{stats.activeShops}</div>
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
              <div className="text-2xl font-bold">{stats.totalRevenue}</div>
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
              <div className="text-2xl font-bold">{stats.monthlySubscriptions}</div>
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
              <div className="text-2xl font-bold">{stats.dailyAppointments}</div>
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
              <div className="text-2xl font-bold">{stats.averageWaitTime}</div>
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
              </TabsContent>
              <TabsContent value="bookings" className="pt-4">
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
              </TabsContent>
              <TabsContent value="services" className="pt-4">
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
          <Card>
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
                  {/* Use real data here or sample data */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b hover:bg-muted/50">
                      <td className="p-3 flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-4 w-4" />
                        </div>
                        <span>User {i}</span>
                      </td>
                      <td className="p-3">user{i}@example.com</td>
                      <td className="p-3">{new Date().toLocaleDateString()}</td>
                      <td className="p-3">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
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
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" /> Activity Log
              </CardTitle>
              <CardDescription>Recent system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {[
                  { icon: <Users className="h-4 w-4" />, text: "New user registered", time: "5 minutes ago" },
                  { icon: <Store className="h-4 w-4" />, text: "Shop 'Beauty Salon' was created", time: "30 minutes ago" },
                  { icon: <CreditCard className="h-4 w-4" />, text: "Payment of $250 was received", time: "1 hour ago" },
                  { icon: <CheckCircle className="h-4 w-4" />, text: "Appointment #12345 was completed", time: "2 hours ago" },
                  { icon: <XCircle className="h-4 w-4" />, text: "Subscription was cancelled", time: "3 hours ago" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2 flex-none">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.text}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button variant="outline" className="w-full">View All Activity</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
