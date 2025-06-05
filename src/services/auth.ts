import { api } from "../api/api";

export interface SignInRequest {
  phone: string;
  password: string;
}

export interface SignInResponse {
  id: number;
  name: string | undefined;
  phone: string;
  avatar: string | undefined;
  role: string;
  token: string;
  refreshToken: string;
}

export const signInService = async (data: SignInRequest) => {
  const response = await api.post("auth/admin/login", data, {
    method: "post",
  });
  return response.data;
};
