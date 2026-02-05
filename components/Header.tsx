"use client";
import { useState } from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="w-full border-b border-gray-200 dark:border-white/5 bg-surface py-4 transition-colors duration-300 shadow-sm sticky top-0 z-50">
        <div className="flex w-full items-center justify-between px-[45px]">
          {/* IZQUIERDA: Logo + Botón de Modo */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl">🚀</span>
              <span className="hidden sm:inline tracking-tighter">
                MiProyecto
              </span>
            </Link>
            <ThemeToggle />
          </div>

          {/* DERECHA: Búsqueda, Ticket, Eventos, Ranking, Reportes, Iniciar Sesión */}
          <div className="flex items-center gap-8">
            <div className="flex items-center min-w-[200px]">
              <SearchInput />
            </div>

            <nav className="flex items-center gap-6">
              {/* 1. Ranking */}
              <Link
                href="/ranking"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest whitespace-nowrap"
              >
                Ranking
              </Link>

              {/* 2. Ranking */}
              <Link
                href="/shop"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest whitespace-nowrap"
              >
                Tienda
              </Link>

              {/* 3. Ranking */}
              <Link
                href="/staff"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest whitespace-nowrap"
              >
                Staff
              </Link>

              {/* 4. Eventos*/}
              <Link
                href="/events"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest whitespace-nowrap"
              >
                Eventos
              </Link>
              {/* 5. Misiones */}
              <Link
                href="/misions"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest whitespace-nowrap"
              >
                misiones
              </Link>
              {/* 6. Ticket (Abre Modal) */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest whitespace-nowrap cursor-pointer"
              >
                Ticket
              </button>

              {/* 7. Reportes */}
              <Link
                href="/reports"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest whitespace-nowrap"
              >
                Reportes
              </Link>
            </nav>

            {/* 8. Iniciar Sesión */}
            <Link
              href="/login"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-all active:scale-95 whitespace-nowrap shadow-md shadow-blue-600/10"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </header>

      {/* --- MODAL DE TICKET --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-[#0f0f0f] border border-white/10 p-8 rounded-2xl max-w-sm w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] transform animate-in zoom-in-95 duration-300 relative overflow-hidden">
            {/* Decoración rúnica de fondo para el modal */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full" />

            <div className="relative z-10 text-center">
              <div className="text-4xl mb-4 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                🎫
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-2 text-white">
                ¿Abrir un nuevo Ticket?
              </h3>
              <p className="text-xs text-gray-400 mb-8 leading-relaxed uppercase tracking-wider">
                Un pergamino de consulta será enviado a los administradores.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    console.log("Ticket creado");
                    setIsModalOpen(false);
                  }}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all uppercase text-[10px] tracking-[0.2em]"
                >
                  Confirmar Envío
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 bg-transparent border border-white/5 hover:bg-white/5 text-gray-500 hover:text-white font-bold rounded-lg transition-all uppercase text-[10px] tracking-[0.2em]"
                >
                  Regresar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
