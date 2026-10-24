"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, RotateCcw, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { uploadImage } from "@/lib/api/project";
import { updateSiteSettings } from "@/lib/api/settings";
import { DEFAULT_ABOUT_IMAGE, SiteSettings } from "@/lib/settings";
import { cn } from "@/lib/utils/utils";
import {
  cardClass,
  ErrorState,
  Field,
  ghostButtonClass,
  ImageDropzone,
  ListSkeleton,
  primaryButtonClass,
  SectionHeader,
  useObjectUrls,
} from "./ui";

const AboutImageForm = ({ initial }: { initial: SiteSettings }) => {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [preview] = useObjectUrls(file ? [file] : []);
  const current = initial.aboutImage || DEFAULT_ABOUT_IMAGE;

  const saveMutation = useMutation({
    // null = reset to the bundled default image
    mutationFn: async (next: File | null) =>
      updateSiteSettings({ aboutImage: next ? (await uploadImage(next)).url : "" }),
    onSuccess: (res) => {
      toast.success("About image updated");
      queryClient.setQueryData(["settings"], res.data);
      setFile(null);
    },
    onError: (error: Error) => toast.error(error.message || "Failed to update image"),
  });

  return (
    <div className={cn(cardClass, "grid gap-6 p-6 md:grid-cols-[240px_1fr] md:p-8")}>
      <div className="relative aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-xl border border-[var(--color-border-subtle)] bg-bg-surface">
        <Image src={preview ?? current} alt="About section image" fill unoptimized className="object-cover" />
        {preview && (
          <span className="absolute left-2 top-2 rounded-full bg-[#0f0c09]/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
            Preview
          </span>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <Field label="About section image" htmlFor="about-image" hint="Portrait 4:5 (e.g. 1080×1350), max 5MB.">
          <ImageDropzone onFiles={([f]) => f && setFile(f)} />
        </Field>

        <div className="mt-auto flex flex-col-reverse gap-3 border-t border-[var(--color-border-subtle)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => (file ? setFile(null) : saveMutation.mutate(null))}
            disabled={saveMutation.isPending || (!file && !initial.aboutImage)}
            className={ghostButtonClass}
          >
            <RotateCcw className="h-4 w-4" /> {file ? "Discard" : "Restore default"}
          </button>
          <button
            type="button"
            onClick={() => saveMutation.mutate(file)}
            disabled={saveMutation.isPending || !file}
            className={primaryButtonClass}
          >
            {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saveMutation.isPending ? "Uploading..." : "Save image"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const SettingsTab = () => {
  const { data, isPlaceholderData, isError, refetch } = useSiteSettings();

  return (
    <section className="flex flex-col gap-6">
      <SectionHeader eyebrow="Site" title="Profile Settings" />
      {isError ? (
        <ErrorState message="Couldn't load settings." onRetry={() => refetch()} />
      ) : isPlaceholderData || !data ? (
        <ListSkeleton rows={1} />
      ) : (
        <AboutImageForm key={data.aboutImage} initial={data} />
      )}
    </section>
  );
};
