import { api } from "../api/api";

export interface SubCategory {
  id: number;
  name: {
    ar: string;
    en: string;
    fr: string;
  };
  image: string;
  mainCategory: {
    id: true;
    name: {
      ar: string;
      en: string;
      fr: string;
    };
  };
}
export const GetAll = async () => {
  const response = await api.get<{ results: SubCategory[] }>(
    "sub-category/getAll"
  );

  return response.data;
};

export const createCategory = async (data: FormData) => {
  const respone = await api.post<FormData>("sub-category/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const editCategory = async (id: number | undefined, data: FormData) => {
  const respone = await api.patch<FormData>("sub-category/edit/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const deleteCategory = async (id: number | undefined) => {
  const respone = await api.delete("sub-category/delete/" + id);
  return respone.data;
};
