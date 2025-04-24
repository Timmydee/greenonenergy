import mongoose, { Schema, models, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "Admin",
    },
    imageUrl: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default models.Post || model("Post", PostSchema);
