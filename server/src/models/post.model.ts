import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String, //cloudinary URL
      required: true,
    },
    thumbNail: {
      type: String, //cloudinary URL
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String, //cloudinary URL
      required: true,
    },
    title: {
      type: String, //cloudinary URL
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
postSchema.plugin(mongooseAggregatePaginate);

export const User = mongoose.model("PostSchema", postSchema);
