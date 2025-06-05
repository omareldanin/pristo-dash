import { api } from "../api/api";

export interface HomeCategory {
  name: {
    ar: string;
    en: string;
    fr: string;
  };
  id: number;
  order: number;
  image: string;
  active: boolean;
}
export const GetAll = async () => {
  const response = await api.get<{ results: HomeCategory[] }>(
    "home-category/getAll"
  );

  return response.data;
};

export const createCategory = async (data: FormData) => {
  const respone = await api.post<FormData>("home-category/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const editCategory = async (id: number | undefined, data: FormData) => {
  const respone = await api.patch<FormData>("home-category/edit/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const deleteCategory = async (id: number | undefined) => {
  const respone = await api.delete("home-category/" + id);
  return respone.data;
};
