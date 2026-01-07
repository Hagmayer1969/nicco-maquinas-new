"use client";

import React from "react";

interface Category {
  id: string;
  label: string;
  image: string;
}

const MachineNavigation: React.FC = () => {
  const categories: Category[] = [
    {
      id: "florestal",
      label: "FLORESTAIS",
      image: "/images/FLORESTAL.png",
    },
    {
      id: "escavadeiras",
      label: "ESCAVADEIRAS",
      image: "/images/escavadeira.png",
        
    },
    {
      id: "retro",
      label: "RETROESCAVADEIRAS",
      image: "/images/RETRO.png",
        
    },
    {
      id: "pa-carregadeira",
      label: "PÁ-CARREGADEIRAS",
      image: "/images/PÁCARRE.png",
        
    },
    {
      id: "escavadeiras-florestais",
      label: "ESCAVADEIRAS FLORESTAIS",
      image: "/images/PÁCARRE.png",
        
    },
  ];

  return (
    <section id="maquinas" className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-dark mb-12">
          NAVEGAÇÃO DE MÁQUINAS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="bg-yellow border-black border-2 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.label}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <p className="font-bold text-dark text-lg">{category.label}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachineNavigation;
