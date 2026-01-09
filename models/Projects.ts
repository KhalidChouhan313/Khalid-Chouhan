import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
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
    links: {
      live: {
        type: String,
        required: true,
      },
      github: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

export const SchemaProject =
  models.Project || mongoose.model("Project", ProjectSchema);
