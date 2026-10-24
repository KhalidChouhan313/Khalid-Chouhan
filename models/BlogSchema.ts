import mongoose, { Schema, models } from "mongoose";

const BlogSchema = new Schema(
  {
    slug: { type: String, unique: true, sparse: true, trim: true },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      maxlength: 10000
    },

    image: {
      type: String,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },
    readTime: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default models.Blog || mongoose.model("Blog", BlogSchema);
