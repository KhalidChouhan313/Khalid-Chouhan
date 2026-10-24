import mongoose, { Schema, models } from "mongoose";

const SocialLinksSchema = new Schema(
  {
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    discord: { type: String, default: "" },
    instagram: { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.SocialLinks || mongoose.model("SocialLinks", SocialLinksSchema);
