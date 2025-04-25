import { create } from "zustand";
import { api } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  isLoading: false,

  getProfile: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/users/profile");
      set({ user: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  getUserProfile: async (userId) => {
    set({ isLoading: true });
    try {
      const res = await api.get(`/users/${userId}`);
      set({ user: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true });
    try {
      const res = await api.put(`/users/profile`, data);
      set({ user: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
