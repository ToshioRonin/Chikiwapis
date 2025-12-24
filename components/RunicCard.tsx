"use client";
import { useState } from "react";

/* ================= TIPOS EXPORTADOS (CORRECCIÓN AQUÍ) ================= */
// Añadimos 'export' para que el Home pueda usar estas definiciones
export type ElementType = "fuego" | "agua" | "viento" | "tierra"| "rayo" | "hielo"| "santo" | "oscuridad";
export type CardType = "arma" | "consumible" | "invocacion";
export type Rareza = "principiante" | "comun" | "poco_comun" | "aventurero" | "raro" | "unico" | "legendario" | "corrupto" | "mitico" | "soberano";

export interface RunicCardProps {
  name: string;
  elemento: ElementType;
  type: CardType;
  description: string;
  power: number;
  rareza: Rareza;
  image: string;
}

/* ================= CONFIG ================= */
const elementoConfig = {
  fuego: { color: "#f97316", text: "text-orange-400", icon: "🔥" },
  agua: { color: "#3b82f6", text: "text-blue-400", icon: "💧" },
  viento: { color: "#34d399", text: "text-emerald-400", icon: "🌪️" },
  tierra: { color: "#a16207", text: "text-yellow-600", icon: "🪨" },
  rayo: { color: "#facc15", text: "text-yellow-400", icon: "⚡" },
  hielo: { color: "#60a5fa", text: "text-sky-400", icon: "❄️" },
  santo: { color: "#fbbf24", text: "text-yellow-300", icon: "✨" },
  oscuridad: { color: "#8b5cf6", text: "text-purple-400", icon: "🌑" },
};

const rarezaConfig: Record<Rareza, string> = {
  principiante: "#222", comun: "#444", poco_comun: "#8b5a2b", aventurero: "#c0c0c0",
  raro: "#2563eb", unico: "#7c3aed", legendario: "#f59e0b", corrupto: "#dc2626",
  mitico: "#facc15", soberano: "#9333ea",
};

const RUNAS = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ"];

const typeRune: Record<CardType, string> = {
  arma: "ᛉ",
  consumible: "ᛈ",
  invocacion: "ᛇ",
};

/* ================= DECORACIONES ================= */

function CardCorners() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <div className="absolute top-0 left-0 w-10 h-10 bg-[#1a1a1a]" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
      <div className="absolute top-0 right-0 w-10 h-10 bg-[#1a1a1a]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
      <div className="absolute bottom-0 left-0 w-10 h-10 bg-[#1a1a1a]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
      <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#1a1a1a]" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
    </div>
  );
}

function NodePoints() {
  return (
    <div className="absolute w-full flex justify-between px-12 pointer-events-none z-10">
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => <div key={i} className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />)}
      </div>
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => <div key={i} className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />)}
      </div>
    </div>
  );
}

/* ================= COMPONENTE ================= */

export default function RunicCard({ name, elemento, type, description, power, rareza, image }: RunicCardProps) {
  const [flipped, setFlipped] = useState(false);
  const glow = rarezaConfig[rareza];
  const element = elementoConfig[elemento];

  return (
    <div className="w-[300px] h-[480px] cursor-pointer" style={{ perspective: "1400px" }} onClick={() => setFlipped(!flipped)}>
      <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "rotate-y-180" : ""}`}>
        
        {/* ================= REVERSO (POSTERIOR) ================= */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="relative w-full h-full rounded-2xl p-[3px]" 
               style={{ background: `linear-gradient(145deg, ${glow}, #000)`, boxShadow: `0 30px 80px ${glow}88` }}>
            <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-[#0b0b0b] to-[#030303] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-3 border border-white/10 rounded-xl" />
              
              <div className="absolute w-[180px] h-[180px] rounded-full border-2 border-white/35 flex items-center justify-center">
                <div className="absolute w-full h-full animate-[spin_26s_linear_infinite]">
                  {RUNAS.map((r, i) => (
                    <span key={i} className="absolute left-1/2 top-1/2 text-white/90 text-2xl" 
                      style={{ transform: `translate(-50%, -50%) rotate(${(360 / RUNAS.length) * i}deg) translateY(-74px)` }}>{r}</span>
                  ))}
                </div>
                
                <div className="w-[110px] h-[110px] rounded-full border border-white/30 flex items-center justify-center">
                  <div className="w-[82px] h-[82px] rounded-full border border-white/40 flex items-center justify-center text-5xl text-white z-10"
                    style={{ textShadow: `0 0 28px ${glow}` }}>
                    {typeRune[type]}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FRENTE (INFORMACIÓN) ================= */}
        <div className="absolute inset-0 rotate-y-180 [backface-visibility:hidden]">
          <div className="relative w-full h-full rounded-2xl p-[3px]" style={{ background: `linear-gradient(160deg, ${glow}, #000)` }}>
            <div className="relative w-full h-full rounded-xl bg-[#0f0f0f] p-4 flex flex-col items-center overflow-hidden">
              
              <CardCorners />

              {/* IMAGEN SUPERIOR CON RUNAS GIRANDO */}
              <div className="relative w-[180px] h-[180px] shrink-0 mt-2 flex items-center justify-center">
                <div className="absolute w-full h-full animate-[spin_35s_linear_infinite]">
                  {RUNAS.map((r, i) => (
                    <span key={i} className="absolute left-1/2 top-1/2 text-white/50 text-lg" 
                      style={{ transform: `translate(-50%, -50%) rotate(${(360 / RUNAS.length) * i}deg) translateY(-80px)`, color: element.color }}>{r}</span>
                  ))}
                </div>
                <div className="w-[130px] h-[130px] rounded-full border border-white/20 overflow-hidden bg-black z-10 shadow-lg">
                   <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* ELEMENTO + NODOS + RUNAS GIRANDO (CIRCULO INFERIOR) */}
              <div className="relative w-full h-[100px] shrink-0 flex items-center justify-center">
                <NodePoints />
                <div className="relative w-[90px] h-[90px] flex items-center justify-center">
                    {/* ANILLO DE RUNAS GIRATORIAS PARA EL ELEMENTO */}
                    <div className="absolute w-full h-full animate-[spin_20s_linear_infinite_reverse]">
                       {RUNAS.slice(0, 8).map((r, i) => (
                        <span key={i} className="absolute left-1/2 top-1/2 text-white/30 text-[10px]" 
                          style={{ transform: `translate(-50%, -50%) rotate(${(360 / 8) * i}deg) translateY(-40px)` }}>{r}</span>
                       ))}
                    </div>
                    {/* CIRCULO DEL ELEMENTO */}
                    <div className="w-[60px] h-[60px] rounded-full border border-white/20 flex items-center justify-center text-3xl bg-black/60 shadow-inner z-10"
                         style={{ color: element.color, textShadow: `0 0 12px ${element.color}` }}>
                        {element.icon}
                    </div>
                </div>
              </div>

              {/* TEXTOS Y PODER */}
              <div className="flex-1 flex flex-col items-center text-center w-full z-10">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-1">{name}</h2>
                <div className="h-[1px] w-16 bg-white/20 mb-3" />
                
                <div className="px-5 h-[50px] overflow-hidden mb-2 text-center">
                  <p className="text-[11px] text-white/50 italic leading-tight">
                    {description}
                  </p>
                </div>

                <div className="mt-auto mb-2 text-center">
                  <p className="text-[12px] text-white/40 uppercase tracking-widest mb-[-4px]">poder</p>
                  <div className="text-3xl font-black italic tracking-tighter" style={{ color: element.color, textShadow: `0 0 15px ${element.color}44` }}>
                    {power}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}