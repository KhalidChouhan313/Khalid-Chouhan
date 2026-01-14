"use client";

import { Blog, Message, Project, SocialLinks } from "@/lib/types/Admin";
import {
  Briefcase,
  FileText,
  Link2,
  MessageSquare,
  Save,
  Trash2
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BlogsUpload } from "./BlogsUpload";
import ProjectsUpload from "./ProjectsUpload";

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"messages" | "projects" | "blogs" | "social">("messages");
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const messagesData = localStorage.getItem("admin_messages");
      const projectsData = localStorage.getItem("admin_projects");
      const blogsData = localStorage.getItem("admin_blogs");
      const linksData = localStorage.getItem("admin_social_links");

      if (messagesData) setMessages(JSON.parse(messagesData) as Message[]);
      if (projectsData) setProjects(JSON.parse(projectsData) as Project[]);
      if (blogsData) setBlogs(JSON.parse(blogsData) as Blog[]);
      if (linksData) setSocialLinks(JSON.parse(linksData) as SocialLinks);
    } catch (error) {
      console.log("Loading initial data failed:", error);
    }
  };

  const saveMessages = async (data: Message[]): Promise<void> => {
    localStorage.setItem("admin_messages", JSON.stringify(data));
    setMessages(data);
  };

  const saveBlogs = async (data: Blog[]): Promise<void> => {
    localStorage.setItem("admin_blogs", JSON.stringify(data));
    setBlogs(data);
  };

  const saveSocialLinks = async (data: SocialLinks): Promise<void> => {
    localStorage.setItem("admin_social_links", JSON.stringify(data));
    setSocialLinks(data);
  };

  // ---------------- Messages Tab ----------------
  const MessagesTab: React.FC = () => {
    const deleteMessage = async (id: number) => {
      const updated = messages.filter((m) => m.id !== id);
      saveMessages(updated);
    };

    const markAsRead = async (id: number) => {
      const updated = messages.map((m) =>
        m.id === id ? { ...m, read: true } : m
      );
      saveMessages(updated);
    };

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
            <p className="text-gray-500">Koi message nahi hai</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-lg border-2 ${
                msg.read
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
                      onClick={() => markAsRead(msg.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mt-2">{msg.message}</p>
              <p className="text-xs text-gray-500 mt-2">{msg.date}</p>
            </div>
          ))
        )}

        <button
          onClick={async () => {
            const newMsg: Message = {
              id: Date.now(),
              name: "Test User",
              email: "test@example.com",
              message: "Yeh ek test message hai from portfolio contact form",
              date: new Date().toLocaleString("ur-PK"),
              read: false,
            };
            await saveMessages([...messages, newMsg]);
          }}
          className="w-full py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 hover:text-white"
        >
          + Add Test Message (Demo)
        </button>
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Portfolio Admin Panel</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-[#101828] text-white rounded-lg shadow-2xl mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === "messages"
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
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === "projects"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : ""
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === "blogs"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "cursor-pointer"
              }`}
            >
              <FileText className="h-4 w-4" />
              Blogs
            </button>
            <button
              onClick={() => setActiveTab("social")}
              className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                activeTab === "social"
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
              projects={projects}
              showProjectForm={showProjectForm}
              setShowProjectForm={setShowProjectForm}
              editingProject={editingProject}
              setEditingProject={setEditingProject}
            />
          )}
          {activeTab === "blogs" && (
            <BlogsUpload
              editingBlog={editingBlog}
              blogs={blogs}
              saveBlogs={saveBlogs}
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
