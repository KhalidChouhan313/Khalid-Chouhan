"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Instagram, Loader2, RotateCcw, Save } from "lucide-react";
import Image from "next/image";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { toast } from "react-toastify";
import { useSocialLinks } from "@/hooks/useSocialLinks";
import { updateSocialLinks } from "@/lib/api/social";
import { DEFAULT_SOCIAL_LINKS, SOCIAL_KEYS, SOCIAL_LABELS, SocialKey, SocialLinks } from "@/lib/social";
import { cn } from "@/lib/utils/utils";
import { discordLogo, githubLogo, Linkedinlogo, Xlogo } from "@/Utils/BaseUrl";
import {
  cardClass,
  ErrorState,
  Field,
  ghostButtonClass,
  inputClass,
  ListSkeleton,
  primaryButtonClass,
  SectionHeader,
} from "./ui";

const PLACEHOLDERS: Record<SocialKey, string> = {
  github: "https://github.com/username",
  linkedin: "https://www.linkedin.com/in/username",
  twitter: "https://x.com/username",
  discord: "https://discord.com/users/username",
  instagram: "https://www.instagram.com/username",
};

const SocialIcon = ({ name, size = 18 }: { name: SocialKey; size?: number }) => {
  const src = { github: githubLogo, linkedin: Linkedinlogo, discord: discordLogo, twitter: Xlogo }[
    name as Exclude<SocialKey, "instagram">
  ];
  return src ? (
    <Image src={src} alt="" width={size} height={size} className="opacity-80" />
  ) : (
    <Instagram size={size} className="text-white opacity-80" />
  );
};

const SocialLinksForm = ({ initial }: { initial: SocialLinks }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<SocialLinks>({ defaultValues: initial });
  const values = useWatch({ control });

  const saveMutation = useMutation({
    mutationFn: updateSocialLinks,
    onSuccess: (res) => {
      toast.success("Social links saved");
      queryClient.setQueryData(["social"], res.data);
      reset(res.data); // new baseline so "unsaved changes" clears
    },
    onError: (error: Error) => toast.error(error.message || "Failed to save social links"),
  });

  const onSubmit: SubmitHandler<SocialLinks> = (data) => saveMutation.mutate(data);
  const active = SOCIAL_KEYS.filter((k) => values[k]?.trim());

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn(cardClass, "flex flex-col gap-5 p-6 md:p-8")}>
        {SOCIAL_KEYS.map((key) => (
          <Field
            key={key}
            label={SOCIAL_LABELS[key]}
            htmlFor={`social-${key}`}
            error={errors[key]?.message}
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-border-subtle)] bg-bg-surface">
                <SocialIcon name={key} size={14} />
              </span>
              <input
                id={`social-${key}`}
                type="url"
                placeholder={PLACEHOLDERS[key]}
                aria-invalid={!!errors[key]}
                className={cn(inputClass, "pl-13")}
                {...register(key, {
                  pattern: { value: /^https:\/\/\S+$/i, message: "Enter a full URL starting with https://" },
                  maxLength: { value: 300, message: "URL is too long" },
                })}
              />
            </div>
          </Field>
        ))}
        <p className="text-xs text-[var(--color-text-faint)]">Leave a field empty to hide that icon from the footer.</p>

        <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-border-subtle)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => reset(DEFAULT_SOCIAL_LINKS, { keepDefaultValues: true })}
            className={ghostButtonClass}
          >
            <RotateCcw className="h-4 w-4" /> Restore defaults
          </button>
          <div className="flex items-center gap-3">
            {isDirty && <span className="text-xs font-semibold text-[var(--color-accent)]">Unsaved changes</span>}
            <button type="submit" disabled={saveMutation.isPending || !isDirty} className={primaryButtonClass}>
              {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saveMutation.isPending ? "Saving..." : "Save links"}
            </button>
          </div>
        </div>
      </form>

      <aside className={cn(cardClass, "flex h-fit flex-col gap-4 p-6")}>
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Footer preview</span>
        <div className="glass-strong flex items-center justify-center gap-3 rounded-full px-5 py-4">
          {active.length ? (
            active.map((key) => (
              <a
                key={key}
                href={values[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={SOCIAL_LABELS[key]}
                title={SOCIAL_LABELS[key]}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-bg-surface/80 transition-colors hover:border-[var(--color-border-accent)]"
              >
                <SocialIcon name={key} />
              </a>
            ))
          ) : (
            <span className="text-xs text-[var(--color-text-faint)]">No links — icons hidden</span>
          )}
        </div>
        <p className="text-xs leading-relaxed text-[var(--color-text-faint)]">
          This is how the icons will appear in the site footer. Click one to test the link.
        </p>
      </aside>
    </div>
  );
};

export const SocialLinksTab = () => {
  const { data, isPlaceholderData, isError, refetch } = useSocialLinks();

  return (
    <section className="flex flex-col gap-6">
      <SectionHeader eyebrow="Profiles" title="Social Links" />
      {isError ? (
        <ErrorState message="Couldn't load social links." onRetry={() => refetch()} />
      ) : isPlaceholderData || !data ? (
        <ListSkeleton rows={2} />
      ) : (
        // keyed on the saved data so the form re-initialises if it changes elsewhere
        <SocialLinksForm key={JSON.stringify(data)} initial={data} />
      )}
    </section>
  );
};
