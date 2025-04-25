import Book from "../models/book.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, featured } = req.query;

    const query = featured ? { featured: featured === "true" } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const books = await Book.find(query).skip(skip).limit(Number(limit));
    const total = await Book.countDocuments(query);

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json({
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
      books,
    });
  } catch (error) {
    console.log("Error in getAllBooks controller", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "No book found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log("Error in getAllBooks controller", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const postBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      coverImage,
      genre,
      publicationYear,
      publisher,
      featured,
    } = req.body;

    const newBook = new Book({
      title,
      author,
      description,
      coverImage,
      genre,
      publicationYear,
      publisher,
      featured,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error in postBook controller", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};
