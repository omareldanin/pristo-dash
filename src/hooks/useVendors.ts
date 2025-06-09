import { useQuery } from "@tanstack/react-query";
import { Filters, GetAll, GetOne } from "../services/vendors";

export const useVendors = (filters: Filters) => {
  return useQuery({
    queryKey: ["vendors", filters],
    queryFn: () => GetAll(filters),
  });
};

export const useVendorDetails = (id: number) => {
  return useQuery({
    queryKey: ["vendors", id],
    queryFn: () => GetOne(id),
  });
};
