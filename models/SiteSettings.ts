import mongoose, { Schema, models } from "mongoose";

// singleton document for site-wide content editable from the admin panel
const SiteSettingsSchema = new Schema(
  {
    aboutImage: { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.SiteSettings || mongoose.model("SiteSettings", SiteSettingsSchema);
