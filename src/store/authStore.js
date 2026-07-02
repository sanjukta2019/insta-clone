import { create } from "zustand";

let storedUser = null;

try {
  const data = localStorage.getItem("user-info");
  storedUser = data && data !== "undefined" ? JSON.parse(data) : null;
} catch (error) {
  localStorage.removeItem("user-info");
  storedUser = null;
}

const useAuthStore = create((set) => ({
  user: storedUser,

  login: (user) => set({ user }),

  logout: () => set({ user: null }),

  setUser: (user) => set({ user }),
}));

export default useAuthStore;