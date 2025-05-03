import { create } from "zustand";
import { api } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useReviewStore = create((set, get) => ({
  reviews: [],
  isLoading: false,
  isEnhancing: false,

  getReview: async (bookId) => {
    set({ isLoading: true, reviews: [] });
    try {
      const res = await api.get(`/reviews/${bookId}`);
      set({ reviews: res.data });
      console.log(res.data);
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

  refineReview: async (bookId, data) => {
    set({ isEnhancing: true });
    try {
      const res = await api.post(`/reviews/refine/${bookId}`, data);

      if (res.data.refined) {
        toast.success("Review enhanced successfully");
        return res.data.refined;
      }
      return null;
    } catch (error) {
      toast.error(error.response.data.message);
      return null;
    } finally {
      set({ isEnhancing: false });
    }
  },
}));
