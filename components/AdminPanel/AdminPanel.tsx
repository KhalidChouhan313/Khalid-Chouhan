"use client";

import { Project, SocialLinks } from "@/lib/types/Admin";
import {
  Briefcase,
  FileText,
  Link2,
  LogOut,
  MessageSquare,
  Save,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { BlogsUpload } from "./BlogsUpload";
import ProjectsUpload from "./ProjectsUpload";
import { Blog as BlogTypes } from "@/lib/types/blogs";
import {
  adminLogin,
  adminLogout,
  checkAdmin,
  deleteMessage,
  getMessages,
  markMessageRead,
} from "@/lib/api/admin";

const AdminLogin: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const { register, handleSubmit } = useForm<{ password: string }>();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ password }: { password: string }) => adminLogin(password),
    onSuccess: onLogin,
  });

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="bg-[#101828] p-8 rounded-lg shadow-2xl w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <label htmlFor="admin-password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          {...register("password", { required: true })}
          className="w-full px-3 py-2 rounded-lg bg-transparent border border-gray-600 focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-400 text-sm">{error.message}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Checking..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export const AdminPanel: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: auth, isLoading: authLoading } = useQuery({
    queryKey: ["admin"],
    queryFn: checkAdmin,
  });
  const isAdmin = !!auth?.admin;

  const [activeTab, setActiveTab] = useState<
    "messages" | "projects" | "blogs" | "social"
  >("messages");
  const { data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    enabled: isAdmin,
  });
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogTypes | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const linksData = localStorage.getItem("admin_social_links");
      if (linksData) setSocialLinks(JSON.parse(linksData) as SocialLinks);
    } catch (error) {
      console.log("Loading initial data failed:", error);
    }
  };

  const saveSocialLinks = async (data: SocialLinks): Promise<void> => {
    localStorage.setItem("admin_social_links", JSON.stringify(data));
    setSocialLinks(data);
  };

  const refreshMessages = () =>
    queryClient.invalidateQueries({ queryKey: ["messages"] });
  const { mutate: removeMessage } = useMutation({
    mutationFn: deleteMessage,
    onSuccess: refreshMessages,
    onError: (e: Error) => toast.error(e.message),
  });
  const { mutate: readMessage } = useMutation({
    mutationFn: markMessageRead,
    onSuccess: refreshMessages,
    onError: (e: Error) => toast.error(e.message),
  });

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }
  if (!isAdmin) {
    return (
      <AdminLogin
        onLogin={() => queryClient.invalidateQueries({ queryKey: ["admin"] })}
      />
    );
  }

  const MessagesTab: React.FC = () => {

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {messages.filter((m) => !m.read).length} Unread
          </span>
        </div>

        {messages.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-500">No messages yet</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-4 rounded-lg border-2 ${msg.read
                ? "bg-gray-50 border-gray-200"
                : "bg-blue-50 border-blue-200"
                }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{msg.name}</h3>
                  <p className="text-sm text-gray-600">{msg.email}</p>
                </div>
                <div className="flex gap-2">
                  {!msg.read && (
                    <button
                      onClick={() => readMessage(msg._id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    aria-label="delete message"
                    title="delete"
                    onClick={() => removeMessage(msg._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mt-2">{msg.message}</p>
              <p className="text-xs text-gray-500 mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    );
  };

  const SocialLinksTab: React.FC = () => {
    const { register, handleSubmit, reset } = useForm<SocialLinks>({
      defaultValues: socialLinks,
    });

    const onSubmit: SubmitHandler<SocialLinks> = async (data) => {
      await saveSocialLinks(data);
      alert("Social links updated successfully!");
    };

    return (
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-white mb-6">
          Social Media Links
        </h2>
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub
            </label>
            <input
              {...register("github")}
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              {...register("linkedin")}
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter
            </label>
            <input
              {...register("twitter")}
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://twitter.com/username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              {...register("instagram")}
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://instagram.com/username"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Social Links
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white">
      <div className="bg-[#101828] text-white p-6 ">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-2">Portfolio Admin Panel</h1>
          <button
            onClick={async () => {
              await adminLogout();
              queryClient.invalidateQueries({ queryKey: ["admin"] });
            }}
            className="flex items-center gap-2 text-sm hover:text-red-400"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-[#101828] text-white rounded-lg shadow-2xl mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${activeTab === "messages"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "cursor-pointer"
                }`}
            >
              <MessageSquare className="h-4 w-4" />
              Messages
              {messages.filter((m) => !m.read).length > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {messages.filter((m) => !m.read).length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${activeTab === "projects"
                ? "border-b-2 border-blue-600 text-blue-600"
                : ""
                }`}
            >
              <Briefcase className="h-4 w-4" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${activeTab === "blogs"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "cursor-pointer"
                }`}
            >
              <FileText className="h-4 w-4" />
              Blogs
            </button>
            <button
              onClick={() => setActiveTab("social")}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${activeTab === "social"
                ? "border-b-2 border-blue-600 text-white"
                : "cursor-pointer"
                }`}
            >
              <Link2 className="h-4 w-4" />
              Social Links
            </button>
          </div>
        </div>

        <div className="bg- rounded-lg shadow-md p-6">
          {activeTab === "messages" && <MessagesTab />}
          {activeTab === "projects" && (
            <ProjectsUpload
              showProjectForm={showProjectForm}
              setShowProjectForm={setShowProjectForm}
              editingProject={editingProject}
              setEditingProject={setEditingProject}
            />
          )}
          {activeTab === "blogs" && (
            <BlogsUpload
              editingBlog={editingBlog}
              setEditingBlog={setEditingBlog}
              setShowBlogForm={setShowBlogForm}
              showBlogForm={showBlogForm}
            />
          )}
          {activeTab === "social" && <SocialLinksTab />}
        </div>
      </div>
    </div>
  );
};
