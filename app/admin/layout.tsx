"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/admin/dashboard' },
    { id: 'cartas', label: 'Gestión de Cartas', icon: '🃏', href: '/admin/cartas' },
    { id: 'usuarios', label: 'Lista de Miembros', icon: '🛡️', href: '/admin/usuarios' },
    { id: 'eventos', label: 'Eventos', icon: '📅', href: '/admin/events' },
    { id: 'reportes', label: 'Reportes', icon: '📈', href: '/admin/reportes' },
    { id: 'tickets', label: 'Tickets', icon: '🎫', href: '/admin/tickets' },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-[family-name:var(--font-geist-sans)] transition-colors duration-500">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-surface border-r border-foreground/5 flex flex-col p-6 shadow-2xl transition-colors duration-500">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="font-black text-xl italic text-white">C</span>
          </div>
          <div>
            <span className="font-black tracking-tighter text-lg block leading-none">CHIKIWAPIS</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/30 font-bold tracking-tighter">Admin Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 group ${
                  isActive 
                  ? 'bg-foreground/10 text-foreground border border-foreground/10 shadow-sm' 
                  : 'text-foreground/40 hover:bg-foreground/5 hover:text-foreground'
                }`}
              >
                <span className={`transition-transform duration-300 ${isActive ? 'scale-125' : 'group-hover:scale-110'}`}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar */}
        <div className="mt-auto pt-6 border-t border-foreground/5">
          <Link 
            href="/" 
            className="flex items-center gap-4 px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300"
          >
            <span className="text-lg">🚪</span>
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto relative bg-background/50 transition-colors duration-500">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -z-10 pointer-events-none opacity-50 dark:opacity-100" />
        
        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}