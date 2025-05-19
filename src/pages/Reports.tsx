
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, BarChart3, LineChart, Download, RefreshCw, ChevronDown } from "lucide-react";
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
  LineChart as RechartsLineChart,
  Line
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Reports = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState('30d');
  
  const handleGenerateReport = () => {
    toast({
      title: 'Report Generated',
      description: 'Your custom report has been generated successfully.',
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: 'Download Started',
      description: 'Your report is being prepared for download.',
    });
  };
  
  // Mock data for charts
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ];
  
  const userSignupData = [
    { name: 'Week 1', value: 24 },
    { name: 'Week 2', value: 13 },
    { name: 'Week 3', value: 98 },
    { name: 'Week 4', value: 39 },
    { name: 'Week 5', value: 48 },
    { name: 'Week 6', value: 38 },
    { name: 'Week 7', value: 43 },
    { name: 'Week 8', value: 24 },
  ];
  
  const serviceUsageData = [
    { name: 'Haircuts', value: 400 },
    { name: 'Styling', value: 300 },
    { name: 'Coloring', value: 300 },
    { name: 'Spa', value: 200 },
    { name: 'Nails', value: 100 },
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  // Mock data for top shops
  const topShops = [
    { id: 1, name: 'Elite Hair Studio', revenue: '$12,435', appointments: 423, rating: 4.9 },
    { id: 2, name: 'Glamour Zone', revenue: '$10,784', appointments: 356, rating: 4.8 },
    { id: 3, name: 'Beauty Hub', revenue: '$9,432', appointments: 312, rating: 4.7 },
    { id: 4, name: 'Style Masters', revenue: '$8,765', appointments: 298, rating: 4.6 },
    { id: 5, name: 'Classy Cuts', revenue: '$7,654', appointments: 256, rating: 4.5 },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <motion.div variants={itemVariants} className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Advanced Reports</h2>
          <p className="text-muted-foreground">
            Detailed analytics and reports for performance monitoring.
          </p>
        </motion.div>
        <motion.div variants={itemVariants} className="flex space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleDownloadReport()}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownloadReport()}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownloadReport()}>
                Export as Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="custom">Custom Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$36,254.12</div>
                  <div className="text-xs text-muted-foreground">+12.5% from last month</div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>New Users</CardTitle>
                  <CardDescription>Weekly signup rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <div className="text-xs text-muted-foreground">+24.3% from last week</div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={userSignupData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Service Distribution</CardTitle>
                  <CardDescription>Most used services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,245</div>
                  <div className="text-xs text-muted-foreground">Total appointments</div>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={serviceUsageData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {serviceUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Shops</CardTitle>
                <CardDescription>Based on revenue and appointment count</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Shop Name</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Appointments</TableHead>
                      <TableHead>Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topShops.map((shop, index) => (
                      <TableRow key={shop.id}>
                        <TableCell>#{index + 1}</TableCell>
                        <TableCell className="font-medium">{shop.name}</TableCell>
                        <TableCell>{shop.revenue}</TableCell>
                        <TableCell>{shop.appointments}</TableCell>
                        <TableCell>{shop.rating}/5.0</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Detailed analysis of system performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Average Load Time</div>
                    <div className="text-2xl font-bold">1.2s</div>
                    <div className="text-xs text-green-600">-0.3s from last week</div>
                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Server Response Time</div>
                    <div className="text-2xl font-bold">0.85s</div>
                    <div className="text-xs text-green-600">-0.15s from last week</div>
                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Error Rate</div>
                    <div className="text-2xl font-bold">0.12%</div>
                    <div className="text-xs text-green-600">-0.05% from last week</div>
                    <div className="h-2 bg-gray-200 rounded-full mt-2">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where users are coming from</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: 'Direct', value: 35 },
                            { name: 'Organic Search', value: 25 },
                            { name: 'Referral', value: 20 },
                            { name: 'Social', value: 15 },
                            { name: 'Paid Search', value: 5 }
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {serviceUsageData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Daily active users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={[
                          { date: 'Jan 1', users: 400 },
                          { date: 'Jan 2', users: 300 },
                          { date: 'Jan 3', users: 500 },
                          { date: 'Jan 4', users: 280 },
                          { date: 'Jan 5', users: 590 },
                          { date: 'Jan 6', users: 320 },
                          { date: 'Jan 7', users: 350 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="#8884d8" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Custom Report</CardTitle>
                <CardDescription>Create tailored reports based on specific metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-type">Report Type</Label>
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="revenue">Revenue Analysis</SelectItem>
                          <SelectItem value="users">User Growth</SelectItem>
                          <SelectItem value="appointments">Appointment Trends</SelectItem>
                          <SelectItem value="services">Service Popularity</SelectItem>
                          <SelectItem value="shops">Shop Performance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="date-range">Date Range</Label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                          <SelectItem value="6m">Last 6 months</SelectItem>
                          <SelectItem value="1y">Last year</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="report-format">Format</Label>
                      <Select defaultValue="pdf">
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="excel">Excel</SelectItem>
                          <SelectItem value="csv">CSV</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="include-charts">Include</Label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="Select components" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Components</SelectItem>
                          <SelectItem value="charts">Charts Only</SelectItem>
                          <SelectItem value="tables">Tables Only</SelectItem>
                          <SelectItem value="summary">Summary Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button onClick={handleGenerateReport}>Generate Report</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Previously generated custom reports</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date Range</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Q1 Revenue Analysis</TableCell>
                      <TableCell>Revenue</TableCell>
                      <TableCell>Jan 1 - Mar 31, 2023</TableCell>
                      <TableCell>Apr 5, 2023</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleDownloadReport()}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">User Growth Study</TableCell>
                      <TableCell>Users</TableCell>
                      <TableCell>Last 90 days</TableCell>
                      <TableCell>Mar 15, 2023</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleDownloadReport()}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Service Popularity Trends</TableCell>
                      <TableCell>Services</TableCell>
                      <TableCell>Last 6 months</TableCell>
                      <TableCell>Feb 28, 2023</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleDownloadReport()}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default Reports;
