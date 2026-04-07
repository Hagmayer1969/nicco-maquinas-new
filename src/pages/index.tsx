"use client";
//index
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MachineNavigation from "@/components/MachineNavigation";
import MachineSection from "@/components/MachineSection";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  const [machines, setMachines] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false); // Resolve erro de hidratação

  const fetchData = async () => {
    try {
      const { data: sectionsData } = await supabase
        .from("secoes")
        .select("id, nome, url_imagem")
        .order("nome", { ascending: true });

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
    setHasMounted(true);
    fetchData();
  }, []);

  // Evita o erro de Hydration (tela preta) no Pages Router
  if (!hasMounted) return null;

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
        {/* Agora o componente abaixo vai reconhecer a prop sections */}
        <MachineNavigation sections={sections} />

        {sections.map((secao) => {
          const machinesInThisSection = machines.filter(
            (m) => m.secao_id === secao.id
          );

          if (machinesInThisSection.length === 0) return null;

          return (
            <MachineSection
              key={secao.id}
              id={secao.nome.toLowerCase().replace(/\s+/g, "-")}
              title={secao.nome.toUpperCase()}
              machines={machinesInThisSection}
            />
          );
        })}

        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;