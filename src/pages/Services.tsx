
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Layers, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ArrowUpDown,
  Edit,
  Trash2,
  Star,
  Clock
} from "lucide-react";
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const Services = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  
  // Mock service data
  const services = [
    { 
      id: 1, 
      name: "Haircut & Styling", 
      category: "Hair", 
      duration: 45, 
      price: "$35-$50", 
      status: "active",
      popularity: "high",
      shops: 42
    },
    { 
      id: 2, 
      name: "Hair Coloring", 
      category: "Hair", 
      duration: 120, 
      price: "$70-$150", 
      status: "active",
      popularity: "high",
      shops: 38
    },
    { 
      id: 3, 
      name: "Beard Trim", 
      category: "Grooming", 
      duration: 30, 
      price: "$15-$25", 
      status: "active",
      popularity: "medium",
      shops: 35
    },
    { 
      id: 4, 
      name: "Manicure", 
      category: "Nails", 
      duration: 45, 
      price: "$25-$40", 
      status: "active",
      popularity: "high",
      shops: 30
    },
    { 
      id: 5, 
      name: "Facial Treatment", 
      category: "Skincare", 
      duration: 60, 
      price: "$50-$100", 
      status: "active",
      popularity: "medium",
      shops: 28
    },
    { 
      id: 6, 
      name: "Full Body Massage", 
      category: "Wellness", 
      duration: 90, 
      price: "$80-$120", 
      status: "inactive",
      popularity: "medium",
      shops: 22
    },
    { 
      id: 7, 
      name: "Eyebrow Threading", 
      category: "Grooming", 
      duration: 20, 
      price: "$10-$20", 
      status: "active",
      popularity: "high",
      shops: 40
    },
    { 
      id: 8, 
      name: "Hair Extensions", 
      category: "Hair", 
      duration: 180, 
      price: "$150-$400", 
      status: "inactive",
      popularity: "low",
      shops: 15
    },
    { 
      id: 9, 
      name: "Pedicure", 
      category: "Nails", 
      duration: 60, 
      price: "$30-$50", 
      status: "active",
      popularity: "high",
      shops: 33
    },
  ];
  
  // Filter services based on search term and tab
  const filteredServices = services.filter(service => 
    (currentTab === 'all' || service.status === currentTab) &&
    (service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     service.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleCreateService = () => {
    toast({
      title: "Feature coming soon",
      description: "Service creation functionality is under development."
    });
  };
  
  const handleServiceAction = (action: string, service: any) => {
    toast({
      title: `${action} service`,
      description: `${action} ${service.name} successfully.`
    });
  };
  
  // Stats for the service categories
  const serviceStats = [
    { category: 'Hair', count: 10, growth: '+15%' },
    { category: 'Nails', count: 6, growth: '+8%' },
    { category: 'Skincare', count: 4, growth: '+12%' },
    { category: 'Grooming', count: 5, growth: '+5%' },
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return '';
    }
  };
  
  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'high': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-gray-500';
      default: return '';
    }
  };

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
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <motion.div variants={itemVariants} className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Services</h2>
          <p className="text-muted-foreground">
            Manage services available across all shops on the platform.
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button onClick={handleCreateService}>
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {serviceStats.map((stat, index) => (
          <motion.div key={stat.category} variants={itemVariants}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.category} Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.count}</div>
                <p className="text-xs text-green-600 mt-1">{stat.growth} from last month</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
              <CardTitle>Service Management</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search services..."
                    className="pl-8 w-[250px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Services</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              <TabsContent value={currentTab} className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">
                          <div className="flex items-center">
                            Service Name
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            Duration
                            <Clock className="ml-1 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Price Range</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            Popularity
                            <Star className="ml-1 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead># of Shops</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredServices.length > 0 ? (
                        filteredServices.map((service) => (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                  <Layers className="h-4 w-4 text-primary" />
                                </div>
                                {service.name}
                              </div>
                            </TableCell>
                            <TableCell>{service.category}</TableCell>
                            <TableCell>{service.duration} min</TableCell>
                            <TableCell>{service.price}</TableCell>
                            <TableCell>
                              <span className={getPopularityColor(service.popularity)}>
                                {Array(service.popularity === 'high' ? 3 : service.popularity === 'medium' ? 2 : 1)
                                  .fill(0)
                                  .map((_, i) => (
                                    <Star key={i} className="inline h-4 w-4 fill-current" />
                                  ))}
                              </span>
                            </TableCell>
                            <TableCell>{service.shops}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(service.status)}>
                                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleServiceAction("Edit", service)}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleServiceAction(service.status === 'active' ? 'Deactivate' : 'Activate', service)}
                                  >
                                    {service.status === 'active' ? 'Deactivate' : 'Activate'}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-600" 
                                    onClick={() => handleServiceAction("Delete", service)}
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center h-24">
                            No services found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Popular Service Combinations</CardTitle>
            <CardDescription>Services that are frequently booked together</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Primary Service</TableHead>
                  <TableHead>Paired Service</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Avg. Duration</TableHead>
                  <TableHead>Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Haircut & Styling</TableCell>
                  <TableCell>Hair Coloring</TableCell>
                  <TableCell>68%</TableCell>
                  <TableCell>165 min</TableCell>
                  <TableCell>$105-$200</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Manicure</TableCell>
                  <TableCell>Pedicure</TableCell>
                  <TableCell>72%</TableCell>
                  <TableCell>105 min</TableCell>
                  <TableCell>$55-$90</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Facial Treatment</TableCell>
                  <TableCell>Eyebrow Threading</TableCell>
                  <TableCell>45%</TableCell>
                  <TableCell>80 min</TableCell>
                  <TableCell>$60-$120</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Services;
