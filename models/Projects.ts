import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    slug: { type: String, unique: true, sparse: true, trim: true },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    links: {
      live: {
        type: String,
        required: true,
      },
      github: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

export const SchemaProject =
  models.Project || mongoose.model("Project", ProjectSchema);
