
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShopFilters } from "@/services/shopService";

const filtersSchema = z.object({
  search: z.string().optional(),
  category_id: z.string().optional(),
  status: z.enum(["all", "active", "inactive", "suspended"]).optional(),
  isVerified: z.enum(["all", "verified", "unverified"]).optional(),
});

type FiltersValues = z.infer<typeof filtersSchema>;

interface ShopsFilterProps {
  categories: { id: number; name: string }[];
  onFilterChange: (filters: ShopFilters) => void;
  isMobile?: boolean;
}

export function ShopsFilter({
  categories,
  onFilterChange,
  isMobile = false,
}: ShopsFilterProps) {
  const form = useForm<FiltersValues>({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      search: "",
      category_id: "all",
      status: "all",
      isVerified: "all",
    },
  });

  const handleSubmit = (values: FiltersValues) => {
    const filters: ShopFilters = {};

    if (values.search) {
      filters.search = values.search;
    }

    if (values.category_id && values.category_id !== "all") {
      filters.category_id = parseInt(values.category_id);
    }

    if (values.status && values.status !== "all") {
      filters.status = values.status as "active" | "inactive" | "suspended";
    }

    if (values.isVerified && values.isVerified !== "all") {
      filters.isVerified = values.isVerified === "verified";
    }

    onFilterChange(filters);
  };

  const resetFilters = () => {
    form.reset({
      search: "",
      category_id: "all",
      status: "all",
      isVerified: "all",
    });
    onFilterChange({});
  };

  const filterForm = (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Search</FormLabel>
              <FormControl>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search shops..."
                    className="pl-8"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isVerified"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select verification status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <div className="flex justify-between pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            className="gap-1"
          >
            <X className="h-4 w-4" />
            Reset
          </Button>
          <Button type="submit">Apply Filters</Button>
        </div>
      </form>
    </Form>
  );

  // Mobile view uses a sheet for filters
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Filter Shops</SheetTitle>
          </SheetHeader>
          <div className="py-4">{filterForm}</div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop view shows filters directly
  return (
    <div className="bg-card border rounded-md p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Filters</h3>
      </div>
      {filterForm}
    </div>
  );
}
