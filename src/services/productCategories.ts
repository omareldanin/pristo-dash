import { api } from "../api/api";

export interface ProductCategory {
  id: number;
  name: {
    ar: string;
    en: string;
    fr: string;
  };
  MainCategory: {
    id: true;
    name: {
      ar: string;
      en: string;
      fr: string;
    };
  };
}
export const GetAll = async () => {
  const response = await api.get<{ results: ProductCategory[] }>(
    "product-category/getAll"
  );

  return response.data;
};

export const createCategory = async (data: FormData) => {
  const respone = await api.post<FormData>("product-category/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const editCategory = async (id: number | undefined, data: FormData) => {
  const respone = await api.patch<FormData>(
    "product-category/edit/" + id,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return respone.data;
};

export const deleteCategory = async (id: number | undefined) => {
  const respone = await api.delete("product-category/delete/" + id);
  return respone.data;
};
