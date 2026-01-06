"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-lg flex items-center justify-center">
                <img src="/images/logonm.png" className="w-24"/>
              </div>
              <span className="text-primary font-bold text-lg">
                NICCO MÁQUINAS
              </span>
            </div>
            <p className="text-gray-400">
              Soluções em máquinas pesadas para construção e agricultura desde
              2020.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-primary">SERVIÇOS</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-primary transition">
                  Venda de Máquinas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Consultoria Especializada
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Avaliação de Equipamentos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition">
                  Intermediação de Negócios
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-primary">
              LINKS RÁPIDOS
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#home" className="hover:text-primary transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#maquinas" className="hover:text-primary transition">
                  Máquinas
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-primary transition">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 text-primary">CONTATO</h4>
            <p className="text-gray-400 mb-2">📍 Curitiba - PR</p>
            <p className="text-gray-400 mb-2">📞 (41) 98888-3793</p>
            <p className="text-gray-400 mb-4">📧 niccomaquinas@gmail.com</p>
            <p className="text-gray-400 mb-4">⏰ Seg-Sex: 8h às 18h</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-500">
          <p>© 2025 Nicco Máquinas. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
