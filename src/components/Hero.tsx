"use client";

import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-dark to-black py-16 md:py-24"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            BEM-VINDO À
            <br />
            <span className="text-white">NICCO</span>
            <br />
            <span className="text-white">MÁQUINAS</span>
          </h1>
          <p className="text-white text-lg mb-6">
            Seu projeto no{" "}
            <span className="text-primary font-bold">ritmo certo!</span>
          </p>
          <p className="text-gray-400 mb-8">
            Máquinas selecionadas, entrega ágil e suporte especializado.
          </p>
          <p className="text-primary font-bold text-xl mb-8">
            PENSOU MÁQUINA, PENSOU NICCO!
          </p>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-primary text-dark px-8 py-3 rounded font-bold hover:bg-yellow-300 transition">
              VER MÁQUINAS
            </button>
            <button className="border-2 border-primary text-primary px-8 py-3 rounded font-bold hover:bg-primary hover:text-dark transition">
              💬 FALE CONOSCO
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop"
            alt="Escavadeira"
            className="rounded-lg w-full object-cover h-96"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
