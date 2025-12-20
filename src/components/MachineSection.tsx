"use client";

import React, { useState } from "react";

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
  const [visibleCount, setVisibleCount] = useState(3);

  const showMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const showLess = () => {
    setVisibleCount(3);
  };

  return (
    <section id={id} className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-primary relative pb-6">
          {title}
          <div className="w-24 h-1 bg-primary absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {machines.slice(0, visibleCount).map((machine) => (
            <div
              key={machine.id}
              className="bg-darkGray rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden"
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
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {machine.name}
                </h3>
                <p className="text-gray-400 mb-4 text-sm">
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
                <button className="w-full bg-primary hover:bg-yellow-500 text-dark py-2 rounded font-bold transition flex items-center justify-center gap-2">
                  <span><img src="/images/wats.png" className="w-8"/></span> CONSULTAR DISPONIBILIDADE
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          {visibleCount < machines.length ? (
            <button
              onClick={showMore}
              className="bg-primary hover:bg-yellow-300 text-dark py-2 px-6 rounded font-bold transition "
            >
              Mostrar Mais
            </button>
          ) : (
            <button
              onClick={showLess}
              className="bg-primary hover:bg-yellow-300 text-dark py-2 px-6 rounded font-bold transition"
            >
              Mostrar Menos
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MachineSection;
