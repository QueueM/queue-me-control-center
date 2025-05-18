
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { BarChart, LineChart, PieChart, ArrowUpRight, Calendar, Download, Filter } from 'lucide-react';
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { format } from "date-fns";

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date()
  });
  
  const { data: analyticsData, isLoading } = useQuery({
    queryKey: ['analytics', dateRange],
    queryFn: async () => {
      // In a real app, this would fetch from your API with the date range
      console.log('Fetching analytics data with date range:', 
        format(dateRange.from, 'yyyy-MM-dd'), 
        format(dateRange.to, 'yyyy-MM-dd'));
      
      // Mock data for demonstration
      return {
        revenue: {
          total: 124500.75,
          growth: 15.3,
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 20)
        },
        users: {
          total: 2458,
          growth: 8.7,
          newUsers: 324,
          activeUsers: 1875,
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 10)
        },
        shops: {
          total: 982,
          growth: 12.5,
          verified: 875,
          pending: 107,
          byCategory: {
            restaurant: 340,
            retail: 280,
            services: 235,
            other: 127
          }
        },
        transactions: {
          total: 8745,
          growth: 23.8,
          successful: 8234,
          failed: 511,
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50)
        }
      };
    }
  });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">View detailed insights about your platform performance</p>
        </div>
        
        <div className="flex items-center gap-2">
          <DateRangePicker
            value={dateRange}
            onValueChange={setDateRange}
          />
          
          <Button variant="outline" size="icon" className="ml-2">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button className="ml-2 flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </motion.div>
      
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">${analyticsData?.revenue.total.toLocaleString()}</div>
                <div className="flex items-center text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>{analyticsData?.revenue.growth}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[80px] bg-gradient-to-b from-primary/5 to-background">
              {/* Revenue chart placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <LineChart className="text-primary/30 h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{analyticsData?.users.total.toLocaleString()}</div>
                <div className="flex items-center text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>{analyticsData?.users.growth}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[80px] bg-gradient-to-b from-primary/5 to-background">
              {/* Users chart placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <BarChart className="text-primary/30 h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Shops</CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{analyticsData?.shops.total.toLocaleString()}</div>
                <div className="flex items-center text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>{analyticsData?.shops.growth}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[80px] bg-gradient-to-b from-primary/5 to-background">
              {/* Shops chart placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <PieChart className="text-primary/30 h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{analyticsData?.transactions.total.toLocaleString()}</div>
                <div className="flex items-center text-green-500 text-xs">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>{analyticsData?.transactions.growth}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[80px] bg-gradient-to-b from-primary/5 to-background">
              {/* Transactions chart placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <BarChart className="text-primary/30 h-8 w-8" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      <Tabs defaultValue="revenue" className="mt-8">
        <TabsList className="grid grid-cols-4 max-w-lg">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="shops">Shops</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Revenue Analytics</CardTitle>
              <CardDescription>
                Track platform revenue over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center">
              <div className="text-muted-foreground">Revenue chart will appear here</div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Revenue by Plan Type</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">Plan distribution chart here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Revenue by Location</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">Location chart here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">Payment methods chart here</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                User acquisition and activity metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center">
              <div className="text-muted-foreground">User growth chart will appear here</div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">User Demographics</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">Demographics chart here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">User Retention</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">Retention chart here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">User Devices</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-muted-foreground">Devices chart here</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="shops" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Shop Distribution</CardTitle>
              <CardDescription>
                Shops by category and verification status
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center">
              <div className="text-muted-foreground">Shop distribution chart will appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Transaction Volume</CardTitle>
              <CardDescription>
                Transaction processing metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center">
              <div className="text-muted-foreground">Transaction chart will appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
