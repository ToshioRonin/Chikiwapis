"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface Event {
  id: number;
  title: string;
  date: string;
  status: "activo" | "proximamente" | "finalizado";
  image: string;
  description: string;
  tag: string;
}

const FEATURED_EVENT: Event = {
  id: 0,
  tag: "Gran Evento Estelar",
  title: "El Eclipse de las Sombras",
  date: "24 de Diciembre, 2025",
  status: "activo",
  image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=2074&auto=format&fit=crop",
  description: "Un evento único donde el plano astral se alinea con nuestra fortaleza. Participa en las incursiones nocturnas para obtener recompensas exclusivas de edición limitada."
};

const OTHER_EVENTS: Event[] = [
  { id: 1, tag: "Torneo", title: "Copa del Fundador", date: "15 de Enero", status: "proximamente", image: "", description: "Duelos 1vs1 para determinar al campeón del mes." },
  { id: 2, tag: "Social", title: "Banquete Rúnico", date: "05 de Febrero", status: "proximamente", image: "", description: "Reunión de gremio para intercambio de cartas y estrategias." },
  { id: 3, tag: "Caza", title: "Luna Roja", date: "01 de Diciembre", status: "finalizado", image: "", description: "Invasión de bestias de sangre en los valles del norte." },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 pb-32">
      
      {/* --- EVENTO ESTELAR (HERO) --- */}
      <section className="relative h-[80vh] w-full flex items-end justify-start overflow-hidden">
        {/* Imagen de fondo con overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={FEATURED_EVENT.image} 
            alt="Hero Event" 
            className="w-full h-full object-cover opacity-60 dark:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl px-[45px] pb-20"
        >
          <span className="inline-block px-4 py-1 rounded-full border border-purple-500 bg-purple-500/10 text-purple-400 text-[10px] uppercase tracking-[0.4em] font-bold mb-6 animate-pulse">
            {FEATURED_EVENT.tag}
          </span>
          <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-4 leading-none">
            {FEATURED_EVENT.title}
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 italic max-w-2xl mb-8 leading-relaxed">
            "{FEATURED_EVENT.description}"
          </p>
          <div className="flex items-center gap-6">
            <button className="px-10 py-4 bg-purple-600 text-white font-bold uppercase text-[10px] tracking-widest rounded-full hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/30 active:scale-95">
              Participar Ahora
            </button>
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-foreground/40">Finaliza en</span>
              <span className="text-sm font-bold uppercase tracking-tighter">{FEATURED_EVENT.date}</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- GRILLA DE EVENTOS SECUNDARIOS --- */}
      <section className="max-w-7xl mx-auto px-[45px] mt-24">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex items-end justify-between mb-12 border-b border-foreground/5 pb-6"
        >
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Cronograma de Eventos</h2>
            <p className="text-foreground/40 text-[10px] uppercase tracking-widest mt-1">Próximas actividades del gremio</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OTHER_EVENTS.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-foreground/[0.02] border border-foreground/5 p-8 rounded-3xl hover:bg-foreground/[0.04] transition-all"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-[9px] font-bold uppercase tracking-widest text-purple-500">
                  {event.tag}
                </span>
                <span className={`text-[8px] uppercase tracking-widest px-2 py-1 rounded border ${
                  event.status === 'activo' ? 'border-green-500/50 text-green-500' : 
                  event.status === 'proximamente' ? 'border-blue-500/50 text-blue-500' : 'border-foreground/20 text-foreground/30'
                }`}>
                  {event.status}
                </span>
              </div>
              
              <h3 className="text-xl font-bold uppercase tracking-tighter mb-4 group-hover:text-purple-500 transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-foreground/50 italic mb-8">
                {event.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-[10px] font-bold text-foreground/40 uppercase">{event.date}</span>
                <button className="text-[10px] font-black uppercase tracking-widest hover:text-purple-500 transition-colors">
                  Detalles +
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- DECORACIÓN DE FONDO --- */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600/5 blur-[150px] rounded-full" />
      </div>
    </main>
  );
}