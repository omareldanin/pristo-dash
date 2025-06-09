// import { refreshTokenService } from "@/services/refreshToken";
// import { authStore } from "@/store/authStore";
import axios from "axios";
// import { authStore } from "../store/authStore";
// import toast from "react-hot-toast";
// import { refreshTokenService } from "../services/refreshTokenService";
// import toast from "react-hot-toast";

const baseURL = "http://localhost:3000/";

export interface APIError {
  message: string;
  status: string;
}

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   async (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (error.response.status === 401) {
//       const isRefreshTokenRequest =
//         originalRequest?.url?.includes("refresh-token");

//       if (isRefreshTokenRequest) {
//         authStore.getState().logout();
//         toast.error("تم انتهاء الجلسة");
//         return Promise.reject(error);
//       }

//       if (!isRefreshTokenRequest && refreshToken) {
//         try {
//           const response = await refreshTokenService(refreshToken);
//           const newToken = response.token;
//           localStorage.setItem("token", newToken);
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;
//           return await api(originalRequest);
//         } catch (error) {
//           authStore.getState().logout();
//           toast.error("تم انتهاء الجلسة");
//           return Promise.reject(error);
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );
