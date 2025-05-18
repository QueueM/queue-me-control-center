import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { CreditCard, Search, ArrowUpDown, ArrowDownUp, ExternalLink, Download, Calendar } from 'lucide-react';
import { paymentService } from '@/services/paymentService';
import { useToast } from '@/hooks/use-toast';

const PaymentsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const { data: paymentsData, isLoading, error } = useQuery({
    queryKey: ['payments'],
    queryFn: () => paymentService.getPayments(),
    onError: (err) => {
      toast({
        title: "Error fetching payments",
        description: "There was a problem loading the payments data.",
        variant: "destructive"
      });
    }
  });

  const payments = paymentsData?.payments || [];
  const paymentStats = paymentsData?.stats || { 
    totalRevenue: 0, 
    monthlyRevenue: 0, 
    pendingPayouts: 0, 
    completedPayouts: 0,
    paymentsMTD: 0,
    payoutsCompleted: 0
  };

  const filteredPayments = payments.filter((payment: any) => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'completed') return matchesSearch && payment.status === 'completed';
    if (activeTab === 'pending') return matchesSearch && payment.status === 'pending';
    if (activeTab === 'failed') return matchesSearch && payment.status === 'failed';
    
    return matchesSearch;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
          <p className="text-muted-foreground">Track payments and manage payouts to shops.</p>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="flex items-center gap-2">
            <Download size={18} />
            <span>Export Report</span>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className="col-span-1"
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${paymentStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Lifetime revenue</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className="col-span-1"
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Monthly Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${paymentStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Current month</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className="col-span-1"
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ArrowDownUp className="h-4 w-4" />
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{paymentStats.paymentsMTD}</div>
              <p className="text-xs text-muted-foreground mt-1">Month to date</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className="col-span-1"
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                Pending Payouts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${paymentStats.pendingPayouts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Due to shops</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          
          <div className="rounded-md border">
            <div className="p-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by transaction ID or shop name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            
            {isLoading ? (
              <div className="py-10 flex justify-center">
                <div className="space-y-2 w-full max-w-md">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-12 bg-secondary animate-pulse rounded-md" />
                  ))}
                </div>
              </div>
            ) : (
              <TabsContent value={activeTab} className="m-0">
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Shop</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10">
                            {searchQuery ? "No transactions found matching your search" : "No transactions available"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPayments.map((payment: any) => (
                          <motion.tr
                            key={payment.id}
                            variants={item}
                            className="cursor-pointer hover:bg-muted/50"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                          >
                            <TableCell className="font-mono text-xs">{payment.id}</TableCell>
                            <TableCell className="font-medium">{payment.shopName}</TableCell>
                            <TableCell>{payment.type}</TableCell>
                            <TableCell>{payment.date}</TableCell>
                            <TableCell>${payment.amount.toLocaleString()}</TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                payment.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {payment.status}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                            </TableCell>
                          </motion.tr>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </motion.div>
              </TabsContent>
            )}
          </div>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default PaymentsPage;
