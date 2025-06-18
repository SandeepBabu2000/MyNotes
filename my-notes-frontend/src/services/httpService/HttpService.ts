import { config } from "../../constants/configuration.constants";
import type { ApiMethod, RequestConfig } from "../../types/ConfigTypes";

const BASE_URL = config.API_BASE_URL;
const DEFAULT_TIMEOUT = 5000;

const createUrlWithParams = (
  url: string,
  params?: Record<string, string>
): string => {
  if (!params) return url;
  const searchParams = new URLSearchParams(params);
  return `${url}${url.includes("?") ? "&" : "?"}${searchParams.toString()}`;
};

const createTimeoutController = (timeout: number) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return { controller, timeoutId };
};

/**
 * A generic HTTP service function that performs API requests using Fetch API.
 *
 * @template T - The expected response type of the API call.
 *
 * @param {ApiMethod} method - The HTTP method to use for the request (e.g., GET, POST, etc.).
 * @param {string} url - The endpoint URL for the API request.
 * @param {unknown} [data] - The request payload to send with the API call (optional).
 * @param {Record<string, string>} [params] - Query parameters to include in the API request (optional).
 * @param {RequestConfig} [config] - Additional fetch configuration options (optional).
 *
 * @returns {Promise<T>} - A promise that resolves to the strongly typed response data.
 *
 * @throws {Error} - Throws an error if the request fails, including timeout and network errors.
 */

const httpService = async <T>(
  method: ApiMethod,
  url: string,
  data?: unknown,
  params?: Record<string, string>,
  config?: RequestConfig
): Promise<T> => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const {
    timeout = DEFAULT_TIMEOUT,
    headers: headersConfig = {},
    ...restConfig
  } = config || {};
  const { controller, timeoutId } = createTimeoutController(timeout);

  try {
    const fullUrl = createUrlWithParams(`${BASE_URL}${url}`, params);

    const response = await fetch(fullUrl, {
      method,
      headers: { ...headers, ...headersConfig },
      body: data ? JSON.stringify(data) : undefined,
      signal: controller.signal,
      ...restConfig,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result as T;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
};

export default httpService;
