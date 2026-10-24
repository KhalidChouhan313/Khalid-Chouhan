"use client";

import { ImagePlus, Loader2, Trash2, X } from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect, useId, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils/utils";


export const inputClass =
  "w-full rounded-xl bg-[var(--color-bg-surface)]/60 border border-[var(--color-border)] px-4 py-3 text-sm text-white font-medium placeholder:text-[var(--color-text-faint)] outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-glow)] aria-[invalid=true]:border-red-500/70";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-bold text-[#0f0c09] shadow-md transition-colors hover:bg-[var(--color-accent-dim)] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";

export const ghostButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-white disabled:opacity-50 cursor-pointer";

export const iconButtonClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-border-accent)] hover:text-[var(--color-accent)] disabled:opacity-50 cursor-pointer";

export const cardClass =
  "rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]/60 backdrop-blur-sm";

export const tagClass =
  "text-xs font-semibold px-3 py-1 rounded-full bg-bg-surface border border-[var(--color-border-subtle)] text-[var(--color-text-muted)]";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; 

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export const Field = ({ label, htmlFor, error, hint, children }: FieldProps) => (
  <div className="flex flex-col gap-2">
    <label
      htmlFor={htmlFor}
      className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]"
    >
      {label}
    </label>
    {children}
    {error ? (
      <p role="alert" className="text-xs font-medium text-red-400">{error}</p>
    ) : (
      hint && <p className="text-xs text-[var(--color-text-faint)]">{hint}</p>
    )}
  </div>
);

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  action?: ReactNode;
}

export const SectionHeader = ({ eyebrow, title, action }: SectionHeaderProps) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
        {eyebrow}
      </span>
      <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">{title}</h2>
    </div>
    {action}
  </div>
);

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  text: string;
}

export const EmptyState = ({ icon, title, text }: EmptyStateProps) => (
  <div className={cn(cardClass, "flex flex-col items-center gap-3 border-dashed px-6 py-16 text-center")}>
    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border-accent)] bg-[var(--color-accent-glow)] text-[var(--color-accent)]">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-white">{title}</h3>
    <p className="max-w-sm text-sm text-[var(--color-text-muted)]">{text}</p>
  </div>
);

export const ListSkeleton = ({ rows = 3 }: { rows?: number }) => (
  <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading">
    {Array.from({ length: rows }, (_, i) => (
      <div key={i} className="skeleton h-24 rounded-2xl" />
    ))}
  </div>
);

export const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <div className={cn(cardClass, "flex flex-col items-center gap-4 px-6 py-12 text-center")}>
    <p className="text-sm text-red-400">{message}</p>
    <button type="button" onClick={onRetry} className={ghostButtonClass}>
      Try again
    </button>
  </div>
);

interface ConfirmDeleteButtonProps {
  onConfirm: () => void;
  pending?: boolean;
  label: string;
}

export const ConfirmDeleteButton = ({ onConfirm, pending, label }: ConfirmDeleteButtonProps) => {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const timer = setTimeout(() => setArmed(false), 3000);
    return () => clearTimeout(timer);
  }, [armed]);

  if (pending) {
    return (
      <span className={iconButtonClass} aria-label="Deleting">
        <Loader2 className="h-4 w-4 animate-spin" />
      </span>
    );
  }

  return armed ? (
    <button
      type="button"
      onClick={() => {
        setArmed(false);
        onConfirm();
      }}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-red-500/50 bg-red-500/10 px-3 text-xs font-bold text-red-400 transition-colors hover:bg-red-500/20 cursor-pointer"
    >
      <Trash2 className="h-3.5 w-3.5" /> Confirm
    </button>
  ) : (
    <button
      type="button"
      onClick={() => setArmed(true)}
      aria-label={label}
      title={label}
      className={cn(iconButtonClass, "hover:border-red-500/50 hover:text-red-400")}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
};

export const acceptImages = (files: FileList | null): File[] => {
  const accepted: File[] = [];
  for (const file of Array.from(files ?? [])) {
    if (!file.type.startsWith("image/")) {
      toast.error(`${file.name} is not an image`);
    } else if (file.size > MAX_IMAGE_BYTES) {
      toast.error(`${file.name} is larger than 5MB`);
    } else {
      accepted.push(file);
    }
  }
  return accepted;
};

interface ImageDropzoneProps {
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  invalid?: boolean;
}

export const ImageDropzone = ({ multiple, onFiles, invalid }: ImageDropzoneProps) => {
  const id = useId();
  const [dragging, setDragging] = useState(false);

  return (
    <label
      htmlFor={id}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        onFiles(acceptImages(e.dataTransfer.files));
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition-colors",
        dragging
          ? "border-[var(--color-accent)] bg-[var(--color-accent-glow)]"
          : invalid
            ? "border-red-500/70"
            : "border-[var(--color-border-strong)] hover:border-[var(--color-border-accent)]",
      )}
    >
      <ImagePlus className="h-6 w-6 text-[var(--color-accent)]" />
      <span className="text-sm font-semibold text-white">
        Drop {multiple ? "images" : "an image"} here or <span className="text-[var(--color-accent)]">browse</span>
      </span>
      <span className="text-xs text-[var(--color-text-faint)]">PNG, JPG or WEBP · max 5MB{multiple ? " each" : ""}</span>
      <input
        id={id}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="sr-only"
        onChange={(e) => {
          onFiles(acceptImages(e.target.files));
          e.target.value = ""; // allow re-picking the same file
        }}
      />
    </label>
  );
};

export const useObjectUrls = (files: File[]) => {
  const urls = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);
  useEffect(() => () => urls.forEach((u) => URL.revokeObjectURL(u)), [urls]);
  return urls;
};

interface ThumbProps {
  src: string;
  alt: string;
  onRemove?: () => void;
  badge?: string;
}

export const Thumb = ({ src, alt, onRemove, badge }: ThumbProps) => (
  <div className="group relative h-24 w-32 overflow-hidden rounded-xl border border-[var(--color-border-subtle)] bg-bg-surface">
    <Image src={src} alt={alt} fill unoptimized className="object-cover" />
    {badge && (
      <span className="absolute left-1.5 top-1.5 rounded-full bg-[#0f0c09]/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
        {badge}
      </span>
    )}
    {onRemove && (
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${alt}`}
        className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0f0c09]/80 text-white transition-colors hover:text-red-400 cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    )}
  </div>
);
