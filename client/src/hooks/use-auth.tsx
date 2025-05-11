import { create } from 'zustand';
import { apiRequest } from '@/lib/queryClient';

interface AuthState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  loginMutation: any;
  registerMutation: any;
  updateUser: (data: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  loginMutation: {
    mutateAsync: async (data: any) => {
      try {
        const response = await apiRequest('POST', '/api/auth/login', data);
        set({ user: response.user, error: null });
        return response;
      } catch (error: any) {
        set({ error: error.message });
        throw error;
      }
    }
  },
  registerMutation: {
    mutateAsync: async (data: any) => {
      try {
        const response = await apiRequest('POST', '/api/auth/register', data);
        set({ user: response.user, error: null });
        return response;
      } catch (error: any) {
        set({ error: error.message });
        throw error;
      }
    }
  },
  updateUser: async (data: any) => {
    try {
      const response = await apiRequest('PATCH', '/api/user/profile', data);
      set({ user: response, error: null });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
  logout: async () => {
    try {
      await apiRequest('POST', '/api/auth/logout', {});
      set({ user: null, error: null });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  }
}));