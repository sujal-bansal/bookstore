import Book from "../models/book.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";

export const getReview = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const book = await Book.findById(bookId);

    if (!book) return res.status(404).json({ message: "Book not found" });
    const reviews = await Review.find({ book: bookId })
      .populate("user", "username")
      .sort({ createdAt: -1 });
    if (reviews.length === 0)
      return res.status(404).json({ message: "No Reviews found" });

    res.status(200).json(reviews);
  } catch (error) {
    console.log("Error in getReview controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: bookId } = req.params;
    const { content } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ meesage: "User not found" });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ meesage: "Book not found" });

    if (content.length < 10) {
      return res
        .status(400)
        .json({ message: "Content must be at least 10 characters" });
    }

    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview)
      return res
        .status(400)
        .json({ message: "You have already review this book" });

    const review = new Review({
      user: userId,
      book: bookId,
      content,
    });
    await Book.findByIdAndUpdate(bookId, { $inc: { reviewCount: 1 } });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    console.log("Error in postReview controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
