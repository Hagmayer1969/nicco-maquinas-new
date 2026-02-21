"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MachineNavigation from "@/components/MachineNavigation";
import MachineSection from "@/components/MachineSection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import AddMachineForm from "@/components/AddMachineForm";

const Index = () => {
  const [machines, setMachines] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]); // Estado para as categorias
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // 1. Buscamos todas as seções primeiro para garantir a ordem
      const { data: sectionsData } = await supabase
        .from("secoes")
        .select("*")
        .order("nome", { ascending: true });

      // 2. Buscamos as máquinas
      const { data: machinesData, error } = await supabase
        .from("maquinas")
        .select(`*, secoes (id, nome)`);

      if (error) throw error;

      setSections(sectionsData || []);
      setMachines(machinesData || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-primary animate-pulse font-bold text-xl">CARREGANDO...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background text-white">
      <Header />
      <main>
        <Hero />
        <MachineNavigation />

        {/* 3. A MÁGICA ACONTECE AQUI: 
            Fazemos um loop em todas as seções que existem no banco.
            Para cada seção, filtramos as máquinas dela. */}
        {sections.map((secao) => {
          const machinesInThisSection = machines.filter(
            (m) => m.secao_id === secao.id
          );

          // Só renderiza a seção se ela tiver pelo menos uma máquina
          if (machinesInThisSection.length === 0) return null;

          return (
            <MachineSection
              key={secao.id}
              id={secao.nome.toLowerCase().replace(/\s+/g, "-")} // Cria um ID amigável para o menu
              title={secao.nome.toUpperCase()}
              machines={machinesInThisSection}
            />
          );
        })}

        <About />
        <AddMachineForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;