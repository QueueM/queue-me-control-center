
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
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
import { BookOpen, Search, Plus, ArrowUpDown, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { subscriptionService } from "@/services/subscriptionService";
import { useToast } from '@/hooks/use-toast';

const SubscriptionsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [openPlanId, setOpenPlanId] = useState<string | null>(null);
  
  const { data: subscriptionData, isLoading, error } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => subscriptionService.getSubscriptionPlans(),
    onError: (err) => {
      toast({
        title: "Error fetching subscriptions",
        description: "There was a problem loading the subscription data.",
        variant: "destructive"
      });
    }
  });

  const { data: subscriptionStats } = useQuery({
    queryKey: ['subscription-stats'],
    queryFn: () => subscriptionService.getSubscriptionStats(),
  });

  const subscriptionPlans = subscriptionData?.plans || [];
  const subscriptionList = subscriptionData?.subscriptions || [];

  const filteredSubscriptions = subscriptionList.filter(sub =>
    sub.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.plan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCollapsible = (planId: string) => {
    setOpenPlanId(openPlanId === planId ? null : planId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <div className="p-6 space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
          <p className="text-muted-foreground">Manage subscription plans and monitor active subscriptions.</p>
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="flex items-center gap-2">
            <Plus size={18} />
            <span>New Plan</span>
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
            <CardHeader>
              <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${subscriptionStats?.totalRevenue || '0'}</div>
              <p className="text-xs text-muted-foreground mt-1">Monthly recurring revenue</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className="col-span-1"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{subscriptionStats?.activeCount || '0'}</div>
              <p className="text-xs text-muted-foreground mt-1">Currently active subscriptions</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className="col-span-1"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Expiring Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{subscriptionStats?.expiringSoon || '0'}</div>
              <p className="text-xs text-muted-foreground mt-1">Expiring in the next 7 days</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          whileHover="hover"
          variants={cardVariants}
          className="col-span-1"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{subscriptionStats?.conversionRate || '0'}%</div>
              <p className="text-xs text-muted-foreground mt-1">Trial to paid conversion</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Subscription Plans
        </h2>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {subscriptionPlans.map((plan: any) => (
            <motion.div 
              key={plan.id}
              variants={itemVariants}
              whileHover="hover"
              variants={cardVariants}
            >
              <Collapsible
                open={openPlanId === plan.id}
                onOpenChange={() => toggleCollapsible(plan.id)}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="text-lg font-bold text-primary">${plan.price}/mo</div>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {plan.features.map((feature: string, i: number) => (
                        <motion.li
                          key={i}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          <div className="h-2 w-2 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {openPlanId === plan.id ? "Less details" : "More details"}
                      </Button>
                    </CollapsibleTrigger>
                    <Button variant="outline" size="sm">Edit Plan</Button>
                  </CardFooter>
                  
                  <CollapsibleContent>
                    <div className="px-6 pb-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active Users:</span>
                        <span className="font-medium">{plan.statistics?.activeUsers || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Revenue:</span>
                        <span className="font-medium">${plan.statistics?.revenue || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cancellation Rate:</span>
                        <span className="font-medium">{plan.statistics?.cancellationRate || '0%'}</span>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold">Active Subscriptions</h2>
        
        <div className="rounded-md border">
          <div className="p-4 flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by shop name or plan..."
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
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Shop</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Start Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Next Payment
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-10">
                        {searchQuery ? "No subscriptions found matching your search" : "No subscriptions available"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubscriptions.map((subscription: any) => (
                      <motion.tr
                        key={subscription.id}
                        variants={itemVariants}
                        className="cursor-pointer hover:bg-muted/50"
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                      >
                        <TableCell className="font-medium">{subscription.shopName}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{subscription.plan}</span>
                            <span className="text-xs text-muted-foreground">${subscription.amount}/month</span>
                          </div>
                        </TableCell>
                        <TableCell>{subscription.startDate}</TableCell>
                        <TableCell>{subscription.nextPaymentDate}</TableCell>
                        <TableCell>
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            subscription.status === 'active' ? 'bg-green-100 text-green-800' : 
                            subscription.status === 'trial' ? 'bg-blue-100 text-blue-800' : 
                            subscription.status === 'past_due' ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {subscription.status}
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
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SubscriptionsPage;
