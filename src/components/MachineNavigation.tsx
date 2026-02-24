"use client";

import React, { useState, useRef } from "react";

interface Section {
  id: string;
  nome: string;
  url_imagem?: string;
}

interface NavigationProps {
  sections: Section[];
}

const MachineNavigation: React.FC<NavigationProps> = ({ sections }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!sections || sections.length === 0) return null;

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / sections.length;
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  const createSlug = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <section id="machine-navigation" className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-dark mb-12 uppercase">
          Navegação de Máquinas
        </h2>

        <div className="relative">
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-dark text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition -ml-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 pb-4 scroll-smooth snap-x snap-mandatory px-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sections.map((secao) => (
              <a
                key={secao.id}
                href={`#${createSlug(secao.nome)}`}
                className="flex-shrink-0 w-72 bg-white border-black border-2 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer snap-center"
              >
                <img
                  src={secao.url_imagem || "/images/placeholder.png"}
                  alt={secao.nome}
                  className="w-full h-40 object-cover border-b-2 border-black"
                />
                <div className="p-4 text-center bg-yellow-400">
                  <p className="font-bold text-dark text-lg uppercase">
                    {secao.nome}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-dark text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition -mr-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MachineNavigation;