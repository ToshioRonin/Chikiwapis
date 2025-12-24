"use client";
import { useState } from "react";
import RunicCard, { RunicCardProps, ElementType } from "@/components/RunicCard";

const INITIAL_CARDS: RunicCardProps[] = [
{
    name: "Núcleo de Helios",
    elemento: "fuego",
    type: "invocacion",
    description: "Un fragmento de sol encarcelado en runas de obsidiana que calcina ejércitos.",
    power: 9200,
    rareza: "soberano",
    image: "/img/Nuclio de elios.jpg", 
  },
  {
    name: "Susurro del Éter",
    elemento: "viento",
    type: "arma",
    description: "Hoja invisible que corta la realidad, permitiendo ataques desde el plano astral.",
    power: 8800,
    rareza: "mitico",
    image: "/img/SusurroDelEter.jpg",
  },
  {
    name: "Mjolnir",
    elemento: "rayo",
    type: "arma",
    description: "El martillo bendecido por el trueno, capaz de nivelar montañas.",
    power: 5000,
    rareza: "legendario",
    image: "img/martillo.png",
  },
  {
    name: "Corazón de Gaia",
    elemento: "tierra",
    type: "consumible",
    description: "Gema que conecta al portador con las raíces profundas del mundo.",
    power: 1500,
    rareza: "raro",
    image: "/img/CorazonDeGaia.jpg",
  },
  {
    name: "Fénix de Ceniza",
    elemento: "fuego",
    type: "invocacion",
    description: "Ave majestuosa que renace de sus cenizas tras cada batalla.",
    power: 4200,
    rareza: "unico",
    image: "/img/Fenix.jpg",
  },
  {
    name: "Lanza de Poseidón",
    elemento: "agua",
    type: "arma",
    description: "Controla las mareas y desata tormentas sobre los impíos.",
    power: 3800,
    rareza: "aventurero",
    image: "/img/LanzaDePoseidon.jpg",
  },
  {
    name: "Cero Absoluto",
    elemento: "hielo",
    type: "invocacion",
    description: "Entidad elemental que detiene el movimiento molecular.",
    power: 5600,
    rareza: "legendario",
    image: "/img/CeroAbsoluto.jpg",
  },
  {
    name: "Aliento de Zephyr",
    elemento: "viento",
    type: "consumible",
    description: "Esencia pura de aire que otorga velocidad sobrenatural.",
    power: 900,
    rareza: "poco_comun",
    image: "/img/AlientoDeZephyr.jpg",
  },
  {
    name: "Runa Corrupta",
    elemento: "oscuridad",
    type: "consumible",
    description: "Un artefacto prohibido que otorga poder a cambio de cordura.",
    power: 777,
    rareza: "corrupto",
    image: "/img/RunaCorrupta.jpg",
  },
  {
    name: "Escudo de Aegis",
    elemento: "santo",
    type: "arma",
    description: "Protección absoluta contra ataques mágicos y físicos.",
    power: 3000,
    rareza: "raro",
    image: "/img/EscudoDeAegis.jpg",
  },
  {
    name: "Perla del Abismo",
    elemento: "agua",
    type: "consumible",
    description: "Permite respirar y luchar bajo presiones extremas.",
    power: 1200,
    rareza: "comun",
    image: "/img/PerlaDelAbismo.jpg",
  },
  {
    name: "Ifrit's Rage",
    elemento: "fuego",
    type: "arma",
    description: "Guanteletes que incineran todo lo que tocan con fuego eterno.",
    power: 4800,
    rareza: "legendario",
    image: "/img/GuantesDeIfrit.jpg",
  },
];

export default function CardsPage() {
  const [filter, setFilter] = useState<ElementType | "todos">("todos");

  const filteredCards = filter === "todos" 
    ? INITIAL_CARDS 
    : INITIAL_CARDS.filter(card => card.elemento === filter);

  const elementos: (ElementType | "todos")[] = [
    "todos", "fuego", "agua", "viento", "tierra", "rayo", "hielo", "santo", "oscuridad"
  ];

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-500">
      
      {/* --- EFECTOS DE FONDO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/5 dark:bg-purple-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 dark:bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* --- HEADER --- */}
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/30 mb-4">
            Runic Deck
          </h1>
          <p className="text-foreground/40 text-[10px] md:text-xs tracking-[0.5em] uppercase italic">
            Colección Ancestral de Almas
          </p>
        </header>

        {/* --- FILTROS --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-20">
          {elementos.map((el) => (
            <button
              key={el}
              onClick={() => setFilter(el)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                filter === el 
                ? "bg-foreground text-background border-foreground scale-105" 
                : "bg-foreground/5 text-foreground/40 border-foreground/10 hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {el}
            </button>
          ))}
        </div>

        {/* --- GRILLA DE CARTAS (4 POR FILA) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-24 gap-x-8 justify-items-center">
          {filteredCards.map((card, index) => (
            <div 
              key={card.name} 
              className="animate-in fade-in zoom-in duration-700 fill-mode-both"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RunicCard {...card} />
            </div>
          ))}
        </div>

        {/* --- FOOTER --- */}
        <footer className="mt-32 text-center border-t border-foreground/5 pt-12 pb-8">
          <p className="text-[9px] text-foreground/20 uppercase tracking-[0.8em]">
            ᚱᚢᚾᛁᚲ ᚷᚨᛃᛖᛋ • 2025 • LAS RUNAS NO MIENTEN
          </p>
        </footer>
      </div>
    </main>
  );
}