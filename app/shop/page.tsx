"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface ShopItem {
  id: number;
  name: string;
  category: "items" | "cosmeticos" | "rangos" | "especial";
  price: number;
  image: string;
  description: string;
  stock?: number;
}

const SHOP_ITEMS: ShopItem[] = [
  { id: 1, name: "Kit de Asalto Inicial", category: "items", price: 500, description: "Set completo de hierro con encantamientos básicos.", image: "/icons/kit.png" },
  { id: 2, name: "Capa de la Sombra", category: "cosmeticos", price: 2500, description: "Capa exclusiva con partículas de humo negro.", image: "/icons/cloak.png" },
  { id: 3, name: "Rango 'Vanguardia'", category: "rangos", price: 10000, description: "Acceso a comandos exclusivos y tag dorado.", image: "/icons/rank.png" },
  { id: 4, name: "Llave de Cofre Mítico", category: "especial", price: 1200, description: "Una llave para abrir el cofre sagrado del spawn.", image: "/icons/key.png" },
];

export default function ClanShop() {
  const [balance, setBalance] = useState(1500); // Mock balance
  const [filter, setFilter] = useState("todos");

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-32">
      {/* --- HEADER DE LA TIENDA --- */}
      <div className="relative h-64 flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-purple-900/10 blur-3xl rounded-full -top-32" />
        <div className="text-center z-10">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter">Mercado del Gremio</h1>
          <div className="mt-4 inline-flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10">
            <span className="text-[10px] uppercase tracking-widest text-white/40">Tus Créditos:</span>
            <span className="text-xl font-black text-yellow-500">✨ {balance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* --- CONTENIDO --- */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar de Filtros */}
          <aside className="space-y-8">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-purple-500 mb-6">Categorías</h3>
              <div className="flex flex-col gap-2">
                {["todos", "items", "cosmeticos", "rangos", "especial"].map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-left px-4 py-3 rounded-xl text-xs uppercase tracking-widest transition-all ${
                      filter === cat ? "bg-white/10 text-white border-l-2 border-purple-500" : "text-white/40 hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid de Productos */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {SHOP_ITEMS.filter(i => filter === "todos" || i.category === filter).map((item) => (
              <motion.div 
                layout
                key={item.id}
                className="group relative bg-[#111] border border-white/5 rounded-3xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="h-40 flex items-center justify-center mb-6 bg-black/40 rounded-2xl border border-white/5 group-hover:scale-105 transition-transform">
                   {/* Placeholder imagen */}
                   <span className="text-5xl opacity-50 group-hover:opacity-100 transition-opacity">📦</span>
                </div>
                
                <h3 className="text-lg font-bold uppercase tracking-tighter mb-2">{item.name}</h3>
                <p className="text-xs text-white/40 italic leading-relaxed mb-6 h-12 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase text-white/30 tracking-widest">Precio</span>
                    <span className="font-black text-yellow-500 italic tracking-tighter">✨ {item.price}</span>
                  </div>
                  <button 
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                    disabled={balance < item.price}
                  >
                    Canjear
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}