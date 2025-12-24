"use client";

import { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchInput() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null); // Referencia al contenedor total
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-end h-10 w-10 sm:w-64"
    >
      {/* Input de Búsqueda */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Buscar..."
        className={`
        absolute right-0 h-10 transition-all duration-300 ease-in-out
        bg-gray-100 dark:bg-white/5 rounded-full outline-none
        ${
            isOpen
            ? "w-full px-11 opacity-100 border border-gray-300 dark:border-white/10"
            : "w-0 opacity-0 pointer-events-none"
        }
        `}
      />

      {/* Botón / Lupa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative z-10 flex h-10 w-10 items-center justify-center rounded-full 
          transition-all duration-300 ease-in-out hover:bg-gray-200
          ${isOpen ? "mr-[calc(100%-40px)] text-gray-500" : "text-gray-700"}
        `}
        aria-label="Buscar"
      >
        <FiSearch className="h-5 w-5" />
      </button>
    </div>
  );
}
