import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios'; 
import { AuthResponse } from '@/types';

export const useRegister = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (userData: any) => {
    setIsLoading(true);
    setError(null);

    try {
      await api.post<AuthResponse>('/auth/register', userData);
      
      router.push('/login');
    } catch (err: any) {
      const message = err.response?.data?.message || "Error al registrar al nuevo dragón";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};