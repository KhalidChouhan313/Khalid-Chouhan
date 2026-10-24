"use client";

import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { adminLogin } from "@/lib/api/admin";
import { Field, inputClass, primaryButtonClass } from "./ui";

interface LoginFormValues {
  password: string;
}

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ password }: LoginFormValues) => adminLogin(password),
    onSuccess: onLogin,
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => mutate(data);

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="glass-strong flex flex-col gap-6 rounded-2xl p-8 shadow-xl md:p-10"
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-border-accent)] bg-[var(--color-accent-glow)] text-[var(--color-accent)]">
              <LockKeyhole className="h-6 w-6" />
            </div>
            <span className="rounded-full border border-[var(--color-border-accent)] bg-[var(--color-accent-glow)] px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
              Admin Access
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl font-black tracking-tight text-white">Welcome back</h1>
              <p className="text-sm text-[var(--color-text-muted)]">
                Enter your password to manage projects, blogs and messages.
              </p>
            </div>
          </div>

          <Field label="Password" htmlFor="admin-password" error={errors.password?.message}>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                autoFocus
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                className={`${inputClass} pr-12`}
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[var(--color-text-faint)] transition-colors hover:text-[var(--color-accent)] cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </Field>

          {error && (
            <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
              {error.message}
            </p>
          )}

          <button type="submit" disabled={isPending} className={`${primaryButtonClass} w-full py-3.5`}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <LockKeyhole className="h-4 w-4" />}
            {isPending ? "Signing in..." : "Sign in"}
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>
        </form>
      </motion.div>
    </main>
  );
};
