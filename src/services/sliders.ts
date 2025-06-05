import { api } from "../api/api";

export interface Slider {
  id: number;
  order: number;
  image: string;
}
export const GetAll = async () => {
  const response = await api.get<{ results: Slider[] }>("banner/getAll");

  return response.data;
};

export const createCategory = async (data: FormData) => {
  const respone = await api.post<FormData>("banner/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const editCategory = async (id: number | undefined, data: FormData) => {
  const respone = await api.patch<FormData>("banner/edit/" + id, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const deleteCategory = async (id: number | undefined) => {
  const respone = await api.delete("banner/" + id);
  return respone.data;
};
