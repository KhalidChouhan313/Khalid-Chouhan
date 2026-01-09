"use client";

import SectionHeading from "@/components/common/SectionHeading";
import { Button } from "@/components/ui/button";
import { apiWrapper } from "@/lib/api/apiWrapper";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
    },
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate(data);
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 py-20 bg-black">
      <SectionHeading
        isShow={false}
        heading="Contact"
        paragraph="I’m currently available for freelance work."
      />
      <Button
        className="border border-teal bg-[#1e242b] px-10 py-5 text-xl 
          rounded-tl-2xl rounded-br-2xl font-bold text-teal shadow-md
           transition-all duration-300"
      >
        Send me a message{" "}
      </Button>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-[90%] md:w-[50%] lg:w-[40%] mt-10"
      >
        <div className="flex w-full gap-5">
          <label
            htmlFor="Name"
            className="w-full text-teal flex flex-col  mt-5  italic font-bold"
          >
            your Name
            <input
              placeholder="Enter your email"
              className="border-b   outline-none py-2 placeholder:text-gray-400 placeholder:font-mono placeholder:font-medium"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </label>
          <label
            htmlFor="Email"
            className="w-full text-teal flex flex-col  mt-5  italic font-bold"
          >
            Your Email
            <input
              className="border-b   outline-none py-2 placeholder:text-gray-400 placeholder:font-mono placeholder:font-medium"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </label>
        </div>
        <label
          htmlFor="Message"
          className="w-full text-teal flex flex-col  mt-5  italic font-bold"
        >
          Your Message
          <textarea
            maxLength={1000}
            placeholder="Type your message here..."
            className="border-b border-teal py-2  placeholder:mt-5    outline-none 
             placeholder:text-gray-400 placeholder:font-mono placeholder:font-medium"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <span className="text-red-500">Message is required</span>
          )}
        </label>
        <div className="flex items-center justify-center w-full">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-teal flex items-center px-12 py-5 
             rounded-full font-bold cursor-pointer mt-10 hover:translate-0.5 
             text-black shadow-md transition-all ease-in-out duration-300"
          >
            {isPending ? "Sending..." : "Send Message"}{" "}
            <Send size={16} />
          </Button>
        </div>{" "}
        {isSuccess && <p className="text-green-600">{data?.message}</p>}
        {isError && (
          <p className="text-red-600">
            {(error as any)?.message || "Something went wrong"}
          </p>
        )}
      </form>
    </div>
  );
};

export default Contact;
