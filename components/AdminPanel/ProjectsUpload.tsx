"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Briefcase, ExternalLink, Github, Loader2, Pencil, Plus, Save, X } from "lucide-react";
import Image from "next/image";
import { KeyboardEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useProjects } from "@/hooks/project";
import { createProject, deleteProjectById, updateProject, uploadImage } from "@/lib/api/project";
import { ProjectFormValues, ProjectsUploadProps } from "@/lib/types/Admin";
import { Project } from "@/lib/types/projects";
import { cn } from "@/lib/utils/utils";
import {
  cardClass,
  ConfirmDeleteButton,
  EmptyState,
  ErrorState,
  Field,
  ghostButtonClass,
  iconButtonClass,
  ImageDropzone,
  inputClass,
  ListSkeleton,
  primaryButtonClass,
  SectionHeader,
  tagClass,
  Thumb,
  useObjectUrls,
} from "./ui";

const URL_PATTERN = { value: /^https?:\/\/\S+$/i, message: "Enter a full URL starting with http(s)://" };

interface ProjectFormProps {
  project: Project | null;
  onDone: () => void;
}

const ProjectForm = ({ project, onDone }: ProjectFormProps) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      link: project?.links?.live ?? "",
      github: project?.links?.github ?? "",
    },
  });
  const [technologies, setTechnologies] = useState<string[]>(project?.technologies ?? []);
  const [techInput, setTechInput] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>(project?.images ?? []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string>();
  const previews = useObjectUrls(newFiles);

  const addTech = () => {
    const names = techInput.split(",").map((t) => t.trim()).filter(Boolean);
    setTechnologies((prev) => [...prev, ...names.filter((n) => !prev.includes(n))]);
    setTechInput("");
  };
  const onTechKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTech();
    } else if (e.key === "Backspace" && !techInput && technologies.length) {
      setTechnologies((prev) => prev.slice(0, -1));
    }
  };

  const saveMutation = useMutation({
    mutationFn: async (values: ProjectFormValues) => {
      const uploaded = await Promise.all(newFiles.map((file) => uploadImage(file)));
      const payload = {
        title: values.title.trim(),
        description: values.description.trim(),
        images: [...existingImages, ...uploaded.map((u) => u.url)],
        technologies,
        links: { live: values.link.trim(), github: values.github.trim() },
      };
      return project ? updateProject(project._id, payload) : createProject(payload);
    },
    onSuccess: () => {
      toast.success(project ? "Project updated" : "Project created");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (project) queryClient.invalidateQueries({ queryKey: ["project", project._id] });
      onDone();
    },
    onError: (error: Error) => toast.error(error.message || "Failed to save project"),
  });

  const onSubmit: SubmitHandler<ProjectFormValues> = (values) => {
    if (existingImages.length + newFiles.length === 0) {
      setImageError("Add at least one image");
      return;
    }
    if (techInput.trim()) addTech();
    saveMutation.mutate(values);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(cardClass, "flex flex-col gap-6 p-6 md:p-8")}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">{project ? "Edit project" : "New project"}</h3>
        <button type="button" onClick={onDone} aria-label="Close form" className={iconButtonClass}>
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Title" htmlFor="project-title" error={errors.title?.message}>
          <input
            id="project-title"
            placeholder="e.g. Asani Bond Checker"
            aria-invalid={!!errors.title}
            className={inputClass}
            {...register("title", {
              required: "Title is required",
              maxLength: { value: 120, message: "Keep it under 120 characters" },
            })}
          />
        </Field>

        <Field
          label="Technologies"
          htmlFor="project-tech"
          hint="Press Enter or comma to add. Backspace removes the last one."
        >
          <div className="flex min-h-[46px] flex-wrap items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)]/60 px-3 py-2 focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[var(--color-accent-glow)]">
            {technologies.map((tech) => (
              <span key={tech} className={cn(tagClass, "inline-flex items-center gap-1 text-[var(--color-accent)]")}>
                {tech}
                <button
                  type="button"
                  aria-label={`Remove ${tech}`}
                  onClick={() => setTechnologies((prev) => prev.filter((t) => t !== tech))}
                  className="hover:text-red-400 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              id="project-tech"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={onTechKeyDown}
              onBlur={() => techInput.trim() && addTech()}
              placeholder={technologies.length ? "" : "Next.js, MongoDB..."}
              className="min-w-[120px] flex-1 bg-transparent py-1 text-sm text-white outline-none placeholder:text-[var(--color-text-faint)]"
            />
          </div>
        </Field>
      </div>

      <Field label="Description" htmlFor="project-description" error={errors.description?.message}>
        <textarea
          id="project-description"
          rows={5}
          placeholder="What does it do, what was your role, what was hard?"
          aria-invalid={!!errors.description}
          className={cn(inputClass, "resize-y")}
          {...register("description", { required: "Description is required" })}
        />
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Live URL" htmlFor="project-live" error={errors.link?.message}>
          <input
            id="project-live"
            type="url"
            placeholder="https://example.com"
            aria-invalid={!!errors.link}
            className={inputClass}
            {...register("link", { required: "Live URL is required", pattern: URL_PATTERN })}
          />
        </Field>
        <Field label="GitHub URL" htmlFor="project-github" error={errors.github?.message}>
          <input
            id="project-github"
            type="url"
            placeholder="https://github.com/..."
            aria-invalid={!!errors.github}
            className={inputClass}
            {...register("github", { required: "GitHub URL is required", pattern: URL_PATTERN })}
          />
        </Field>
      </div>

      <Field label="Images" htmlFor="project-images" error={imageError} hint="The first image is used as the cover.">
        <div className="flex flex-col gap-4">
          {(existingImages.length > 0 || newFiles.length > 0) && (
            <div className="flex flex-wrap gap-3">
              {existingImages.map((src, i) => (
                <Thumb
                  key={src}
                  src={src}
                  alt={`Project image ${i + 1}`}
                  badge={i === 0 ? "Cover" : undefined}
                  onRemove={() => setExistingImages((prev) => prev.filter((s) => s !== src))}
                />
              ))}
              {previews.map((src, i) => (
                <Thumb
                  key={src}
                  src={src}
                  alt={newFiles[i]?.name ?? "New image"}
                  badge={existingImages.length === 0 && i === 0 ? "Cover" : "New"}
                  onRemove={() => setNewFiles((prev) => prev.filter((_, idx) => idx !== i))}
                />
              ))}
            </div>
          )}
          <ImageDropzone
            multiple
            invalid={!!imageError}
            onFiles={(files) => {
              if (files.length) setImageError(undefined);
              setNewFiles((prev) => [...prev, ...files]);
            }}
          />
        </div>
      </Field>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onDone} className={ghostButtonClass}>
          Cancel
        </button>
        <button type="submit" disabled={saveMutation.isPending} className={primaryButtonClass}>
          {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saveMutation.isPending
            ? newFiles.length
              ? "Uploading..."
              : "Saving..."
            : project
              ? "Save changes"
              : "Create project"}
        </button>
      </div>
    </motion.form>
  );
};

const ProjectsUpload = ({
  editingProject,
  setEditingProject,
  showProjectForm,
  setShowProjectForm,
}: ProjectsUploadProps) => {
  const queryClient = useQueryClient();
  const { data: projects = [], isLoading, isError, refetch } = useProjects();

  const deleteMutation = useMutation({
    mutationFn: deleteProjectById,
    onSuccess: () => {
      toast.success("Project deleted");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error: Error) => toast.error(error.message || "Failed to delete project"),
  });

  const openForm = (project: Project | null) => {
    setEditingProject(project);
    setShowProjectForm(true);
  };
  const closeForm = () => {
    setEditingProject(null);
    setShowProjectForm(false);
  };

  return (
    <section className="flex flex-col gap-6">
      <SectionHeader
        eyebrow="Portfolio"
        title="Projects"
        action={
          !showProjectForm && (
            <button type="button" onClick={() => openForm(null)} className={primaryButtonClass}>
              <Plus className="h-4 w-4" /> Add project
            </button>
          )
        }
      />

      {showProjectForm && (
        // key remounts the form so its fields reset when switching between projects
        <ProjectForm key={editingProject?._id ?? "new"} project={editingProject} onDone={closeForm} />
      )}

      {isLoading ? (
        <ListSkeleton />
      ) : isError ? (
        <ErrorState message="Couldn't load projects." onRetry={() => refetch()} />
      ) : projects.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-6 w-6" />}
          title="No projects yet"
          text="Add your first project and it will appear on the Projects page."
        />
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <li
              key={project._id}
              className={cn(
                cardClass,
                "group flex flex-col overflow-hidden transition-colors hover:border-[var(--color-border-accent)]",
                editingProject?._id === project._id && "border-[var(--color-accent)]",
              )}
            >
              <div className="relative h-40 w-full overflow-hidden border-b border-[var(--color-border-subtle)] bg-bg-surface">
                {project.images?.[0] && (
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute bottom-2 right-2 rounded-full bg-[#0f0c09]/80 px-2 py-0.5 text-[10px] font-bold text-[var(--color-text-muted)]">
                  {project.images?.length ?? 0} image{project.images?.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-bold text-white transition-colors group-hover:text-[var(--color-accent)]">
                  {project.title}
                </h3>
                <p className="line-clamp-2 text-sm text-[var(--color-text-muted)]">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies?.slice(0, 5).map((tech) => (
                    <span key={tech} className={tagClass}>{tech}</span>
                  ))}
                  {(project.technologies?.length ?? 0) > 5 && (
                    <span className={tagClass}>+{project.technologies.length - 5}</span>
                  )}
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex gap-2">
                    <a href={project.links?.live} target="_blank" rel="noopener noreferrer" aria-label="Open live site" title="Live site" className={iconButtonClass}>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a href={project.links?.github} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub repo" title="GitHub" className={iconButtonClass}>
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        openForm(project);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      aria-label={`Edit ${project.title}`}
                      title="Edit"
                      className={iconButtonClass}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <ConfirmDeleteButton
                      label={`Delete ${project.title}`}
                      pending={deleteMutation.isPending && deleteMutation.variables === project._id}
                      onConfirm={() => {
                        if (editingProject?._id === project._id) closeForm();
                        deleteMutation.mutate(project._id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectsUpload;
