"use client";

import React from "react";

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-primary relative pb-6">
          GILSON NICCO
          <div className="w-24 h-1 bg-primary absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-12">
          <div className="flex justify-center">
            <div className="w-80 h-80 border-4 border-primary rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                alt="Gilson Nicco"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              <span className="font-bold text-primary">Gilson Nicco</span>,
              empresário e apaixonado por máquinas pesadas, é o fundador da
              Nicco Máquinas. Com mais de 20 anos de experiência no setor, ele
              transformou sua paixão em um negócio de referência no mercado de
              equipamentos pesados.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Sua trajetória começou como operador de máquinas, onde desenvolveu
              um profundo conhecimento técnico que hoje é o diferencial da
              empresa. Gilson acredita que cada máquina precisa ser
              cuidadosamente avaliada antes de ser oferecida aos clientes.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">
              A <span className="font-bold text-primary">Nicco Máquinas</span>{" "}
              nasceu com o propósito de oferecer equipamentos de qualidade com
              transparência e honestidade, valores que Gilson considera
              essenciais em cada negociação.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">20+</p>
                <p className="text-gray-400 text-sm">Anos de Experiência</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-gray-400 text-sm">Máquinas Vendidas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-gray-400 text-sm">Compromisso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
