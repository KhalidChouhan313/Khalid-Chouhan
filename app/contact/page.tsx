"use client";

import SectionHeading from "@/components/common/SectionHeading";
import { apiWrapper } from "@/helper/apiWrapper";
import { useSocialLinks } from "@/hooks/useSocialLinks";
import { DEFAULT_SOCIAL_LINKS, SOCIAL_KEYS, SOCIAL_LABELS } from "@/lib/social";
import { fadeUp, viewportOnce } from "@/lib/motion-variants";
import { cn } from "@/lib/utils/utils";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, Clock, Copy, Globe2, Loader2, Mail, MapPin, Send } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const EMAIL = "khalidchuhan7886@gmail.com";

const INFO = [
  { icon: <MapPin size={18} />, label: "Location", value: "Pakistan · Remote worldwide" },
  { icon: <Clock size={18} />, label: "Response time", value: "Usually within 24 hours" },
  { icon: <Globe2 size={18} />, label: "Open to", value: "Full-time, contract & freelance" },
];

const fieldClass = (invalid: boolean) =>
  cn(
    "w-full rounded-2xl border bg-[#0f0c09]/60 px-4 py-3.5 text-sm text-white placeholder:text-[var(--color-text-faint)] transition-colors focus:outline-none",
    invalid ? "border-red-500/70" : "border-[var(--color-border)] focus:border-[var(--color-accent)]",
  );

const Contact = () => {
  const { data: links = DEFAULT_SOCIAL_LINKS } = useSocialLinks();
  const socials = SOCIAL_KEYS.filter((k) => links[k]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (data: FormValues) =>
      apiWrapper<{ success: boolean; message: string }>({
        endpoint: "/api/contact",
        method: "POST",
        payload: data,
      }),
    onSuccess: () => {
      toast.success("Message sent successfully!");
      reset();
    },
    onError: (error: Error) => toast.error(error.message || "Failed to send message."),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => mutate(data);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    toast.success("Email copied to clipboard");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-24 flex flex-col items-center gap-12">
      <SectionHeading
        heading="Contact"
        title="Have a project in mind? Let's build it together."
        paragraph="Tell me a little about what you're working on — I'll get back to you as soon as possible."
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid w-full gap-6 lg:grid-cols-[0.85fr_1.15fr]"
      >
        <aside className="border-gradient glass relative flex flex-col gap-8 overflow-hidden rounded-3xl p-6 sm:p-8">
          <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[var(--color-accent)]/15 blur-3xl" />

          <div className="relative flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Available for new projects
            </span>
            <h3 className="text-2xl font-bold text-white">Let&apos;s talk</h3>
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              Prefer email? Reach me directly — I read every message.
            </p>
          </div>

          <div className="relative flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[#0f0c09]/50 p-3 pl-4">
            <Mail size={18} className="shrink-0 text-[var(--color-accent)]" />
            <a href={`mailto:${EMAIL}`} className="min-w-0 flex-1 truncate text-sm font-medium text-white hover:text-[var(--color-accent)]">
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <Copy size={15} />
            </button>
          </div>

          <ul className="relative flex flex-col gap-4">
            {INFO.map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border-accent)] bg-[var(--color-accent-glow)] text-[var(--color-accent)]">
                  {item.icon}
                </span>
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-[var(--color-text-faint)]">{item.label}</span>
                  <span className="text-sm font-semibold text-white">{item.value}</span>
                </span>
              </li>
            ))}
          </ul>

          {socials.length > 0 && (
            <div className="relative mt-auto flex flex-wrap gap-2 border-t border-[var(--color-border-subtle)] pt-6">
              {socials.map((key) => (
                <a
                  key={key}
                  href={links[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                >
                  {SOCIAL_LABELS[key]}
                </a>
              ))}
            </div>
          )}
        </aside>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="border-gradient glass flex flex-col gap-5 rounded-3xl p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="text-sm font-semibold text-[var(--color-text-secondary)]">
                Your name
              </label>
              <input
                id="contact-name"
                autoComplete="name"
                placeholder="John Doe"
                aria-invalid={!!errors.name}
                className={fieldClass(!!errors.name)}
                {...register("name", {
                  required: "Name is required",
                  maxLength: { value: 100, message: "Name is too long" },
                })}
              />
              {errors.name && <span className="text-xs font-medium text-red-400">{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="text-sm font-semibold text-[var(--color-text-secondary)]">
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="john@company.com"
                aria-invalid={!!errors.email}
                className={fieldClass(!!errors.email)}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
                })}
              />
              {errors.email && <span className="text-xs font-medium text-red-400">{errors.email.message}</span>}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <label htmlFor="contact-message" className="text-sm font-semibold text-[var(--color-text-secondary)]">
              Project details
            </label>
            <textarea
              id="contact-message"
              maxLength={1000}
              rows={6}
              placeholder="Tell me about your project, timeline and goals..."
              aria-invalid={!!errors.message}
              className={cn(fieldClass(!!errors.message), "min-h-[160px] flex-1 resize-none")}
              {...register("message", {
                required: "Message is required",
                minLength: { value: 10, message: "Please write at least 10 characters" },
              })}
            />
            {errors.message && <span className="text-xs font-medium text-red-400">{errors.message.message}</span>}
          </div>

          <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
            {isSuccess ? (
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                <CheckCircle2 size={16} /> Thanks! I&apos;ll be in touch soon.
              </p>
            ) : (
              <p className="text-xs text-[var(--color-text-faint)]">Your details are never shared.</p>
            )}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isPending}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[var(--color-accent)] px-8 py-3.5 text-sm font-bold text-[#0f0c09] shadow-[0_10px_30px_-10px_var(--color-accent)] transition-colors hover:bg-white disabled:opacity-60 sm:w-auto cursor-pointer"
            >
              {isPending ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
              {isPending ? "Sending..." : "Send message"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
