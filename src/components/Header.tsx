"use client";

import React, { useState } from "react";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsappLink =
    "https://wa.me/5541988883793?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20as%20máquinas.";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-dark sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className=" text-dark rounded-lg flex items-center justify-center font-bold text-2xl">
            <img src="/images/logonm.png" className="w-40"/>
          </div>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex gap-8 items-center text-primary">
          <a
            href="#home"
            className="hover:text-yellow-300 transition font-semibold"
          >
            HOME
          </a>
          <a
            href="#maquinas"
            className="hover:text-yellow-300 transition font-semibold"
          >
            MÁQUINAS
          </a>
          <a
            href="#sobre"
            className="hover:text-yellow-300 transition font-semibold"
          >
            SOBRE NÓS
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-primary text-primary px-8 py-3 rounded font-bold hover:bg-primary hover:text-dark transition flex items-center gap-2"
          >
            <span><img src="/images/wats.png" className="w-8"/></span> Fale conosco
          </a>
        </nav>

        {/* Menu Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-4">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-primary text-primary px-3 py-3 rounded font-bold hover:bg-primary hover:text-dark transition flex items-center gap-2"
          >
            <img src="/images/wats.png" className="w-7"/>
          </a>
          <button
            onClick={toggleMenu}
            className="text-primary focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-dark border-t-2 border-primary">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4 text-primary">
            <a
              href="#home"
              className="hover:text-yellow-300 transition font-semibold py-2"
              onClick={() => setMenuOpen(false)}
            >
              HOME
            </a>
            <a
              href="#maquinas"
              className="hover:text-yellow-300 transition font-semibold py-2"
              onClick={() => setMenuOpen(false)}
            >
              MÁQUINAS
            </a>
            <a
              href="#sobre"
              className="hover:text-yellow-300 transition font-semibold py-2"
              onClick={() => setMenuOpen(false)}
            >
              SOBRE NÓS
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-dark px-4 py-2 rounded font-bold hover:bg-yellow-300 transition flex items-center gap-2 w-fit"
            >
              <span>
                <img src="images/wats.png" className="w-8"/>
              </span> Fale conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
