import { api } from "../api/api";

export interface Vendor {
  id: number;
  avatar: string;
  subCategoryId: number;
  mainCategoryId: number;
  homeCategoryId: number;
  phone: string;
  name: {
    ar: string;
    en: string;
    fr: string;
  };
  cover: string;
  rate: string;
  reviewsCount: string;
  deliveryCost: string;
  deliveryCostOffer: string;
  hasOffer: boolean;
  offerName: {
    ar: string;
    en: string;
    fr: string;
  };
  active: boolean;
  pickUp: boolean;
  orderTime: number;
  feature: boolean;
  status: string;
}

export interface Filters {
  page: number;
  size: number;
}
export const GetAll = async (filters: Filters) => {
  const response = await api.get<{
    results: Vendor[];
    count: number;
    page: number;
    totalPages: number;
  }>("vendors/getAll", {
    params: {
      page: filters.page,
      size: filters.size,
    },
  });

  return response.data;
};

export const GetOne = async (id: number) => {
  const response = await api.get<{
    results: Vendor;
  }>("vendors/" + id);

  return response.data;
};

export const createVendor = async (data: FormData) => {
  const respone = await api.post<FormData>("vendors/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return respone.data;
};

export const updateVendor = async (data: FormData) => {
  const respone = await api.patch<FormData>(
    "vendors/edit/" + data.get("id"),
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return respone.data;
};

export const deleteVendor = async (id: number) => {
  const respone = await api.delete("vendors/delete/" + id);
  return respone.data;
};
