"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface Quest {
  id: number;
  title: string;
  rank: "S" | "A" | "B" | "C";
  reward: string;
  status: "disponible" | "en curso" | "completada";
  description: string;
  category: "Caza" | "Exploración" | "Recolección" | "Evento";
}

const QUEST_DATA: Quest[] = [
  { id: 1, title: "El Despertar de Fenrir", rank: "S", reward: "5000 Runas", status: "disponible", category: "Caza", description: "Derrota al lobo ancestral en las cumbres nevadas." },
  { id: 2, title: "Incursión en el Vacío", rank: "A", reward: "Carta Legendaria", status: "en curso", category: "Evento", description: "Cierra la brecha dimensional en el sector 7." },
  { id: 3, title: "Hierbas de Éter", rank: "C", reward: "200 Runas", status: "disponible", category: "Recolección", description: "Recolecta 10 flores de éter en el bosque místico." },
  { id: 4, title: "Mapa del Rey Caído", rank: "B", reward: "Llave Rúnica", status: "disponible", category: "Exploración", description: "Encuentra la entrada oculta a la tumba del soberano." },
];

export default function QuestsPage() {
  const [filter, setFilter] = useState<Quest["category"] | "Todas">("Todas");

  const filteredQuests = filter === "Todas" 
    ? QUEST_DATA 
    : QUEST_DATA.filter(q => q.category === filter);

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-20">
      {/* --- CABECERA --- */}
      <div className="relative h-[40vh] flex flex-col items-center justify-center overflow-hidden border-b border-foreground/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-600/5 blur-[120px] rounded-full" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">
            Tablón de Misiones
          </h1>
          <p className="text-foreground/50 text-[10px] uppercase tracking-[0.5em] italic">
            Contratos del Gremio • Honor & Recompensa
          </p>
        </motion.div>
      </div>

      {/* --- FILTROS --- */}
      <div className="sticky top-[73px] z-40 bg-background/80 backdrop-blur-md border-b border-foreground/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex gap-4 overflow-x-auto no-scrollbar">
          {["Todas", "Caza", "Exploración", "Recolección", "Evento"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                filter === cat 
                ? "bg-foreground text-background border-foreground" 
                : "border-foreground/10 hover:border-purple-500/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRILLA DE CONTRATOS --- */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuests.map((quest, i) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group bg-foreground/[0.02] border border-foreground/5 rounded-2xl p-8 overflow-hidden transition-colors hover:bg-foreground/[0.04]"
            >
              {/* Badge de Rango */}
              <div className="absolute top-4 right-6 text-4xl font-black italic opacity-10 group-hover:opacity-30 transition-opacity">
                Rank {quest.rank}
              </div>

              <div className="flex flex-col h-full">
                <span className="text-[9px] uppercase tracking-[0.3em] text-purple-500 font-bold mb-2">
                  {quest.category}
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tighter mb-4 group-hover:text-purple-500 transition-colors">
                  {quest.title}
                </h3>
                <p className="text-sm text-foreground/50 italic mb-8 flex-grow">
                  "{quest.description}"
                </p>

                <div className="pt-6 border-t border-foreground/5 flex items-end justify-between">
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-foreground/30 mb-1">Recompensa</p>
                    <p className="text-sm font-bold text-foreground italic">{quest.reward}</p>
                  </div>
                  
                  <button className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                    quest.status === "disponible" 
                    ? "bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-600/20" 
                    : "bg-foreground/10 text-foreground/30 cursor-not-allowed"
                  }`}>
                    {quest.status === "disponible" ? "Aceptar Contrato" : quest.status}
                  </button>
                </div>
              </div>

              {/* Efecto de luz al hover */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}