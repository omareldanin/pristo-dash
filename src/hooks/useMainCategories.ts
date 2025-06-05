import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, GetAll } from "../services/mainCategories";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { APIError } from "../api/api";

export const useMainCategories = () => {
  return useQuery({
    queryKey: ["mainCategories"],
    queryFn: () => GetAll(),
  });
};

export const useCreateStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => {
      return createCategory(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["mainCategories"],
      });
      toast.success("تم اضافة قسم بنجاح");
    },
    onError: (error: AxiosError<APIError>) => {
      toast.error(error.response?.data.message || "حدث خطأ ما");
    },
  });
};
