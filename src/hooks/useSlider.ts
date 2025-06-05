import { useQuery } from "@tanstack/react-query";
import { GetAll } from "../services/sliders";

export const useSliders = () => {
  return useQuery({
    queryKey: ["sliders"],
    queryFn: () => GetAll(),
  });
};
