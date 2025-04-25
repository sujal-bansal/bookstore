import { create } from "zustand";
import { api } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useBookStore = create((set, get) => ({
  books: [],
  filteredBooks: [],
  featuredBooks: [],
  isLoading: false,
  currentPage: 1,
  totalPages: 1,
  limit: 10,
  filters: {
    genre: "",
    year: "",
    searchTerm: "",
  },

  getAllBooks: async (page = 1, limit = 10) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/books?page=${page}&limit=${limit}`);
      const booksData = res.data;

      set({
        books: booksData,
        filteredBooks: booksData,
        currentPage: booksData.page || 1,
        totalPages: booksData.totalPages || 1,
        limit: booksData.limit || 10,
      });
      get().applyFilters();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  setPage: (page) => {
    set({ currentPage: page });
    get().getAllBooks(page, get().limit);
  },

  setFilter: (filterType, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterType]: value,
      },
    }));
    get().applyFilters();
  },

  applyFilters: () => {
    const { books, filters } = get();
    const allBooks = books.books || [];

    if (!allBooks.length) return;

    let filtered = [...allBooks];

    if (filters.genre) {
      filtered = filtered.filter(
        (book) =>
          book.genre && book.genre.toLowerCase() === filters.genre.toLowerCase()
      );
    }

    if (filters.year) {
      filtered = filtered.filter(
        (book) =>
          book.publicationYear &&
          book.publicationYear.toString() === filters.year
      );
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          (book.title && book.title.toLowerCase().includes(term)) ||
          (book.author && book.author.toLowerCase().includes(term)) ||
          (book.description && book.description.toLowerCase().includes(term))
      );
    }

    set((state) => ({
      ...state,
      filteredBooks: {
        ...books,
        books: filtered,
      },
    }));
  },

  resetFilters: () => {
    set((state) => ({
      filters: {
        genre: "",
        year: "",
        searchTerm: "",
      },
      filteredBooks: state.books,
    }));
  },

  getFeaturedBooks: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/books?featured=true&limit=6`);
      set({ featuredBooks: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getSingleBook: async (bookId) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/books/${bookId}`);
      set({ books: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  postBook: async (data) => {
    set({ isLoading: true });
    try {
      const res = await api.post("/books", data);
      set((state) => ({ books: [...state.books, res.data] }));
      toast.success("Book added successfully");
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
