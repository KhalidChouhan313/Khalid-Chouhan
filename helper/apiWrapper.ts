import axios, { AxiosRequestConfig } from "axios";
interface ApiWrapperOptions extends AxiosRequestConfig {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  payload?: unknown;
  isFormData?: boolean;
}
// Admin auth rides on the httpOnly admin_session cookie, sent automatically on same-origin requests.
export const apiWrapper = async <T>({
  endpoint,
  method = "GET",
  payload,
  isFormData = false,
  ...rest
}: ApiWrapperOptions): Promise<T> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    };
    const response = await axios.request<T>({
      url: endpoint,
      method,
      data: payload,
      headers,
      ...rest,
    });
    return response.data;
  } catch (err: unknown) {
    const data = axios.isAxiosError(err) ? err.response?.data : undefined;
    const message =
      data?.message ||
      data?.error ||
      (err instanceof Error && err.message) ||
      "Something went wrong";
    console.error("API Error:", message);
    throw new Error(message);
  }
};
