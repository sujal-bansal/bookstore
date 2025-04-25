import { create } from "zustand";
import { api } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoading: false,

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const res = await api.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      const res = await api.post("/auth/logout");
      set({ authUser: null });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  signup: async (data) => {
    set({ isLoading: true });
    try {
      const res = await api.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Signed Up Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
