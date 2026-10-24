import { apiWrapper } from "@/helper/apiWrapper";
import { AdminAuthResponse, ApiSuccessResponse, Message } from "../types/Admin";

export const checkAdmin = async () =>
  apiWrapper<AdminAuthResponse>({ endpoint: "/api/admin", method: "GET" });

export const adminLogin = async (password: string) =>
  apiWrapper<ApiSuccessResponse>({ endpoint: "/api/admin", method: "POST", payload: { password } });

export const adminLogout = async () =>
  apiWrapper<ApiSuccessResponse>({ endpoint: "/api/admin", method: "DELETE" });

export const getMessages = async () =>
  apiWrapper<Message[]>({ endpoint: "/api/contact", method: "GET" });

export const markMessageRead = async (id: string) =>
  apiWrapper<ApiSuccessResponse>({ endpoint: `/api/contact?id=${id}`, method: "PATCH" });

export const deleteMessage = async (id: string) =>
  apiWrapper<ApiSuccessResponse>({ endpoint: `/api/contact?id=${id}`, method: "DELETE" });
