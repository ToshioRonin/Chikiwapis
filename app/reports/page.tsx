"use client";
import { useState } from "react";

export default function ReportsPage() {
  const [formData, setFormData] = useState({
    asunto: "",
    categoria: "bug",
    descripcion: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reporte enviado:", formData);
    alert("Reporte enviado a los archivos ancestrales.");
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Fondo decorativo coherente con el Home */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-900/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-blue-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-2xl animate-in">
        {/* Encabezado de la página */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/40">
            Centro de Reportes
          </h1>
          <p className="text-xs tracking-[0.3em] opacity-50 uppercase mt-2 italic">
            Informa anomalías en la red rúnica
          </p>
        </div>

        {/* Formulario */}
        <form 
          onSubmit={handleSubmit}
          className="bg-surface/50 backdrop-blur-md border border-foreground/10 p-8 rounded-2xl shadow-2xl shadow-black"
        >
          <div className="space-y-6">
            
            {/* Campo: Asunto */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] opacity-60 mb-2 ml-1">
                Asunto del Reporte
              </label>
              <input
                type="text"
                required
                className="w-full bg-black/40 border border-foreground/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:opacity-20"
                placeholder="Ej: Error en animación de carta..."
                onChange={(e) => setFormData({...formData, asunto: e.target.value})}
              />
            </div>

            {/* Campo: Categoría */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] opacity-60 mb-2 ml-1">
                Naturaleza de la anomalía
              </label>
              <select 
                className="w-full bg-black/40 border border-foreground/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer"
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              >
                <option value="bug">Error Técnico (Bug)</option>
                <option value="feedback">Sugerencia de Mejora</option>
                <option value="typo">Error de Texto / Traducción</option>
                <option value="other">Otros asuntos arcanos</option>
              </select>
            </div>

            {/* Campo: Descripción */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] opacity-60 mb-2 ml-1">
                Detalles del Avistamiento
              </label>
              <textarea
                required
                rows={5}
                className="w-full bg-black/40 border border-foreground/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:opacity-20 resize-none"
                placeholder="Describe qué sucedió..."
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              />
            </div>

            {/* Botón Enviar */}
            <button
              type="submit"
              className="w-full group relative overflow-hidden rounded-lg bg-foreground py-4 text-background font-bold uppercase tracking-widest text-xs transition-all hover:tracking-[0.3em] active:scale-[0.98]"
            >
              <span className="relative z-10">Enviar Reporte</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}