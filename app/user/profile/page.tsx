"use client";
import { motion } from "framer-motion";
import RunicCard, { RunicCardProps } from "@/components/RunicCard";

// Datos de ejemplo para el perfil
const USER_DATA = {
  username: "Arkano_99",
  rank: "Comendador",
  level: 42,
  xp: 75,
  avatar: "🚀",
  stats: [
    { label: "Cartas", val: "24" },
    { label: "Victorias", val: "156" },
    { label: "Misiones", val: "89" },
  ]
};

const MY_CARDS: RunicCardProps[] = [
  { name: "Mjolnir", elemento: "rayo", type: "arma", description: "Bendecido por el trueno.", power: 5000, rareza: "soberano", image: "" },
  { name: "Gaia's Heart", elemento: "tierra", type: "consumible", description: "Restauración vital.", power: 1500, rareza: "raro", image: "" },
];

const ACTIVE_QUESTS = [
  { title: "El Despertar de Fenrir", progress: 65, color: "bg-red-500" },
  { title: "Incursión en el Vacío", progress: 20, color: "bg-purple-500" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-20 transition-colors duration-500">
      
      {/* --- HEADER DE PERFIL (Hero) --- */}
      <section className="relative pt-20 pb-12 px-6 border-b border-foreground/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[30%] h-full bg-purple-600/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          {/* Avatar con efecto de brillo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-foreground/[0.03] border border-foreground/10 rounded-full text-6xl shadow-2xl"
          >
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-spin-slow" />
            {USER_DATA.avatar}
          </motion.div>

          <div className="flex-grow text-center md:text-left">
            <motion.div variants={fadeIn} initial="hidden" animate="visible">
              <span className="text-[10px] uppercase tracking-[0.4em] text-purple-500 font-bold mb-2 inline-block">
                {USER_DATA.rank} • Nivel {USER_DATA.level}
              </span>
              <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-4">
                {USER_DATA.username}
              </h1>
              
              {/* Barra de XP */}
              <div className="w-full max-w-md h-2 bg-foreground/5 rounded-full overflow-hidden mb-6 mx-auto md:mx-0">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${USER_DATA.xp}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-purple-600 shadow-[0_0_10px_rgba(147,51,234,0.5)]"
                />
              </div>

              {/* Stats Rápidos */}
              <div className="flex justify-center md:justify-start gap-8">
                {USER_DATA.stats.map((s, i) => (
                  <div key={i}>
                    <p className="text-[9px] uppercase tracking-widest text-foreground/40">{s.label}</p>
                    <p className="text-xl font-bold italic">{s.val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* COLUMNA IZQUIERDA: Misiones y Eventos (Sticky) */}
        <aside className="lg:col-span-4 space-y-12">
          
          {/* Misiones Activas */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-xl font-black uppercase italic tracking-tighter mb-6">Misiones Activas</h2>
            <div className="space-y-4">
              {ACTIVE_QUESTS.map((q, i) => (
                <div key={i} className="p-5 bg-foreground/[0.02] border border-foreground/5 rounded-2xl group hover:bg-foreground/[0.04] transition-colors">
                  <p className="text-xs font-bold uppercase mb-3">{q.title}</p>
                  <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${q.progress}%` }}
                      className={`h-full ${q.color}`}
                    />
                  </div>
                  <p className="text-[9px] text-right mt-2 text-foreground/40 uppercase font-bold">{q.progress}%</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Evento Próximo */}
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-xl font-black uppercase italic tracking-tighter mb-6">Próximo Evento</h2>
            <div className="relative group overflow-hidden rounded-2xl bg-purple-600 p-6 text-white cursor-pointer">
              <div className="relative z-10">
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold mb-2">Especial de Navidad</p>
                <h3 className="text-lg font-black uppercase leading-tight mb-4">El Eclipse de las Sombras</h3>
                <button className="text-[9px] font-bold uppercase tracking-widest border border-white/20 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors">
                  Ver Detalles
                </button>
              </div>
              <div className="absolute top-0 right-0 text-6xl opacity-20 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
                ❄️
              </div>
            </div>
          </motion.div>
        </aside>

        {/* COLUMNA DERECHA: Mi Mazo de Cartas */}
        <section className="lg:col-span-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Mi Mazo Rúnico</h2>
            <button className="text-[10px] uppercase tracking-widest text-purple-500 font-bold hover:underline">
              Editar Mazo
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center md:justify-items-start">
            {MY_CARDS.map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <RunicCard {...card} />
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}