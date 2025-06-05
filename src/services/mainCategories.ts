import { api } from "../api/api";

export interface MainCategory {
  name: {
    ar: string;
    en: string;
    fr: string;
  };
  id: number;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  image: string;
  createdBy: string;
  description: {
    ar: string;
    en: string;
    fr: string;
  };
  active: boolean;
  deletedBy: string | null;
}
export const GetAll = async () => {
  const response = await api.get<{ results: MainCategory[] }>(
    "main-category/getAll"
  );

  return response.data;
};

export const createCategory = async (data: FormData) => {
  const respone = await api.post<FormData>("main-category/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const editCategory = async (id: number | undefined, data: FormData) => {
  const respone = await api.patch<FormData>("main-category/edit/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const deleteCategory = async (id: number | undefined) => {
  const respone = await api.patch("main-category/deactive/" + id);
  return respone.data;
};
