import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
  safeClearAuth,
} from "../auth/authStorage";

export const API_BASE_URL =
  (typeof process !== "undefined" && process.env?.VITE_API_URL) ||
  (typeof import.meta !== "undefined" &&
    (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_API_URL) ||
  "http://localhost:5000/api";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
  _skipAuthRefresh?: boolean;
}

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

let refreshPromise: Promise<string> | null = null;

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const customConfig = config as CustomAxiosRequestConfig;
    const token = getAccessToken();

    if (token && customConfig.headers && !customConfig.headers.Authorization) {
      customConfig.headers.Authorization = `Bearer ${token}`;
    }

    return customConfig;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const errorData = error.response?.data as
      | { success?: boolean; error?: { code?: string; message?: string } }
      | undefined;
    const errorCode = errorData?.error?.code;

    const isRefreshEndpoint = originalRequest.url?.includes("/auth/refresh");
    if (isRefreshEndpoint || originalRequest._isRetry || originalRequest._skipAuthRefresh) {
      if (isRefreshEndpoint || status === 401) {
        safeClearAuth();
      }
      return Promise.reject(error);
    }

    if (status === 403 || errorCode === "ERR_ACCOUNT_DISABLED") {
      safeClearAuth();
      return Promise.reject(error);
    }

    if (errorCode === "ERR_INVALID_TOKEN") {
      safeClearAuth();
      return Promise.reject(error);
    }

    if (status !== 401) {
      return Promise.reject(error);
    }

    const currentRefreshToken = getRefreshToken();
    if (!currentRefreshToken) {
      safeClearAuth();
      return Promise.reject(error);
    }

    try {
      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const response = await axios.post<{
              success: boolean;
              data: { accessToken: string };
            }>(
              `${API_BASE_URL}/auth/refresh`,
              { refreshToken: currentRefreshToken },
              { headers: { "Content-Type": "application/json" } }
            );

            const newAccessToken = response.data?.data?.accessToken;
            if (!newAccessToken) {
              throw new Error("Missing access token in refresh response");
            }

            updateAccessToken(newAccessToken);
            return newAccessToken;
          } catch (refreshError) {
            safeClearAuth();
            throw refreshError;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      const newAccessToken = await refreshPromise;

      originalRequest._isRetry = true;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return axiosClient(originalRequest);
    } catch (queueError) {
      return Promise.reject(queueError);
    }
  }
);
