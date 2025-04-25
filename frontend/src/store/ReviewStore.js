import { create } from "zustand";
import { api } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useReviewStore = create((set, get) => ({
  reviews: [],
  isLoading: false,

  getReview: async (bookId) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/reviews/${bookId}`);
      set({ reviews: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  createReview: async (bookId, data) => {
    const { reviews } = get();
    set({ isLoading: true });
    try {
      const res = await api.post(`/reviews/${bookId}`, data);
      set({ reviews: [...reviews, res.data] });
      toast.success("Review Created Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
