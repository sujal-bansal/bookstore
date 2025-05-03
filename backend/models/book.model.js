import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    genre: {
      type: [String],
      required: true,
    },
    publicationYear: {
      type: Number,
    },
    publisher: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.index({ title: "text", author: "text", description: "text" });

const Book = mongoose.model("Book", bookSchema);
export default Book;
