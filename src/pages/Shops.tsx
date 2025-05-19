import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useShops } from '@/hooks/useShops';
import { motion } from 'framer-motion';
import { CheckCircle, PlusCircle, Search, Store, XCircle } from 'lucide-react';
import { ShopsFilter } from '@/components/shops/ShopsFilter';
import { ShopModal } from '@/components/shops/ShopModal';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreateShopDto } from '@/services/shopService';

const ShopsPage = () => {
  const isMobile = useIsMobile();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const {
    shops,
    isLoading,
    categories,
    isCategoriesLoading,
    pagination,
    filters,
    setFilters,
    page,
    setPage,
    limit,
    setLimit,
    createShop,
    isCreating,
    updateShopStatus,
    isUpdatingStatus
  } = useShops();
  
  const handleCreateShop = (data: CreateShopDto) => {
    createShop(data);
    setIsCreateModalOpen(false);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
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
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-1">
          <PlusCircle className="h-4 w-4" />
          Add New Shop
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 order-2 lg:order-1">
          {!isMobile && (
            <ShopsFilter 
              categories={categories} 
              onFilterChange={handleFilterChange} 
            />
          )}
        </div>
        
        <div className="lg:col-span-3 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">Shops List</CardTitle>
                    <CardDescription>
                      {pagination?.total || 0} total shops
                    </CardDescription>
                  </div>
                  {isMobile && (
                    <ShopsFilter 
                      categories={categories} 
                      onFilterChange={handleFilterChange} 
                      isMobile={true}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                  <div className="px-4 pt-2">
                    <TabsList className="mb-4 w-full justify-start">
                      <TabsTrigger value="all">All Shops</TabsTrigger>
                      <TabsTrigger value="verified">Verified</TabsTrigger>
                      <TabsTrigger value="unverified">Unverified</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <div className="border-t">
                    <TabsContent value={activeTab} className="m-0">
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
                              {shops.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={6} className="text-center py-10">
                                    {filters.search ? "No shops found matching your search" : "No shops available"}
                                  </TableCell>
                                </TableRow>
                              ) : (
                                shops.map((shop) => (
                                  <motion.tr
                                    key={shop.id}
                                    variants={item}
                                    className="cursor-pointer hover:bg-muted/50"
                                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                                  >
                                    <TableCell className="font-medium">
                                      <Link to={`/shops/${shop.id}`} className="hover:underline">
                                        {shop.name}
                                      </Link>
                                    </TableCell>
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
                                            onClick={() => updateShopStatus({ shopId: shop.id, isVerified: false })}
                                            disabled={isUpdatingStatus}
                                          >
                                            <XCircle className="h-4 w-4 mr-1" />
                                            Unverify
                                          </Button>
                                        ) : (
                                          <Button 
                                            variant="outline" 
                                            size="sm"
                                            onClick={() => updateShopStatus({ shopId: shop.id, isVerified: true })}
                                            disabled={isUpdatingStatus}
                                          >
                                            <CheckCircle className="h-4 w-4 mr-1" />
                                            Verify
                                          </Button>
                                        )}
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          asChild
                                        >
                                          <Link to={`/shops/${shop.id}`}>
                                            View
                                          </Link>
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </motion.tr>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </motion.div>
                      )}
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {isCreateModalOpen && (
        <ShopModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateShop}
          categories={categories}
          isLoading={isCreating}
          mode="create"
        />
      )}
    </div>
  );
};

export default ShopsPage;
