import axios, { AxiosRequestConfig } from "axios";
interface ApiWrapperOptions extends AxiosRequestConfig {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  payload?: any;
  isPublic?: boolean;
  isEncrypted?: boolean;
  isFormData?: boolean;
  server?: string;
}
export const apiWrapper = async <T>({
  endpoint,
  method = "GET",
  payload,
  isFormData = false,
  isPublic = true,
  server,
  ...rest
}: ApiWrapperOptions): Promise<T> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": isFormData ? "multipart/form-data" : "application/json",
    };
    if (!isPublic) {
      const token = process.env.NEXT_PUBLIC_API_TOKEN;
      if (token) headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.request<T>({
      url: endpoint,
      method,
      data: payload,
      headers,
      ...rest,
    });
    return response.data;
  } catch (err: any) {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err.message ||
      "Something went wrong";
    console.error("API Error:", message);
    throw new Error(message);
  }
};
