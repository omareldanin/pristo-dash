import { useQuery } from "@tanstack/react-query";
import { Filters, GetAll } from "../services/orders";

export const useOrders = (filters: Filters) => {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => GetAll(filters),
  });
};
