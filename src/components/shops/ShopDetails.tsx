
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Building, Mail, MapPin, Phone, User, Clock } from "lucide-react";
import { format } from "date-fns";
import { shopService, Shop } from "@/services/shopService";
import { useToast } from "@/hooks/use-toast";
import { ShopModal } from "./ShopModal";

export function ShopDetails() {
  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

  const shopQuery = useQuery({
    queryKey: ["shop", shopId],
    queryFn: () => shopService.getShopById(Number(shopId)),
    enabled: !!shopId,
  });

  const categoriesQuery = useQuery({
    queryKey: ["shopCategories"],
    queryFn: () => shopService.getShopCategories(),
  });

  const handleUpdateShop = async (values: any) => {
    try {
      await shopService.updateShop(Number(shopId), {
        name: values.name,
        category: values.category,
        address: values.address,
        phone: values.phone,
      });
      
      toast({
        title: "Shop Updated",
        description: "Shop information has been updated successfully",
      });
      
      setIsEditModalOpen(false);
      shopQuery.refetch();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update shop information",
        variant: "destructive",
      });
    }
  };

  if (shopQuery.isLoading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          <div className="h-8 w-48 bg-muted animate-pulse rounded-md" />
          <div className="h-64 bg-muted animate-pulse rounded-md" />
        </div>
      </div>
    );
  }

  if (shopQuery.isError || !shopQuery.data) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Failed to load shop details</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => navigate("/shops")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shops
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const shop = shopQuery.data.data;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button
            variant="outline"
            size="sm"
            className="mb-2"
            onClick={() => navigate("/shops")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shops
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{shop.name}</h1>
          <div className="flex items-center mt-2 space-x-2">
            <Badge variant={shop.isVerified ? "default" : "outline"}>
              {shop.isVerified ? "Verified" : "Unverified"}
            </Badge>
            <Badge
              variant={
                shop.subscription.status === "active" ? "secondary" : "destructive"
              }
            >
              {shop.subscription.status}
            </Badge>
            <Badge variant="outline">{shop.subscription.plan}</Badge>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => setIsEditModalOpen(true)}>Edit Shop</Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shop Information</CardTitle>
              <CardDescription>Basic information about the shop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Category</h3>
                    <p className="flex items-center gap-2 mt-1">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      {shop.category}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                    <p className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {shop.address}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <p className="flex items-center gap-2 mt-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {shop.phone}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
                    <p className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {format(new Date(shop.createdAt), "PPP")}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-medium">Owner Information</h3>
                <div className="mt-3 space-y-2">
                  <p className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {shop.owner.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {shop.owner.email}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>Services offered by this shop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                <p>No services available</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline">Add Service</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Performance metrics for this shop</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 text-muted-foreground">
                <p>Analytics dashboard coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isEditModalOpen && (
        <ShopModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateShop}
          shop={shop}
          categories={categoriesQuery.data?.data || []}
          isLoading={false}
          mode="edit"
        />
      )}
    </div>
  );
}

export default ShopDetails;
