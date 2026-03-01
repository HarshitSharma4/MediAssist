import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi, setTokens, clearTokens } from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
    phone?: string;
    blood_group?: string;
    date_of_birth?: string;
    address?: string;
    emergency_contact?: string;
    // legacy / extra fields kept for UI compatibility
    dob?: string;
    bloodGroup?: string;
    weight?: string;
    height?: string;
    profileImage?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    // Actions
    register: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    updateProfile: (data: Partial<User>) => void;
    loadPersistedTokens: () => Promise<void>;
    clearError: () => void;
}

const STORAGE_KEYS = {
    ACCESS_TOKEN: '@mediassist_access_token',
    REFRESH_TOKEN: '@mediassist_refresh_token',
    USER: '@mediassist_user',
};

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    clearError: () => set({ error: null }),

    loadPersistedTokens: async () => {
        try {
            const [access, refresh, userStr] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
                AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
                AsyncStorage.getItem(STORAGE_KEYS.USER),
            ]);
            if (access && refresh && userStr) {
                setTokens(access, refresh);
                const user = JSON.parse(userStr);
                set({ user, isAuthenticated: true });
            }
        } catch {
            // If restore fails, stay logged out
        }
    },

    register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const tokens = await authApi.register(name, email, password);
            setTokens(tokens.access_token, tokens.refresh_token);

            const me = await authApi.me();
            const user: User = {
                id: me.id,
                name: me.name,
                email: me.email,
                avatar_url: me.avatar_url,
                phone: me.phone,
                bloodGroup: me.blood_group,
            };

            await Promise.all([
                AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token),
                AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token),
                AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
            ]);

            set({ user, isAuthenticated: true, isLoading: false });
        } catch (e: any) {
            set({ isLoading: false, error: e.message || 'Registration failed' });
            throw e;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const tokens = await authApi.login(email, password);
            setTokens(tokens.access_token, tokens.refresh_token);

            const me = await authApi.me();
            const user: User = {
                id: me.id,
                name: me.name,
                email: me.email,
                avatar_url: me.avatar_url,
                phone: me.phone,
                bloodGroup: me.blood_group,
            };

            await Promise.all([
                AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.access_token),
                AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refresh_token),
                AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
            ]);

            set({ user, isAuthenticated: true, isLoading: false });
        } catch (e: any) {
            set({ isLoading: false, error: e.message || 'Login failed' });
            throw e;
        }
    },

    logout: async () => {
        try {
            await authApi.logout();
        } catch { }
        clearTokens();
        await Promise.all([
            AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
            AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
            AsyncStorage.removeItem(STORAGE_KEYS.USER),
        ]);
        set({ user: null, isAuthenticated: false });
    },

    updateProfile: (data) =>
        set((state) => ({
            user: state.user ? { ...state.user, ...data } : null,
        })),
}));
