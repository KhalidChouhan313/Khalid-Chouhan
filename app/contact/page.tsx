"use client";

import SectionHeading from "@/components/common/SectionHeading";
import { apiWrapper } from "@/helper/apiWrapper";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate, data, error, isSuccess, isError, isPending } = useMutation({
    mutationFn: (data: FormValues) =>
      apiWrapper<{ success: boolean; message: string }>({
        endpoint: "/api/contact",
        method: "POST",
        payload: data,
        isPublic: true,
      }),
    onSuccess: (data) => {
      toast.success("Message sent successfully!");
      reset();
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Failed to send message.");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate(data);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-20 bg-bg-base transition-colors duration-300">
      <div className="lg:w-[50%] px-6">
        <SectionHeading
          isShow={false}
          heading="Contact"
          paragraph="Have a project in mind or want to collaborate? Feel free to reach out."
        />
      </div>

      <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-accent)] bg-[var(--color-accent-glow)] px-3.5 py-1.5 rounded-full border border-[var(--color-border-accent)] mt-2 select-none">
        Get in touch
      </span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-[90%] md:w-[60%] lg:w-[45%] mt-8 bg-bg-elevated/20 glass border border-[var(--color-border)] rounded-2xl p-8 md:p-10 shadow-xl"
      >
        <div className="flex md:flex-row flex-col lg:w-full w-auto gap-6">
          <label
            htmlFor="Name"
            className="lg:w-full w-auto text-[var(--color-text-secondary)] flex flex-col gap-2 text-sm font-semibold"
          >
            Your Name
            <input
              id="Name"
              placeholder="Enter your name"
              className="bg-transparent border-b border-[var(--color-border)] outline-none py-2.5 text-white placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)] transition-colors font-sans font-medium"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-xs font-medium mt-1">Name is required</span>
            )}
          </label>
          <label
            htmlFor="Email"
            className="lg:w-full w-auto text-[var(--color-text-secondary)] flex flex-col gap-2 text-sm font-semibold"
          >
            Your Email
            <input
              id="Email"
              type="email"
              className="bg-transparent border-b border-[var(--color-border)] outline-none py-2.5 text-white placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)] transition-colors font-sans font-medium"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs font-medium mt-1">Email is required</span>
            )}
          </label>
        </div>
        <label
          htmlFor="Message"
          className="lg:w-full text-[var(--color-text-secondary)] flex flex-col gap-2 text-sm font-semibold mt-2"
        >
          Your Message
          <textarea
            id="Message"
            maxLength={1000}
            rows={4}
            placeholder="Type your message here..."
            className="bg-transparent border-b border-[var(--color-border)] outline-none py-2.5 text-white placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)] transition-colors font-sans font-medium resize-none"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="text-red-500 text-xs font-medium mt-1">Message is required</span>
          )}
        </label>
        
        <div className="flex items-center justify-center w-full mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isPending}
            className="bg-[var(--color-accent)] text-[#0f0c09] flex items-center justify-center gap-2.5 px-10 py-3.5 rounded-full font-bold cursor-pointer hover:bg-[var(--color-accent-dim)] shadow-md transition-colors duration-300 disabled:opacity-50 text-sm"
          >
            <span>{isPending ? "Sending..." : "Send Message"}</span>
            <Send size={15} className="stroke-[2.5]" />
          </motion.button>
        </div>

        {isSuccess && (
          <p className="text-emerald-400 text-center text-sm font-medium mt-2">
            {data?.message}
          </p>
        )}
        {isError && (
          <p className="text-red-400 text-center text-sm font-medium mt-2">
            {(error as any)?.message || "Something went wrong. Please try again."}
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;
