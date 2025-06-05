import { useQuery } from "@tanstack/react-query";
import { GetAll } from "../services/productCategories";

export const useProductCategories = () => {
  return useQuery({
    queryKey: ["productCategories"],
    queryFn: () => GetAll(),
  });
};
