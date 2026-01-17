"use client";

import React, { useState, useRef } from "react";

interface Machine {
  id: string;
  name: string;
  description: string;
  price?: string;
  image?: string;
  specs?: Record<string, string>;
}

interface MachinesSectionProps {
  id: string;
  title: string;
  machines: Machine[];
}

const MachineSection: React.FC<MachinesSectionProps> = ({
  id,
  title,
  machines,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const whatsappLink =
    "https://wa.me/5541988883793?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20as%20máquinas.";

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / machines.length;
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : machines.length - 1;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < machines.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(newIndex);
  };

  return (
    <section id={id} className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-primary relative pb-6">
          {title}
          <div className="w-24 h-1 bg-primary absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
        </h2>

        <div className="relative mt-12">
          {/* Botão Anterior */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-dark p-3 rounded-full shadow-lg hover:bg-yellow-400 transition -ml-4"
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
            {machines.map((machine) => (
              <div
                key={machine.id}
                className="flex-shrink-0 w-80 bg-darkGray rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden snap-center flex flex-col"
              >
                {machine.image && (
                  <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                    <img
                      src={machine.image}
                      alt={machine.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-primary">
                    {machine.name}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm flex-grow">
                    {machine.description}
                  </p>
                  {machine.specs && (
                    <div className="mb-4 space-y-1">
                      {Object.entries(machine.specs).map(([key, value]) => (
                        <p key={key} className="text-xs text-gray-500">
                          <span className="font-semibold">{key}:</span> {value}
                        </p>
                      ))}
                    </div>
                  )}
                  {machine.price && (
                    <p className="text-lg font-bold text-primary mb-4">
                      {machine.price}
                    </p>
                  )}
                  <a href={whatsappLink} className="mt-auto">
                    <button className="w-full bg-primary hover:bg-yellow-500 text-dark py-2 px-3 rounded font-bold transition flex items-center justify-center gap-2">
                      <img
                        src="/images/wats.png"
                        className="w-10 h-10 object-contain"
                        alt="WhatsApp"
                      />
                      <span>CONSULTAR DISPONIBILIDADE</span>
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Botão Próximo */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-dark p-3 rounded-full shadow-lg hover:bg-yellow-400 transition -mr-4"
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
          {machines.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex ? "bg-primary" : "bg-gray-600"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachineSection;
