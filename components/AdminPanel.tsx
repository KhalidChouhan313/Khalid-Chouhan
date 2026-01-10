"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Mail,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  MessageSquare,
  Briefcase,
  Link2,
  FileText,
} from "lucide-react";
import { Blog, Message, Project, SocialLinks } from "@/lib/types/Admin";



export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("messages");
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [socialLinks, setSocialLinks] = useState({
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
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

      if (messagesData) setMessages(JSON.parse(messagesData.value));
      if (projectsData) setProjects(JSON.parse(projectsData.value));
      if (blogsData) setBlogs(JSON.parse(blogsData.value));
      if (linksData) setSocialLinks(JSON.parse(linksData.value));
    } catch (error) {
      console.log("Loading initial data...");
    }
  };

  const saveMessages = async (data: Message[]): Promise<void> => {
    localStorage.setItem("admin_messages", JSON.stringify(data));
    setMessages(data);
  };

  const saveProjects = async (data: Project[]): Promise<void> => {
    localStorage.setItem("admin_projects", JSON.stringify(data));
    setProjects(data);
  };

  const saveBlogs = async (data: Blog[]): Promise<void> => {
    localStorage.setItem("admin_blogs", JSON.stringify(data));
    setBlogs(data);
  };

  const saveSocialLinks = async (data: SocialLinks): Promise<void> => {
    localStorage.setItem("admin_social_links", JSON.stringify(data));
    setSocialLinks(data);
  };

  const MessagesTab = () => {
    const deleteMessage = async (id) => {
      const updated = messages.filter((m) => m.id !== id);
      saveMessages(updated);
    };

    const markAsRead = async (id) => {
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
            const newMsg = {
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

  const ProjectsTab = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
      if (editingProject) {
        const updated = projects.map((p) =>
          p.id === editingProject.id ? { ...data, id: p.id } : p
        );
        await saveProjects(updated);
        setEditingProject(null);
      } else {
        await saveProjects([...projects, { ...data, id: Date.now() }]);
      }
      reset();
      setShowProjectForm(false);
    };

    const deleteProject = async (id) => {
      const updated = projects.filter((p) => p.id !== id);
      await saveProjects(updated);
    };

    const startEdit = (project) => {
      setEditingProject(project);
      setShowProjectForm(true);
      reset(project);
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Projects</h2>
          <button
            onClick={() => {
              setShowProjectForm(true);
              setEditingProject(null);
              reset();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Project
          </button>
        </div>

        {showProjectForm && (
          <div className="bg-white p-6 rounded-lg border-2 border-blue-200 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingProject ? "Edit Project" : "New Project"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowProjectForm(false);
                  setEditingProject(null);
                  reset();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Images
              </label>
              <input
                type="file"
                {...register("images", { required: "images required hai" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Project images"
              />
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.images.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                {...register("title", { required: "Title required hai" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Project ka naam"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description required hai",
                })}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Project ki details"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technologies
              </label>
              <input
                {...register("technologies", {
                  required: "Technologies required hain",
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., React, Node.js, MongoDB"
              />
              {errors.technologies && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.technologies.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Link
              </label>
              <input
                {...register("link")}
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Link
              </label>
              <input
                {...register("github")}
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/..."
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              {editingProject ? "Update Project" : "Add Project"}
            </button>
          </div>
        )}

        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(project)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">
                {project.description}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                <strong>Tech:</strong> {project.technologies}
              </p>
              <div className="flex gap-3 text-sm">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SocialLinksTab = () => {
    const {
      register,
      handleSubmit: handleSocialSubmit,
      reset,
    } = useForm({
      defaultValues: socialLinks,
    });

    useEffect(() => {
      reset(socialLinks);
    }, [socialLinks, reset]);

    const onSubmit = async (data) => {
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
            onClick={handleSocialSubmit(onSubmit)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Social Links
          </button>
        </div>
      </div>
    );
  };

  const BlogsTab = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
      if (editingBlog) {
        const updated = blogs.map((b) =>
          b.id === editingBlog.id ? { ...data, id: b.id, date: b.date } : b
        );
        await saveBlogs(updated);
        setEditingBlog(null);
      } else {
        await saveBlogs([
          ...blogs,
          {
            ...data,
            id: Date.now(),
            date: new Date().toLocaleDateString("ur-PK"),
          },
        ]);
      }
      reset();
      setShowBlogForm(false);
    };

    const deleteBlog = async (id) => {
      const updated = blogs.filter((b) => b.id !== id);
      await saveBlogs(updated);
    };

    const startEdit = (blog) => {
      setEditingBlog(blog);
      setShowBlogForm(true);
      reset(blog);
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
          <button
            onClick={() => {
              setShowBlogForm(true);
              setEditingBlog(null);
              reset();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Blog Post
          </button>
        </div>

        {showBlogForm && (
          <div className="bg-white p-6 rounded-lg border-2 border-blue-200 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {editingBlog ? "Edit Blog Post" : "New Blog Post"}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowBlogForm(false);
                  setEditingBlog(null);
                  reset();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Title
              </label>
              <input
                {...register("title", { required: "Title required hai" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Blog post ka title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <textarea
                {...register("excerpt", { required: "Excerpt required hai" })}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Short description"
              />
              {errors.excerpt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.excerpt.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                {...register("content", { required: "Content required hai" })}
                rows="6"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Complete blog content"
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                {...register("category")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Web Development, Tech, Tutorial"
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              {editingBlog ? "Update Blog" : "Add Blog"}
            </button>
          </div>
        )}

        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {blog.date} {blog.category && `• ${blog.category}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(blog)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{blog.excerpt}</p>
              <p className="text-gray-500 text-xs line-clamp-2">
                {blog.content}
              </p>
            </div>
          ))}
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
          {activeTab === "projects" && <ProjectsTab />}
          {activeTab === "blogs" && <BlogsTab />}
          {activeTab === "social" && <SocialLinksTab />}
        </div>
      </div>
    </div>
  );
};
