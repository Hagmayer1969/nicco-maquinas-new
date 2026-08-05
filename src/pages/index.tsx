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

const FALLBACK_SECTIONS = [
  { id: "fallback-1", nome: "Escavadeira", url_imagem: "/images/escava/esca01.jpeg" },
  { id: "fallback-2", nome: "Moto Niveladora", url_imagem: "/images/motoniveladora/moto1.jpeg" },
  { id: "fallback-3", nome: "Rolo Compactador", url_imagem: "/images/rolo/rolo01.jpeg" },
  { id: "fallback-4", nome: "Pá Carregadeira", url_imagem: "/images/pa-carre/pa01.jpeg" },
];

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
        .select(`*, secoes (id, nome)`)
        .order("created_at", { ascending: false });

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
        <MachineNavigation sections={sections.length > 0 ? sections : FALLBACK_SECTIONS} />

        {(sections.length > 0 ? sections : FALLBACK_SECTIONS).map((secao) => {
          const machinesInThisSection = machines.filter(
            (m) => m.secao_id === secao.id
          );

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