import type { ConfigTypes } from "../types/ConfigTypes";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const config: ConfigTypes = {
  API_BASE_URL: VITE_API_BASE_URL,
  SOCKET_URL: VITE_SOCKET_URL,
} as const;
