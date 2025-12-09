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
      image:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=250&fit=crop",
    },
    {
      id: "escavadeiras",
      label: "ESCAVADEIRAS",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=250&fit=crop",
    },
    {
      id: "retro",
      label: "RETROESCAVADEIRAS",
      image:
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=250&fit=crop",
    },
    {
      id: "pa-carregadeira",
      label: "PÁ-CARREGADEIRAS",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=250&fit=crop",
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
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer"
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
