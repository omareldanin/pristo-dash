import { useQuery } from "@tanstack/react-query";
import { Filters, GetAll } from "../services/users";

export const useUsers = (filters: Filters) => {
  return useQuery({
    queryKey: ["deliveries", filters],
    queryFn: () => GetAll(filters),
  });
};
