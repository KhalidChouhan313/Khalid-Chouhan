"use client";

import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject, uploadImage } from "@/lib/api/project";
import {
  Project,
  ProjectFormValues,
  ProjectsUploadProps,
} from "@/lib/types/Admin";
import { useState } from "react";
import { toast } from "react-toastify";

const ProjectsUpload = ({
  setEditingProject,
  setShowProjectForm,
  editingProject,
  showProjectForm,
  projects,
}: ProjectsUploadProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>();

  const queryClient = useQueryClient();
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);

  const createMutation = useMutation({
    mutationFn: async (data: ProjectFormValues) => {
      const imageUrls: string[] = [];

      for (let i = 0; i < data.images.length; i++) {
        const res = await uploadImage(data.images[i]);
        imageUrls.push(res.url);
      }

      const payload = {
        title: data.title,
        description: data.description,
        images: imageUrls,
        technologies,
        links: {
          live: data.link,
          github: data.github,
        },
      };
      toast.success("Project Created Succesfully");
      return createProject(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    await createMutation.mutateAsync(data);

    reset();
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setShowProjectForm(true);
    reset({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      link: project.link,
      github: project.github,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <button
          onClick={() => {
            setShowProjectForm(true);
            setEditingProject(null);
            reset();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      {showProjectForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="text-white p-6 rounded-lg border-2 border-blue-200 space-y-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {editingProject ? "Edit Project" : "New Project"}
            </h3>
            <button
              type="button"
              onClick={() => {
                setShowProjectForm(false);
                setEditingProject(null);
                reset();
              }}
              className="text-gray-500 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Project Images
            </label>
            <input
              type="file"
              multiple
              {...register("images", { required: "images required hai" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Project images"
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {errors.images.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Project Title
            </label>
            <input
              {...register("title", { required: "Title required hai" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Project ka naam"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description required hai",
              })}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Project ki details"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Technologies
            </label>

            <div className="flex flex-wrap gap-2 mb-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="bg-teal text-white font-black  px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() =>
                      setTechnologies(
                        technologies.filter((_, i) => i !== index)
                      )
                    }
                    className="text-white cursor-pointer hover:text-red-300"
                  >
                    <X />
                  </button>
                </span>
              ))}
            </div>

            <input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!techInput.trim()) return;
                  if (technologies.includes(techInput.trim())) return;

                  setTechnologies([...technologies, techInput.trim()]);
                  setTechInput("");
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Type technology and press Enter"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Project Link
            </label>
            <input
              {...register("link")}
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              GitHub Link
            </label>
            <input
              {...register("github")}
              type="url"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://github.com/..."
            />
          </div>

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full bg-teal text-white font-black py-2 rounded-lg flex 
            cursor-pointer items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {createMutation.isPending ? "Loading..." : "Add Project"}
          </button>
        </form>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {project.title}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(project)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  //   onClick={() => deleteProject(project.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">{project.description}</p>
            <p className="text-xs text-gray-500 mb-2">
              <strong>Tech:</strong> {project.technologies}
            </p>
            <div className="flex gap-3 text-sm">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsUpload;
