"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Role = "admin" | "reclutador" | "soporte";

interface StaffMember {
  id: number;
  dcName: string;
  mcName: string;
  role: Role;
  description: string;
}

const STAFF_DATA: StaffMember[] = [
  { id: 1, role: "admin", dcName: "Chiki#0001", mcName: "ChikiPlayer", description: "Fundador y desarrollador principal del reino." },
  { id: 2, role: "admin", dcName: "Rex#1234", mcName: "RexVila", description: "Gestión de infraestructura y eventos globales." },
  { id: 3, role: "reclutador", dcName: "Sombra#5555", mcName: "SombraGris", description: "Encargado de evaluar nuevos aspirantes al clan." },
  { id: 4, role: "soporte", dcName: "Ghost#9999", mcName: "GhostAdmin", description: "Asistencia técnica y resolución de conflictos." },
];

const ROLE_CONFIG = {
  admin: { label: "Administradores", color: "#ef4444", bg: "from-red-950/20" },
  reclutador: { label: "Cuerpo de Reclutamiento", color: "#3b82f6", bg: "from-blue-950/20" },
  soporte: { label: "Equipo de Soporte", color: "#10b981", bg: "from-green-950/20" },
};

export default function StaffPage() {
  const [filter, setFilter] = useState<Role | "todos">("todos");

  // Agrupamos los miembros por rol
  const groupedStaff = useMemo(() => {
    const groups = (filter === "todos" ? ["admin", "reclutador", "soporte"] : [filter]) as Role[];
    return groups.map(role => ({
      role,
      config: ROLE_CONFIG[role],
      members: STAFF_DATA.filter(m => m.role === role)
    })).filter(group => group.members.length > 0);
  }, [filter]);

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-40">
      
      {/* --- HEADER --- */}
      <section className="pt-24 pb-12 px-6 text-center relative overflow-hidden">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-purple-600/10 blur-[120px] rounded-full" />
         
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-6">
                El Staff
            </h1>
            
            {/* Filtros Estilo "Chips" */}
            <div className="flex flex-wrap justify-center gap-3 mt-10">
                {["todos", "admin", "reclutador", "soporte"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-8 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                            filter === f 
                            ? "bg-white text-black border-white" 
                            : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>
         </motion.div>
      </section>

      {/* --- SECCIONES POR RANGO --- */}
      <section className="max-w-7xl mx-auto px-6 mt-20 space-y-32">
        <AnimatePresence mode="popLayout">
          {groupedStaff.map((group) => (
            <motion.div 
              key={group.role}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              {/* Título de la Categoría */}
              <div className="flex items-center gap-6">
                <h2 className="text-2xl font-black uppercase italic tracking-widest whitespace-nowrap" style={{ color: group.config.color }}>
                   // {group.config.label}
                </h2>
                <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent" />
              </div>

              {/* Grid de Miembros */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.members.map((member) => (
                  <div 
                    key={member.id}
                    className={`relative group bg-gradient-to-b ${group.config.bg} to-[#0a0a0a] border border-white/5 p-8 rounded-[2rem] hover:border-white/20 transition-all`}
                  >
                    {/* Minecraft Face */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 shadow-lg group-hover:scale-110 transition-transform">
                            <img src={`https://mc-heads.net/avatar/${member.mcName}`} alt={member.mcName} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">In-game</p>
                            <p className="text-sm font-black uppercase italic">{member.mcName}</p>
                        </div>
                    </div>

                    {/* Discord Info */}
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black uppercase tracking-tighter leading-none break-all">
                            {member.dcName.split('#')[0]}
                            <span className="text-white/20 text-lg">#{member.dcName.split('#')[1]}</span>
                        </h3>
                        <p className="text-xs text-white/50 italic font-medium leading-relaxed">
                            {member.description}
                        </p>
                    </div>

                    {/* Runa de fondo decorativa */}
                    <div className="absolute -bottom-4 -right-4 text-8xl font-black opacity-[0.03] select-none group-hover:opacity-[0.08] transition-opacity">
                        ᚱ
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </main>
  );
}