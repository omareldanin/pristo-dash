import { useQuery } from "@tanstack/react-query";
import { GetAll } from "../services/subCategories";

export const useSubCategories = () => {
  return useQuery({
    queryKey: ["subCategories"],
    queryFn: () => GetAll(),
  });
};
