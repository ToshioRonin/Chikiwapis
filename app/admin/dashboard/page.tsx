"use client";
import { motion } from "framer-motion";

const STATS = [
  { label: "Cartas Totales", value: "124", icon: "🃏", color: "text-blue-500 dark:text-blue-400" },
  { label: "Usuarios Activos", value: "1,205", icon: "👥", color: "text-purple-500 dark:text-purple-400" },
  { label: "Poder del Clan", value: "850K", icon: "⚔️", color: "text-orange-500 dark:text-orange-400" },
  { label: "Tickets Abiertos", value: "12", icon: "🎫", color: "text-red-500 dark:text-red-400" },
];

export default function DashboardPage() {
  return (
    <div className="p-10 min-h-screen transition-colors duration-500">
      {/* Header Superior */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic text-foreground">
            Comando Central
          </h2>
          <p className="text-foreground/40 text-xs tracking-widest uppercase mt-1 font-bold">
            Modulo de Administración
          </p>
        </div>
        
        <div className="flex gap-4 text-right px-4 py-2 bg-surface border border-foreground/10 rounded-2xl shadow-sm">
          <div>
            <p className="text-[9px] text-foreground/30 uppercase font-black tracking-tighter">Estado del Sistema</p>
            <p className="text-[11px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Sincronizado
            </p>
          </div>
        </div>
      </header>

      {/* Grid de Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {STATS.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-surface border border-foreground/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-foreground/20 transition-all shadow-sm hover:shadow-xl"
          >
            <div className="relative z-10">
              <p className="text-foreground/40 text-[9px] uppercase font-black tracking-widest mb-1">{stat.label}</p>
              <h3 className={`text-4xl font-black italic ${stat.color}`}>{stat.value}</h3>
            </div>
            <span className="absolute -bottom-4 -right-4 text-7xl opacity-5 dark:opacity-10 group-hover:scale-110 transition-transform grayscale">
              {stat.icon}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Tabla Dinámica */}
      <div className="bg-surface border border-foreground/5 rounded-[2.5rem] p-8 shadow-2xl transition-colors duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 px-2">
          <h3 className="font-black text-sm uppercase tracking-widest italic flex items-center gap-3 text-foreground">
             <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
             Cartas Disponibles
          </h3>
          <button className="bg-foreground text-background px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:opacity-80 transition-all shadow-lg active:scale-95">
            Nueva Carta +
          </button>
        </div>

        <div className="w-full overflow-x-auto">
           <table className="w-full text-left">
              <thead className="text-[9px] uppercase text-foreground/30 font-black border-b border-foreground/5">
                <tr>
                  <th className="pb-4 px-4 tracking-widest">Entidad</th>
                  <th className="pb-4 px-4 tracking-widest">Elemento</th>
                  <th className="pb-4 px-4 tracking-widest">Rareza</th>
                  <th className="pb-4 px-4 text-right tracking-widest">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-[11px] font-bold text-foreground/80">
                {[
                  { name: "Núcleo de Helios", elem: "Fuego", rare: "Soberano", color: "text-orange-500" },
                  { name: "Susurro del Éter", elem: "Viento", rare: "Mítico", color: "text-blue-400" },
                  { name: "Fénix de Ceniza", elem: "Fuego", rare: "Legendario", color: "text-red-500" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-foreground/[0.03] last:border-0 hover:bg-foreground/[0.02] transition-colors group">
                    <td className="py-5 px-4 uppercase tracking-tighter font-black text-foreground">{row.name}</td>
                    <td className="py-5 px-4 opacity-60 uppercase text-[10px]">{row.elem}</td>
                    <td className={`py-5 px-4 italic font-black ${row.color}`}>{row.rare}</td>
                    <td className="py-5 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="bg-foreground/5 p-2 rounded-xl hover:bg-foreground/10 transition-colors text-xs border border-foreground/5">
                          ✏️
                        </button>
                        <button className="bg-red-500/5 p-2 rounded-xl hover:bg-red-500/20 text-red-500 transition-colors text-xs border border-red-500/10">
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}