"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/useRegister';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error: apiError } = useRegister();
  
  const [formData, setFormData] = useState({
    MCName: "",
    DCName: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-[45px]">
      <div className="w-full max-w-md rounded-2xl bg-surface p-8 shadow-xl border border-gray-200 dark:border-white/5">
        <div className="flex flex-col items-center mb-8">
          <span className="text-4xl mb-2">🛡️</span>
          <h1 className="text-2xl font-bold text-foreground uppercase italic tracking-tighter">Crea tu cuenta</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            Únete al clan y empieza tu aventura hoy mismo
          </p>
        </div>

        {apiError && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-500 text-[10px] font-bold uppercase text-center">
            {apiError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          {/* Campo: Minecraft Name */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5">Nombre en Minecraft</label>
            <input 
              name="MCName"
              type="text" 
              required
              disabled={isLoading}
              value={formData.MCName}
              onChange={handleChange}
              placeholder="Ej: Steve_Draco"
              className="w-full rounded-lg bg-background border border-gray-300 dark:border-white/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
            />
          </div>

          {/* Campo: Discord Name */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5">Usuario de Discord</label>
            <input 
              name="DCName"
              type="text" 
              required
              disabled={isLoading}
              value={formData.DCName}
              onChange={handleChange}
              placeholder="Ej: dragón#1234"
              className="w-full rounded-lg bg-background border border-gray-300 dark:border-white/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
            />
          </div>

          {/* Campo: Email */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5">Email</label>
            <input 
              name="email"
              type="email" 
              required
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@ejemplo.com"
              className="w-full rounded-lg bg-background border border-gray-300 dark:border-white/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
            />
          </div>
          
          {/* Campo: Contraseña */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold mb-1.5">Contraseña</label>
            <input 
              name="password"
              type="password" 
              required
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-lg bg-background border border-gray-300 dark:border-white/10 px-4 py-2.5 outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50"
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-purple-600 py-3 font-bold uppercase text-[10px] tracking-widest text-white hover:bg-purple-700 transition-colors active:scale-[0.98] shadow-lg shadow-purple-600/20 disabled:opacity-50"
          >
            {isLoading ? "Registrando..." : "Registrar en el Clan"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          ¿Ya eres miembro?{" "}
          <Link href="/login" className="text-purple-500 hover:underline font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}