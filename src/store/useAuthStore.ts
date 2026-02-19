import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    dob?: string;
    bloodGroup?: string;
    weight?: string;
    height?: string;
    profileImage?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: (user) => set({ user, isAuthenticated: true }),
    logout: () => set({ user: null, isAuthenticated: false }),
    updateProfile: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
    })),
}));
