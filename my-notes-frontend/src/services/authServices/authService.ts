import httpService from "../httpService/HttpService";
import type { ApiResponse, AuthResponse } from "../../types/ConfigTypes";

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await httpService("POST", "/auth/login", {
      email,
      password,
    });
    return response as AuthResponse;
  },
  register: async (email: string, password: string): Promise<ApiResponse> => {
    const response = await httpService("POST", "/auth/register", {
      email,
      password,
    });
    return response as ApiResponse;
  },
};
