import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Role = "USER" | "ADMIN";

interface User {
  id: number;
  MCName: string;   
  DCName: string;   
  email: string;
  role: Role;       
  createdAt?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;

  // Acciones
  setAuth: (token: string, user: User) => void;
  updateUser: (user: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token, user) => set({ 
        token, 
        user, 
        isAuthenticated: true 
      }),

      updateUser: (updatedData) => set((state) => ({
        user: state.user ? { ...state.user, ...updatedData } : null
      })),

      // Limpia todo al cerrar sesión
      logout: () => set({ 
        token: null, 
        user: null, 
        isAuthenticated: false 
      }),
    }),
    {
      name: 'core-nest-auth', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);