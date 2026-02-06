import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStorage';
import { AuthResponse } from '@/types';

export const useLogin = () => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      setAuth(data.token, data.user);

      router.push('/');
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Error al conectar con el nido dracónico";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};