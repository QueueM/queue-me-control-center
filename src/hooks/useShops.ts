
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shopService, Shop, ShopFilters, CreateShopDto, UpdateShopDto } from '@/services/shopService';
import { useToast } from '@/hooks/use-toast';

export const useShops = (initialFilters: ShopFilters = {}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<ShopFilters>(initialFilters);
  
  // Get shops query
  const shopsQuery = useQuery({
    queryKey: ['shops', page, limit, filters],
    queryFn: () => shopService.getShops(page, limit, filters)
  });
  
  // Get categories query
  const categoriesQuery = useQuery({
    queryKey: ['shopCategories'],
    queryFn: () => shopService.getShopCategories()
  });
  
  // Create shop mutation
  const createShopMutation = useMutation({
    mutationFn: (shopData: CreateShopDto) => shopService.createShop(shopData),
    onSuccess: () => {
      toast({
        title: "Shop Created",
        description: "The shop has been successfully created"
      });
      queryClient.invalidateQueries({ queryKey: ['shops'] });
    }
  });
  
  // Update shop mutation  
  const updateShopMutation = useMutation({
    mutationFn: ({ shopId, data }: { shopId: number; data: UpdateShopDto }) => 
      shopService.updateShop(shopId, data),
    onSuccess: () => {
      toast({
        title: "Shop Updated",
        description: "The shop has been successfully updated"
      });
      queryClient.invalidateQueries({ queryKey: ['shops'] });
    }
  });
  
  // Delete shop mutation
  const deleteShopMutation = useMutation({
    mutationFn: (shopId: number) => shopService.deleteShop(shopId),
    onSuccess: () => {
      toast({
        title: "Shop Deleted",
        description: "The shop has been successfully deleted"
      });
      queryClient.invalidateQueries({ queryKey: ['shops'] });
    }
  });
  
  // Update shop verification status
  const updateShopStatusMutation = useMutation({
    mutationFn: ({ shopId, isVerified }: { shopId: number; isVerified: boolean }) => 
      shopService.updateShopStatus(shopId, isVerified),
    onSuccess: (_, variables) => {
      toast({
        title: variables.isVerified ? "Shop Verified" : "Shop Unverified",
        description: `The shop has been successfully ${variables.isVerified ? 'verified' : 'unverified'}`
      });
      queryClient.invalidateQueries({ queryKey: ['shops'] });
    }
  });
  
  return {
    shops: shopsQuery.data?.data || [],
    isLoading: shopsQuery.isLoading,
    isError: shopsQuery.isError,
    error: shopsQuery.error,
    pagination: shopsQuery.data?.meta?.pagination,
    categories: categoriesQuery.data?.data || [],
    isCategoriesLoading: categoriesQuery.isLoading,
    
    // Mutations
    createShop: createShopMutation.mutate,
    isCreating: createShopMutation.isPending,
    updateShop: updateShopMutation.mutate,
    isUpdating: updateShopMutation.isPending,
    deleteShop: deleteShopMutation.mutate,
    isDeleting: deleteShopMutation.isPending,
    updateShopStatus: updateShopStatusMutation.mutate,
    isUpdatingStatus: updateShopStatusMutation.isPending,
    
    // Pagination controls
    page,
    limit,
    setPage,
    setLimit,
    
    // Filter controls
    filters,
    setFilters: (newFilters: ShopFilters) => {
      setFilters(newFilters);
      setPage(1); // Reset to first page when filters change
    },
    
    // Refresh data
    refreshShops: () => queryClient.invalidateQueries({ queryKey: ['shops'] })
  };
};
