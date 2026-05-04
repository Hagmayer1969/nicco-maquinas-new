"use client";

import React from "react";
import Link from "next/link";

interface Machine {
  id: string;
  name?: string;
  nome?: string;
  description?: string;
  descricao?: string;
  price?: string;
  valor_da_maquina?: string;
  image?: string;
  url_imagem?: string;
  specs?: Record<string, string>;
}

interface MachinesSectionProps {
  id: string;
  title: string;
  machines: Machine[];
}

const CARDS_LIMIT = 8;

const MOCK_CARD: Machine = {
  id: "mock",
  nome: "Equipamento Modelo",
  descricao: "Equipamento de alto desempenho para obras de grande porte. Entre em contato para mais informações.",
  valor_da_maquina: "Consulte o preço",
  url_imagem: "/images/escava/esca01.jpeg",
  specs: { "Peso Operacional": "20.000 kg", "Potência": "140 HP" },
};

const MachineSection: React.FC<MachinesSectionProps> = ({ id, title, machines }) => {
  const realMachines = machines || [];
  const padCount = Math.max(0, CARDS_LIMIT - realMachines.length);
  const mockPadding: Machine[] = Array.from({ length: padCount }, (_, i) => ({
    ...MOCK_CARD,
    id: `mock-${i}`,
  }));
  const displayMachines = [...realMachines, ...mockPadding];

  const getWhatsappLink = (machine: Machine) => {
    const mName = machine.nome || machine.name || "Máquina";
    const mDesc = machine.descricao || machine.description || "";
    const mPrice = machine.valor_da_maquina || machine.price;

    let messageText = `Olá! Gostaria de mais informações sobre o equipamento:\n\n*${mName}*\n${mDesc}`;
    if (mPrice) messageText += `\nPreço: ${mPrice}`;
    const message = encodeURIComponent(messageText);
    return `https://wa.me/5541995208769?text=${message}`;
  };

  const visibleMachines = displayMachines.slice(0, CARDS_LIMIT);

  return (
    <section id={id} className="py-12 bg-dark text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary relative pb-5">
          {title}
          <div className="w-20 h-1 bg-primary absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {visibleMachines.map((machine) => {
            const displayName = machine.nome || machine.name;
            const displayDesc = machine.descricao || machine.description;
            const displayPrice = machine.valor_da_maquina || machine.price;
            const displayImg = machine.url_imagem || machine.image;

            return (
              <div
                key={machine.id}
                className="bg-darkGray rounded-lg shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                {displayImg && (
                  <div className="w-full h-32 bg-gray-800">
                    <img
                      src={displayImg}
                      alt={displayName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-sm font-bold mb-1 text-primary leading-tight">
                    {displayName}
                  </h3>
                  <p className="text-gray-400 mb-2 text-xs flex-grow line-clamp-2">
                    {displayDesc}
                  </p>

                  {machine.specs && (
                    <div className="mb-2 space-y-0.5">
                      {Object.entries(machine.specs).map(([key, value]) => (
                        <p key={key} className="text-xs text-gray-500">
                          <span className="font-semibold">{key}:</span> {value}
                        </p>
                      ))}
                    </div>
                  )}

                  {displayPrice && (
                    <p className="text-sm font-bold text-primary mb-2">
                      {displayPrice}
                    </p>
                  )}

                  <a href={getWhatsappLink(machine)} className="mt-auto">
                    <button className="w-full bg-primary hover:bg-yellow-500 text-dark py-1.5 px-2 rounded font-bold transition flex items-center justify-center gap-1 text-xs">
                      <img
                        src="/images/wats.png"
                        className="w-6 h-6 object-contain"
                        alt="WhatsApp"
                      />
                      <span>CONSULTAR DISPONIBILIDADE</span>
                    </button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <Link href={`/maquinas/${id}`}>
            <button className="bg-primary hover:bg-yellow-500 text-dark font-bold py-3 px-10 rounded-lg text-base transition shadow-lg hover:shadow-xl">
              VER MAIS
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MachineSection;