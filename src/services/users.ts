import { api } from "../api/api";

export interface User {
  id: number;
  name: string;
  avatar: string;
  phone: string;
  wallet: string;
  delivery: {
    online: boolean;
  };
}

export interface Filters {
  page: number;
  size: number;
  role: string;
}

export const GetAll = async (filters: Filters) => {
  const response = await api.get<{
    results: User[];
    count: number;
    page: number;
    totalPages: number;
  }>("users/getAll", {
    params: {
      page: filters.page,
      size: filters.size,
      role: filters.role,
    },
  });

  return response.data;
};

export const createDelivery = async (data: FormData) => {
  const respone = await api.post<FormData>("users/create-delivery", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const createTransaction = async (data: FormData) => {
  const respone = await api.post<FormData>("transactions/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const editDelivery = async (data: FormData) => {
  const respone = await api.patch<FormData>("users/update-delivery", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};
export const deleteUser = async (id: number | undefined) => {
  const respone = await api.delete("users/delete/" + id);
  return respone.data;
};
