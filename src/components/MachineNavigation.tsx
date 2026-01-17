"use client";

import React, { useState, useRef } from "react";

interface Category {
  id: string;
  label: string;
  image: string;
}

const MachineNavigation: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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
    {
      id: "motoniveladora",
      label: "MOTONIVELADORA",
      image: "/images/PÁCARRE.png",
    },
    {
      id: "seila1 ",
      label: "MOTONIVELADORA",
      image: "/images/PÁCARRE.png",
    },
    {
      id: "tratorDeEsteiras",
      label: "TRATOR DE ESTEIRAS",
      image: "/images/PÁCARRE.png",
    },
    {
      id: "caminhãoCaçamba ",
      label: "CAMINHÃO CAÇAMBA",
      image: "/images/PÁCARRE.png",
    },
  ];

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / categories.length;
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <section id="maquinas" className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-dark mb-12">
          NAVEGAÇÃO DE MÁQUINAS
        </h2>

        <div className="relative">
          {/* Botão Anterior */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-dark text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition -ml-4"
            aria-label="Anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Carrossel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 pb-4 scroll-smooth snap-x snap-mandatory px-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="flex-shrink-0 w-72 bg-yellow border-black border-2 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer snap-center"
              >
                <img
                  src={category.image}
                  alt={category.label}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <p className="font-bold text-dark text-lg">
                    {category.label}
                  </p>
                </div>
              </a>
            ))}
          </div>

          {/* Botão Próximo */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-dark text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition -mr-4"
            aria-label="Próximo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-6">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex ? "bg-dark" : "bg-gray-400"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachineNavigation;
