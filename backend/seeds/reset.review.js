// This script should be run as a one-time fix to reset all book review counts
// to match the actual number of reviews in the database

import Book from "../models/book.model.js";
import Review from "../models/review.model.js";
import { connectDB } from "../lib/db.js";
import dotenv from dotenv

dotenv.config()

const resetReviewCounts = async () => {
  try {
    await connectDB();
    console.log("Starting review count reset...");

    // Get all books
    const books = await Book.find({});
    console.log(`Found ${books.length} books to process`);

    // Process each book
    for (const book of books) {
      // Count the number of reviews for this book
      const reviewCount = await Review.countDocuments({ book: book._id });

      // Log the current and correct counts
      console.log(`Book: ${book.title} (${book._id})`);
      console.log(
        `Current reviewCount: ${book.reviewCount}, Actual reviews: ${reviewCount}`
      );

      // Update the book with the correct review count
      if (book.reviewCount !== reviewCount) {
        await Book.updateOne(
          { _id: book._id },
          { $set: { reviewCount: reviewCount } }
        );
        console.log(`Updated reviewCount to ${reviewCount}`);
      } else {
        console.log(`No update needed, counts match`);
      }
      console.log("---------------------");
    }

    console.log("Review count reset completed!");
  } catch (error) {
    console.error("Error resetting review counts:", error);
  } finally {
    mongoose.disconnect();
  }
};

resetReviewCounts();
