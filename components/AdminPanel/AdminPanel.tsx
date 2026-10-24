"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Briefcase, ExternalLink, FileText, Link2, Loader2, LogOut, MessageSquare } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { toast } from "react-toastify";
import { useBlogs } from "@/hooks/useBlog";
import { useProjects } from "@/hooks/project";
import { useSocialLinks } from "@/hooks/useSocialLinks";
import { SOCIAL_KEYS } from "@/lib/social";
import { adminLogout, checkAdmin, getMessages } from "@/lib/api/admin";
import { AdminTab } from "@/lib/types/Admin";
import { Blog } from "@/lib/types/blogs";
import { Project } from "@/lib/types/projects";
import { cn } from "@/lib/utils/utils";
import { AdminLogin } from "./AdminLogin";
import { BlogsUpload } from "./BlogsUpload";
import { MessagesTab } from "./MessagesTab";
import { SocialLinksTab } from "./SocialLinksTab";
import ProjectsUpload from "./ProjectsUpload";
import { ghostButtonClass } from "./ui";

interface TabConfig {
  id: AdminTab;
  label: string;
  icon: ReactNode;
  count?: number;
  detail: string;
}

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<AdminTab>("messages");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  // poll so new contact-form messages show up while the dashboard stays open
  const messagesQuery = useQuery({ queryKey: ["messages"], queryFn: getMessages, refetchInterval: 30_000 });
  const { data: projects } = useProjects();
  const { data: blogs } = useBlogs();
  const { data: social, isPlaceholderData: socialLoading } = useSocialLinks();
  const socialCount = social ? SOCIAL_KEYS.filter((k) => social[k]).length : 0;

  const messages = messagesQuery.data ?? [];
  const unread = messages.filter((m) => !m.read).length;
  const totalViews = (blogs?.data ?? []).reduce((sum, b) => sum + (b.views ?? 0), 0);

  const logoutMutation = useMutation({
    mutationFn: adminLogout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const tabs: TabConfig[] = [
    {
      id: "messages",
      label: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      count: messagesQuery.data?.length,
      detail: unread ? `${unread} unread` : "All read",
    },
    {
      id: "projects",
      label: "Projects",
      icon: <Briefcase className="h-5 w-5" />,
      count: projects?.length,
      detail: "Showcased work",
    },
    {
      id: "blogs",
      label: "Blog posts",
      icon: <FileText className="h-5 w-5" />,
      count: blogs?.data?.length,
      detail: `${totalViews.toLocaleString()} total views`,
    },
    {
      id: "social",
      label: "Social links",
      icon: <Link2 className="h-5 w-5" />,
      count: socialLoading ? undefined : socialCount,
      detail: "Shown in footer",
    },
  ];

  return (
    <div className="min-h-screen text-white">
      <header className="glass sticky top-0 z-40 border-x-0 border-t-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-black tracking-tight">
            <span className="font-extrabold text-[var(--color-accent)]">&lt;K/&gt;</span>
            <span className="hidden sm:inline">KHALID CHOUHAN</span>
            <span className="rounded-full border border-[var(--color-border-accent)] bg-[var(--color-accent-glow)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" target="_blank" className={cn(ghostButtonClass, "hidden px-4 py-2 sm:inline-flex")}>
              <ExternalLink className="h-4 w-4" /> View site
            </Link>
            <button
              type="button"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className={cn(ghostButtonClass, "px-4 py-2 hover:border-red-500/50 hover:text-red-400")}
            >
              {logoutMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-10 md:px-8 md:py-14">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">Dashboard</span>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">Content Manager</h1>
          <div className="mt-1 h-1 w-16 rounded-full bg-[var(--color-accent)]" />
        </div>

        <nav aria-label="Admin sections" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  queryClient.invalidateQueries({ queryKey: [tab.id] });
                }}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-300 cursor-pointer",
                  active
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-glow)] shadow-[var(--shadow-glow)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 hover:-translate-y-0.5 hover:border-[var(--color-border-accent)]",
                )}
              >
                <span
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors",
                    active
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[#0f0c09]"
                      : "border-[var(--color-border-subtle)] bg-bg-surface text-[var(--color-accent)]",
                  )}
                >
                  {tab.icon}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
                    {tab.label}
                  </span>
                  <span className="text-2xl font-black text-white">{tab.count ?? "—"}</span>
                  <span className="truncate text-xs text-[var(--color-text-faint)]">{tab.detail}</span>
                </span>
                {tab.id === "messages" && unread > 0 && (
                  <span className="ml-auto rounded-full bg-[var(--color-accent)] px-2.5 py-0.5 text-xs font-black text-[#0f0c09]">
                    {unread}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {activeTab === "messages" && (
          <MessagesTab
            messages={messages}
            isLoading={messagesQuery.isLoading}
            isError={messagesQuery.isError}
            onRetry={() => messagesQuery.refetch()}
          />
        )}
        {activeTab === "projects" && (
          <ProjectsUpload
            editingProject={editingProject}
            setEditingProject={setEditingProject}
            showProjectForm={showProjectForm}
            setShowProjectForm={setShowProjectForm}
          />
        )}
        {activeTab === "social" && <SocialLinksTab />}
        {activeTab === "blogs" && (
          <BlogsUpload
            editingBlog={editingBlog}
            setEditingBlog={setEditingBlog}
            showBlogForm={showBlogForm}
            setShowBlogForm={setShowBlogForm}
          />
        )}
      </main>
    </div>
  );
};

export const AdminPanel = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin"], queryFn: checkAdmin });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--color-accent)]" aria-label="Loading" />
      </div>
    );
  }
  if (!data?.admin) {
    return <AdminLogin onLogin={() => queryClient.invalidateQueries({ queryKey: ["admin"] })} />;
  }
  return <Dashboard />;
};
