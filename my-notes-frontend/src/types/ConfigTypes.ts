export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type RequestConfig = {
  headers?: HeadersInit;
  params?: Record<string, string>;
  timeout?: number;
} & Omit<RequestInit, "headers" | "method" | "body">;

export interface ConfigTypes {
  API_BASE_URL: string;
  SOCKET_URL: string;
}

export interface AuthResponse {
  token?: string;
  user?: {
    id: number;
    email: string;
  };
}

export interface SignupResponse {
  id: number;
  email: string;
}
