
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
import { Shop, shopService } from '@/services/shopService';
import { motion } from 'framer-motion';
import { CheckCircle, Search, Store, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ShopsPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const { data: shops, isLoading, error } = useQuery({
    queryKey: ['shops'],
    queryFn: () => shopService.getShops(),
    onError: (err) => {
      toast({
        title: "Error fetching shops",
        description: "There was a problem loading the shops data.",
        variant: "destructive"
      });
    }
  });

  const filteredShops = shops?.data?.filter((shop: Shop) => {
    const matchesSearch = 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'verified') return matchesSearch && shop.isVerified;
    if (activeTab === 'unverified') return matchesSearch && !shop.isVerified;
    
    return matchesSearch;
  }) || [];

  const handleVerifyShop = async (shopId: number, verified: boolean) => {
    try {
      await shopService.updateShopStatus(shopId, verified);
      toast({
        title: verified ? "Shop Verified" : "Shop Unverified",
        description: `The shop has been successfully ${verified ? 'verified' : 'unverified'}.`,
      });
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "There was a problem updating the shop status.",
        variant: "destructive"
      });
    }
  };

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

  return (
    <div className="p-6 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shops Management</h1>
          <p className="text-muted-foreground">Manage registered businesses on the platform.</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Shop Statistics</CardTitle>
            <CardDescription>Current shop registration data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{filteredShops.length}</div>
                  <Store className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex flex-col">
                  <div className="text-sm text-muted-foreground">Verified</div>
                  <div className="font-bold text-xl">
                    {filteredShops.filter(shop => shop.isVerified).length}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm text-muted-foreground">Unverified</div>
                  <div className="font-bold text-xl">
                    {filteredShops.filter(shop => !shop.isVerified).length}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Top Categories</CardTitle>
            <CardDescription>Most popular business categories</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center text-muted-foreground">
            <p>Category distribution chart will appear here</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Shops</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="unverified">Unverified</TabsTrigger>
          </TabsList>
          
          <div className="rounded-md border">
            <div className="p-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search shops by name, owner or category..."
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
                        <TableHead>Shop Name</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Subscription</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredShops.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-10">
                            {searchQuery ? "No shops found matching your search" : "No shops available"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredShops.map((shop: Shop) => (
                          <motion.tr
                            key={shop.id}
                            variants={item}
                            className="cursor-pointer hover:bg-muted/50"
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                          >
                            <TableCell className="font-medium">{shop.name}</TableCell>
                            <TableCell>{shop.owner.name}</TableCell>
                            <TableCell>{shop.category}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${shop.isVerified ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                {shop.isVerified ? 'Verified' : 'Unverified'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${shop.subscription.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                                {shop.subscription.plan}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                {shop.isVerified ? (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleVerifyShop(shop.id, false)}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Unverify
                                  </Button>
                                ) : (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleVerifyShop(shop.id, true)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Verify
                                  </Button>
                                )}
                              </div>
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

export default ShopsPage;
