"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_CHATS = [
  { id: 1, name: "Soberano Arkan", lastMsg: "Las runas están listas...", online: true, avatar: "A" },
  { id: 2, name: "Iniciado Erik", lastMsg: "¿Dónde consigo el Corazón de Gaia?", online: false, avatar: "E" },
];

export default function BubbleChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<typeof MOCK_CHATS[0] | null>(null);
  
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveChat(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={chatRef} className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      
      {/* --- VENTANA DE CHAT ACTIVA --- */}
      <AnimatePresence>
        {activeChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-80 h-[450px] bg-background border border-foreground/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl mb-2"
          >
            {/* Header */}
            <div className="p-4 border-b border-foreground/5 bg-foreground/[0.02] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_10px_rgba(147,51,234,0.3)]">
                  {activeChat.avatar}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">{activeChat.name}</span>
              </div>
              <button onClick={() => setActiveChat(null)} className="text-foreground/40 hover:text-foreground text-xs">✕</button>
            </div>

            {/* Mensajes */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
              <div className="self-start bg-foreground/5 p-3 rounded-2xl rounded-tl-none max-w-[85%] border border-foreground/5">
                <p className="text-[11px] text-foreground/70 italic leading-tight">Saludos, guerrero. ¿Has visto las nuevas cartas?</p>
              </div>
              <div className="self-end bg-purple-600/20 p-3 rounded-2xl rounded-tr-none max-w-[85%] border border-purple-500/30">
                <p className="text-[11px] text-foreground font-medium leading-tight">Aún no, estoy explorando el mazo rúnico ahora mismo.</p>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-foreground/5">
              <div className="bg-foreground/5 rounded-full px-4 py-2 text-[10px] text-foreground/30 border border-foreground/5 italic">
                Escribe un mensaje...
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LISTA DE CHATS --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="w-72 bg-background/95 border border-foreground/10 rounded-2xl shadow-2xl overflow-hidden mb-2 backdrop-blur-md"
          >
            <div className="p-4 border-b border-foreground/5 bg-foreground/[0.01]">
              <h3 className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/40">Comunicaciones del Clan</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {MOCK_CHATS.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => { setActiveChat(chat); setIsOpen(false); }}
                  className="p-4 flex items-center gap-4 hover:bg-purple-600/5 cursor-pointer transition-all border-b border-foreground/[0.02] last:border-0"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center font-bold text-xs">
                      {chat.avatar}
                    </div>
                    {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] font-bold text-foreground uppercase tracking-wider">{chat.name}</p>
                    <p className="text-[10px] text-foreground/40 truncate italic">{chat.lastMsg}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- BURBUJA FLOTANTE --- */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_30px_rgba(147,51,234,0.2)] relative overflow-hidden group border border-foreground/10"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <span className="relative z-10 text-xl group-hover:scale-110 transition-transform">
            {isOpen ? "✕" : "💬"} 
        </span>
      </motion.button>
    </div>
  );
}