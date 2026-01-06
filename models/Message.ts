import mongoose, { Schema, models } from "mongoose";
const MessageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default models.Message || mongoose.model("Message", MessageSchema);
