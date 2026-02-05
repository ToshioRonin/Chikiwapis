"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "construccion" | "pvp" | "horas" | "donaciones" | "misiones" | "activo";

interface LeaderboardEntry {
  rank: number;
  name: string;
  value: string | number;
  avatar?: string;
}

/* ================= CONFIG DE CATEGORÍAS ================= */
const CATEGORIES: { id: Category; label: string; icon: string; unit: string }[] = [
  { id: "pvp", label: "Combate PvP", icon: "⚔️", unit: "Kills" },
  { id: "construccion", label: "Arquitectura", icon: "🏗️", unit: "Bloques" },
  { id: "horas", label: "Tiempo de Juego", icon: "⌛", unit: "Horas" },
  { id: "donaciones", label: "Donaciones", icon: "💎", unit: "Esmeraldas" },
  { id: "misiones", label: "Misiones", icon: "📜", unit: "Completadas" },
  { id: "activo", label: "Más Activo", icon: "🔥", unit: "Exp" },
];

/* ================= MOCK DATA (PARA PROBAR) ================= */
const RANKING_DATA: Record<Category, LeaderboardEntry[]> = {
  pvp: [
    { rank: 1, name: "ChikiPlayer", value: 1250 },
    { rank: 2, name: "KillerRune", value: 980 },
    { rank: 3, name: "SombraGris", value: 850 },
    { rank: 4, name: "RexVila", value: 720 },
    { rank: 5, name: "GhostAdmin", value: 600 },
  ],
  // ... podrías llenar las demás aquí
  construccion: [{ rank: 1, name: "BobBuilder", value: "500k" }],
  horas: [], donaciones: [], misiones: [], activo: []
};

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState<Category>("pvp");

  const currentCategory = CATEGORIES.find((c) => c.id === activeTab);
  const data = RANKING_DATA[activeTab] || [];

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-20 pt-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-purple-500 text-[10px] uppercase tracking-[0.5em] font-bold"
          >
            Muro de la Gloria
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mt-2">
            Hall of Fame
          </h1>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                activeTab === cat.id 
                ? "bg-purple-600 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.4)]" 
                : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              <span className="mr-2">{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* PODIUM (TOP 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end mb-16 px-4">
          {/* Silver - Rank 2 */}
          <PodiumCard entry={data[1]} color="border-slate-400" rank={2} height="h-48" />
          {/* Gold - Rank 1 */}
          <PodiumCard entry={data[0]} color="border-yellow-500" rank={1} height="h-64" isGold />
          {/* Bronze - Rank 3 */}
          <PodiumCard entry={data[2]} color="border-orange-700" rank={3} height="h-40" />
        </div>

        {/* LIST (RANK 4+) */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/40">
                <th className="px-8 py-6">Puesto</th>
                <th className="px-8 py-6">Usuario</th>
                <th className="px-8 py-6 text-right">{currentCategory?.unit}</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {data.slice(3).map((player, i) => (
                  <motion.tr 
                    key={player.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-6 font-mono text-white/40">#{player.rank}</td>
                    <td className="px-8 py-6 font-bold uppercase tracking-tighter">{player.name}</td>
                    <td className="px-8 py-6 text-right font-black text-purple-400">{player.value}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

/* ================= SUB-COMPONENTE PODIO ================= */
function PodiumCard({ entry, color, rank, height, isGold }: { entry?: LeaderboardEntry, color: string, rank: number, height: string, isGold?: boolean }) {
  if (!entry) return <div className={`${height} opacity-10 bg-white/5 rounded-3xl border border-dashed border-white/20`} />;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className={`relative flex flex-col items-center justify-end p-8 rounded-3xl border-t-4 ${color} bg-gradient-to-t from-white/5 to-transparent ${height}`}
    >
      {isGold && (
        <div className="absolute -top-12 text-5xl animate-bounce">👑</div>
      )}
      <div className="absolute top-4 left-6 text-4xl font-black italic opacity-20">#{rank}</div>
      <div className="w-16 h-16 rounded-full bg-white/10 mb-4 border border-white/20 overflow-hidden">
        {/* Aquí iría el avatar de Minecraft */}
        <img src={`https://mc-heads.net/avatar/${entry.name}`} alt={entry.name} />
      </div>
      <h3 className="text-xl font-bold uppercase tracking-tighter mb-1">{entry.name}</h3>
      <span className="text-[10px] text-white/40 uppercase tracking-widest">{entry.value} pts</span>
    </motion.div>
  );
}