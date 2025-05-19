
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building, Plus, Search, Filter, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { motion } from 'framer-motion';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

const Companies = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock company data
  const companies = [
    { id: 1, name: "Acme Inc", industry: "Technology", employees: 250, status: "active", location: "New York, USA" },
    { id: 2, name: "Globex Corp", industry: "Manufacturing", employees: 500, status: "active", location: "Chicago, USA" },
    { id: 3, name: "Stark Industries", industry: "Energy", employees: 1000, status: "pending", location: "Los Angeles, USA" },
    { id: 4, name: "Wayne Enterprises", industry: "Technology", employees: 750, status: "active", location: "Gotham, USA" },
    { id: 5, name: "Umbrella Corp", industry: "Pharmaceutical", employees: 320, status: "inactive", location: "Seattle, USA" },
    { id: 6, name: "Cyberdyne Systems", industry: "AI & Robotics", employees: 180, status: "pending", location: "Boston, USA" },
    { id: 7, name: "Soylent Corp", industry: "Food Processing", employees: 410, status: "active", location: "Portland, USA" },
    { id: 8, name: "Initech", industry: "Software", employees: 90, status: "inactive", location: "Austin, USA" },
  ];
  
  const filteredCompanies = companies.filter(company => 
    (currentTab === 'all' || company.status === currentTab) &&
    (company.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
     company.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const handleCreateCompany = () => {
    toast({
      title: "Feature coming soon",
      description: "Company creation functionality is under development."
    });
  };
  
  const handleCompanyAction = (action: string, company: any) => {
    toast({
      title: `${action} company`,
      description: `${action} ${company.name} successfully.`
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
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
      <div className="flex justify-between items-center">
        <motion.div variants={itemVariants} className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Companies</h2>
          <p className="text-muted-foreground">
            Manage and monitor all companies registered in the system.
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button onClick={handleCreateCompany}>
            <Plus className="mr-2 h-4 w-4" />
            New Company
          </Button>
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-2 md:space-y-0">
              <CardTitle>Company Registry</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search companies..."
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
                <TabsTrigger value="all">All Companies</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
              <TabsContent value={currentTab} className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">
                          <div className="flex items-center">
                            Company Name
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>Employees</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCompanies.length > 0 ? (
                        filteredCompanies.map((company) => (
                          <TableRow key={company.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                  <Building className="h-4 w-4 text-primary" />
                                </div>
                                {company.name}
                              </div>
                            </TableCell>
                            <TableCell>{company.industry}</TableCell>
                            <TableCell>{company.employees}</TableCell>
                            <TableCell>{company.location}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className={getStatusColor(company.status)}>
                                {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
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
                                  <DropdownMenuItem onClick={() => handleCompanyAction("View", company)}>
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleCompanyAction("Edit", company)}>
                                    Edit company
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-600" 
                                    onClick={() => handleCompanyAction("Delete", company)}
                                  >
                                    Delete company
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center h-24">
                            No companies found.
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
                        <PaginationLink href="#">3</PaginationLink>
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
    </motion.div>
  );
};

export default Companies;
