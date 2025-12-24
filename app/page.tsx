"use client";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import RunicCard, { RunicCardProps } from "@/components/RunicCard";

const FEATURED_CARDS: RunicCardProps[] = [
  { 
    name: "Reliquia del Clan", 
    elemento: "santo", 
    type: "invocacion", 
    description: "Artefacto ancestral custodiado por generaciones.", 
    power: 9999, 
    rareza: "mitico", 
    image: "/img/SantoGrial.jpg" 
  },
  { 
    name: "Filo Sombrío", 
    elemento: "oscuridad", 
    type: "arma", 
    description: "Forjada en el abismo para proteger el estandarte.", 
    power: 4500, 
    rareza: "legendario", 
    image: "/img/FiloOscuro.jpg" 
  },
];

const fadeInVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "circOut" } 
  }
};

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      
      {/* --- EFECTOS DE FONDO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-[-10%] w-[40%] h-[40%] bg-purple-500/5 dark:bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      {/* 1. HERO SECTION */}
      <motion.section 
        initial="hidden" 
        animate="visible" 
        variants={fadeInVariant}
        className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6 text-center"
      >
        <span className="px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-[10px] uppercase tracking-[0.4em] text-purple-600 dark:text-purple-400 mb-6">
          Bienvenido el mejor clan
        </span>
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground to-foreground/30">
          Chikiwapis
        </h1>
        <p className="max-w-xl mx-auto text-foreground/50 text-base md:text-xl italic mb-10">
          "Donde los mejores se reunen y las almas se forjan en la batalla."
        </p>
        <div className="flex gap-4">
          <Link 
            href="/cards" 
            className="px-10 py-4 bg-foreground text-background font-bold uppercase text-[10px] tracking-widest rounded-full hover:scale-105 transition-transform shadow-xl shadow-foreground/5"
          >
            Explorar las cartas disponibles
          </Link>
        </div>
      </motion.section>

      {/* 2. STATS BANNER */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: false, amount: 0.5 }} 
        variants={fadeInVariant}
        className="relative z-10 border-y border-foreground/5 bg-foreground/[0.01] backdrop-blur-sm py-16"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Guerreros", val: "150+" },
            { label: "Victorias", val: "892" },
            { label: "Territorios", val: "12" },
            { label: "Poder", val: "1.2M" }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-[10px] uppercase tracking-widest text-foreground/40 mb-2">{stat.label}</p>
              <p className="text-4xl font-black italic text-foreground">{stat.val}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. MISIONES DEL CLAN */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false }}
          variants={fadeInVariant} 
          className="mb-16"
        >
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-foreground">Misiones de Gremio</h2>
          <p className="text-foreground/40 text-sm tracking-widest uppercase">Desafíos activos en el reino</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "El Despertar de Fenrir", reward: "5000 Runas", difficulty: "Extremo", color: "border-red-500/50" },
            { title: "Incursión en el Vacío", reward: "Carta Legendaria", difficulty: "Difícil", color: "border-purple-500/50" },
          ].map((quest, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 10 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.2 }}
              className={`p-8 bg-foreground/[0.03] border-l-4 ${quest.color} rounded-r-xl group cursor-pointer transition-colors hover:bg-foreground/[0.05]`}
            >
              <h3 className="text-xl font-bold uppercase mb-2 group-hover:text-purple-500 transition-colors text-foreground">{quest.title}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[10px] uppercase tracking-widest text-foreground/40">Recompensa: {quest.reward}</span>
                <span className="px-3 py-1 bg-foreground/5 rounded text-[8px] font-bold uppercase tracking-widest text-foreground/60">{quest.difficulty}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. CARTAS DESTACADAS */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 bg-foreground/[0.01] rounded-[4rem]">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false }}
          variants={fadeInVariant} 
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-foreground">Artefactos del Estandarte</h2>
          <div className="h-1 w-20 bg-purple-600 mx-auto mt-4 shadow-[0_0_15px_rgba(147,51,234,0.5)]" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-16">
          {FEATURED_CARDS.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-purple-600/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <RunicCard {...card} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. JERARQUÍA / RANGOS */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: false }}
          variants={fadeInVariant}
        >
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-12 text-foreground">Jerarquía Rúnica</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Soberano', 'Comendador', 'Iniciado'].map((rank, i) => (
              <div key={i} className="p-6 border border-foreground/5 rounded-2xl hover:bg-foreground/[0.02] transition-all group cursor-default">
                <div className="w-12 h-12 bg-purple-500/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                  <span className="text-purple-500 text-xl font-bold">{rank[0]}</span>
                </div>
                <h4 className="font-bold uppercase tracking-widest text-sm text-foreground">{rank}</h4>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 6. CALL TO ACTION FINAL */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="relative z-10 py-40 flex flex-col items-center justify-center text-center px-6"
      >
        <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-8 text-foreground">
          ¿Estás Listo?
        </h2>
        
        <Link 
          href="/register" 
          className="group relative px-12 py-5 bg-purple-600 text-white font-bold uppercase text-[10px] tracking-[0.3em] rounded-full overflow-hidden transition-all hover:px-16 active:scale-95"
        >
          <span className="relative z-10">Unirse al Clan</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
        </Link>
      </motion.section>

      {/* FOOTER */}
      <footer className="relative z-10 py-20 border-t border-foreground/5 text-center bg-background transition-colors">
        <p className="text-[10px] uppercase tracking-[0.8em] text-foreground/30 italic">
          Las runas nunca mienten • 2025
        </p>
      </footer>
    </div>
  );
}