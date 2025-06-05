import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SignInResponse } from "../services/auth";
import { jwtDecode } from "jwt-decode";
import { queryClient, router } from "../main";

interface IAuthStore {
  setAuth: (data: SignInResponse) => void;
  logout: () => void;
  id: string;
  name: string;
  phone: string;
  avatar: string;
  wallet: string;
  role: string;
  token: string;
  refreshToken: string;
}

interface TokenPayload {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  wallet: string;
  role: string;
}

export const authStore = create<IAuthStore>()(
  persist(
    (set) => ({
      token: "",
      refreshToken: "",
      id: "",
      name: "",
      role: "",
      avatar: "",
      wallet: "",
      phone: "",
      setAuth: (data: SignInResponse) => {
        const decodedToken = jwtDecode<TokenPayload>(data.token);
        set({
          token: data.token,
          id: decodedToken.id,
          name: decodedToken.name,
          refreshToken: data.refreshToken,
          phone: decodedToken.phone,
          role: decodedToken.role,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
      },
      logout: () => {
        set({
          token: "",
          refreshToken: "",
          id: "",
          name: "",
          phone: "",
          role: "",
        });
        router.navigate("/");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        queryClient.clear();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export const useAuth = () => authStore((state) => state);
