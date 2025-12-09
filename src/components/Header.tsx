"use client";

import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-dark sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-dark w-12 h-12 rounded-lg flex items-center justify-center font-bold text-2xl">
            N
          </div>
          <span className="text-primary font-bold text-lg hidden sm:inline">
            NICCO MÁQUINAS
          </span>
        </div>
        <nav className="flex gap-6 items-center text-primary">
          <a
            href="#home"
            className="hover:text-yellow-300 transition text-sm md:text-base"
          >
            HOME
          </a>
          <a
            href="#maquinas"
            className="hover:text-yellow-300 transition text-sm md:text-base"
          >
            MÁQUINAS
          </a>
          <a
            href="#sobre"
            className="hover:text-yellow-300 transition text-sm md:text-base"
          >
            SOBRE NÓS
          </a>
          <button className="bg-primary text-dark px-4 py-2 rounded font-bold hover:bg-yellow-300 transition text-sm md:text-base flex items-center gap-2">
            <span>💬</span> Fale conosco
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
