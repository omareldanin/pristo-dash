import { useQuery } from "@tanstack/react-query";
import { GetAll } from "../services/homeCategories";

export const useHomeCategories = () => {
  return useQuery({
    queryKey: ["homeCategories"],
    queryFn: () => GetAll(),
  });
};
