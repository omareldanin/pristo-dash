import { api } from "../api/api";

export interface Order {
  id: number;
  total: number;
  subtotal: number;
  shipping: number;
  quantity: number;
  status: string;
  createdAt: string;
  paymentMethod: string;
  time: number;
  UserAddresses: {
    id: number;
    name: string;
    latitude: string;
    longitudes: string;
  };
  User: {
    id: string;
    name: string;
    phone: string;
  };
  Vendor: {
    id: string;
    name: {
      ar: string;
    };
    cover: string;
  };
  products: {
    id: string;
    total: number;
    quantity: number;
    subtotal: number;
    product: {
      id: number;
      image: string;
      name: string;
      price: number;
    };
    groups: object;
  };
  orderTimeLines: {
    id: number;
    content: string;
    createdAt: string;
  };
}

export interface Filters {
  page: number;
  size: number;
}

export const GetAll = async (filters: Filters) => {
  const response = await api.get<{
    results: Order[];
    count: number;
    page: number;
    totalPages: number;
  }>("order/getAll", {
    params: {
      page: filters.page,
      size: filters.size,
    },
  });

  return response.data;
};

export const updateOrder = async (data: FormData) => {
  const respone = await api.patch<FormData>(
    "order/edit/" + data.get("id"),
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return respone.data;
};

export const deleteOrder = async (id: number | undefined) => {
  const response = await api.patch("order/delete/" + id);

  return response.data;
};
