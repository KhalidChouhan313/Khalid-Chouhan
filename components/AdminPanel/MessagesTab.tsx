"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCheck, Inbox, Mail, Reply } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { deleteMessage, markMessageRead } from "@/lib/api/admin";
import { Message } from "@/lib/types/Admin";
import { cn } from "@/lib/utils/utils";
import {
  cardClass,
  ConfirmDeleteButton,
  EmptyState,
  ErrorState,
  iconButtonClass,
  ListSkeleton,
  SectionHeader,
} from "./ui";

type Filter = "all" | "unread";

interface MessagesTabProps {
  messages: Message[];
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}

export const MessagesTab = ({ messages, isLoading, isError, onRetry }: MessagesTabProps) => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<Filter>("all");
  const unreadCount = messages.filter((m) => !m.read).length;
  const visible = filter === "unread" ? messages.filter((m) => !m.read) : messages;

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["messages"] });
  const readMutation = useMutation({
    mutationFn: markMessageRead,
    onSuccess: refresh,
    onError: (e: Error) => toast.error(e.message),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      toast.success("Message deleted");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        eyebrow="Inbox"
        title="Contact Messages"
        action={
          <div className="inline-flex rounded-full border border-[var(--color-border)] p-1" role="tablist">
            {(["all", "unread"] as const).map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer",
                  filter === f
                    ? "bg-[var(--color-accent)] text-[#0f0c09]"
                    : "text-[var(--color-text-muted)] hover:text-white",
                )}
              >
                {f === "all" ? `All (${messages.length})` : `Unread (${unreadCount})`}
              </button>
            ))}
          </div>
        }
      />

      {isLoading ? (
        <ListSkeleton />
      ) : isError ? (
        <ErrorState message="Couldn't load messages." onRetry={onRetry} />
      ) : visible.length === 0 ? (
        <EmptyState
          icon={<Inbox className="h-6 w-6" />}
          title={filter === "unread" ? "All caught up" : "No messages yet"}
          text={
            filter === "unread"
              ? "You've read every message."
              : "Messages sent from the contact form will show up here."
          }
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {visible.map((msg) => (
            <li
              key={msg._id}
              className={cn(
                cardClass,
                "p-5 transition-colors md:p-6",
                !msg.read && "border-[var(--color-border-accent)] shadow-[var(--shadow-glow)]",
              )}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-surface text-sm font-black uppercase text-[var(--color-accent)]">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate font-bold text-white">{msg.name}</h3>
                      {!msg.read && (
                        <span className="rounded-full bg-[var(--color-accent-glow)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                          New
                        </span>
                      )}
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="inline-flex items-center gap-1 truncate text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
                    >
                      <Mail className="h-3.5 w-3.5" /> {msg.email}
                    </a>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <time dateTime={msg.createdAt} className="mr-1 text-xs text-[var(--color-text-faint)]">
                    {new Date(msg.createdAt).toLocaleString()}
                  </time>
                  <a
                    href={`mailto:${msg.email}?subject=${encodeURIComponent("Re: your message on my portfolio")}`}
                    aria-label={`Reply to ${msg.name}`}
                    title="Reply"
                    className={iconButtonClass}
                  >
                    <Reply className="h-4 w-4" />
                  </a>
                  {!msg.read && (
                    <button
                      type="button"
                      onClick={() => readMutation.mutate(msg._id)}
                      disabled={readMutation.isPending && readMutation.variables === msg._id}
                      aria-label="Mark as read"
                      title="Mark as read"
                      className={iconButtonClass}
                    >
                      <CheckCheck className="h-4 w-4" />
                    </button>
                  )}
                  <ConfirmDeleteButton
                    label="Delete message"
                    pending={deleteMutation.isPending && deleteMutation.variables === msg._id}
                    onConfirm={() => deleteMutation.mutate(msg._id)}
                  />
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line break-words text-sm leading-relaxed text-[var(--color-text-secondary)]">
                {msg.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
