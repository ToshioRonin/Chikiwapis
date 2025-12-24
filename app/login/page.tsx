"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-[45px]">
      <div className="w-full max-w-md rounded-2xl bg-surface p-8 shadow-xl border border-gray-200 dark:border-white/5">
        <div className="flex flex-col items-center mb-8">
          <span className="text-4xl mb-2">🚀</span>
          <h1 className="text-2xl font-bold text-foreground">Bienvenido de nuevo</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input 
              type="email" 
              required
              placeholder="tu@ejemplo.com"
              className="w-full rounded-lg bg-background border border-gray-300 dark:border-white/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1.5">Contraseña</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full rounded-lg bg-background border border-gray-300 dark:border-white/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition-colors active:scale-[0.98]"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline font-medium">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
}