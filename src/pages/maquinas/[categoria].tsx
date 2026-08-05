import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MachineModal from "@/components/MachineModal";

interface Machine {
  id: string;
  nome?: string;
  descricao?: string;
  valor_da_maquina?: string;
  url_imagem?: string;
  specs?: Record<string, string>;
  secao_id: string;
}

interface Section {
  id: string;
  nome: string;
  url_imagem?: string;
}

const createSlug = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-");

export default function CategoriaPage() {
  const router = useRouter();
  const { categoria } = router.query;

  const [sections, setSections] = useState<Section[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: sectionsData } = await supabase
          .from("secoes")
          .select("id, nome, url_imagem")
          .order("nome", { ascending: true });

        setSections(sectionsData || []);

        if (sectionsData && categoria) {
          const found = sectionsData.find(
            (s: Section) => createSlug(s.nome) === categoria
          );
          if (found) {
            setActiveSection(found);
            const { data: machinesData } = await supabase
              .from("maquinas")
              .select("*")
              .eq("secao_id", found.id);
            setMachines(machinesData || []);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoria) fetchData();
  }, [categoria]);

  const CARDS_PER_PAGE = 6;
  const totalPages = Math.ceil(machines.length / CARDS_PER_PAGE);
  const canGoNext = carouselIndex + CARDS_PER_PAGE < machines.length;
  const canGoPrev = carouselIndex > 0;
  
  const handleNextPage = () => {
    if (canGoNext) {
      setCarouselIndex(carouselIndex + CARDS_PER_PAGE);
    }
  };
  
  const handlePrevPage = () => {
    if (canGoPrev) {
      setCarouselIndex(carouselIndex - CARDS_PER_PAGE);
    }
  };
  
  const visibleMachines = machines.slice(carouselIndex, carouselIndex + CARDS_PER_PAGE);

  const getWhatsappLink = (machine: Machine) => {
    const mName = machine.nome || "Máquina";
    const mDesc = machine.descricao || "";
    const mPrice = machine.valor_da_maquina;

    let messageText = `Olá! Gostaria de mais informações sobre o equipamento:\n\n*${mName}*\n${mDesc}`;
    if (mPrice) messageText += `\nPreço: ${mPrice}`;
    const message = encodeURIComponent(messageText);
    return `https://wa.me/5541995208769?text=${message}`;
  };

  if (!hasMounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-primary animate-pulse font-bold text-xl">CARREGANDO...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-dark text-white">
      <Header />

      <div className="container mx-auto px-4 py-10 flex gap-8">
        {/* Sidebar fixo de categorias */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-primary font-bold text-lg uppercase mb-4 border-b border-primary pb-2">
              Categorias
            </h3>
            <nav className="flex flex-col gap-2">
              {sections.map((secao) => {
                const slug = createSlug(secao.nome);
                const isActive = slug === categoria;
                return (
                  <Link
                    key={secao.id}
                    href={`/maquinas/${slug}`}
                    className={`px-4 py-2 rounded font-semibold text-sm transition ${
                      isActive
                        ? "bg-primary text-dark"
                        : "bg-darkGray text-gray-300 hover:bg-primary hover:text-dark"
                    }`}
                  >
                    {secao.nome}
                  </Link>
                );
              })}
            </nav>
            <Link
              href="/"
              className="mt-6 flex items-center gap-2 text-gray-400 hover:text-primary text-sm transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar ao início
            </Link>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 min-w-0">
          {/* Menu mobile de categorias */}
          <div className="md:hidden mb-6 overflow-x-auto flex gap-2 pb-2" style={{ scrollbarWidth: "none" }}>
            {sections.map((secao) => {
              const slug = createSlug(secao.nome);
              const isActive = slug === categoria;
              return (
                <Link
                  key={secao.id}
                  href={`/maquinas/${slug}`}
                  className={`flex-shrink-0 px-4 py-2 rounded font-semibold text-xs transition ${
                    isActive
                      ? "bg-primary text-dark"
                      : "bg-darkGray text-gray-300"
                  }`}
                >
                  {secao.nome}
                </Link>
              );
            })}
          </div>

          <h1 className="text-3xl font-bold text-primary mb-2 uppercase">
            {activeSection?.nome || "Categoria"}
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            {machines.length} equipamento{machines.length !== 1 ? "s" : ""} disponível{machines.length !== 1 ? "is" : ""}
          </p>

          {machines.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              Nenhuma máquina cadastrada nesta categoria.
            </div>
          ) : (
            <div>
              {/* Carrossel com controles */}
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={handlePrevPage}
                  disabled={!canGoPrev}
                  className={`flex-shrink-0 p-2 rounded-full transition ${
                    canGoPrev
                      ? "bg-primary hover:bg-yellow-500 text-dark"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                  aria-label="Página anterior"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {visibleMachines.map((machine) => (
                      <div
                        key={machine.id}
                        className="bg-darkGray rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col"
                      >
                        {machine.url_imagem && (
                          <div 
                            className="w-full h-48 bg-gray-800 cursor-pointer overflow-hidden group"
                            onClick={() => setSelectedMachine(machine)}
                          >
                            <img
                              src={machine.url_imagem}
                              alt={machine.nome}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-4 flex flex-col flex-grow">
                          <h3 className="text-lg font-bold mb-2 text-primary">
                            {machine.nome}
                          </h3>
                          <p className="text-gray-400 mb-3 text-sm flex-grow">
                            {machine.descricao}
                          </p>

                          {machine.specs && (
                            <div className="mb-3 space-y-1">
                              {Object.entries(machine.specs).map(([key, value]) => (
                                <p key={key} className="text-xs text-gray-500">
                                  <span className="font-semibold">{key}:</span> {value}
                                </p>
                              ))}
                            </div>
                          )}

                          {machine.valor_da_maquina && (
                            <p className="text-lg font-bold text-primary mb-3">
                              {machine.valor_da_maquina}
                            </p>
                          )}

                          <a href={getWhatsappLink(machine)} className="mt-auto">
                            <button className="w-full bg-primary hover:bg-yellow-500 text-dark py-2 px-3 rounded font-bold transition flex items-center justify-center gap-2 text-sm">
                              <img
                                src="/images/wats.png"
                                className="w-8 h-8 object-contain"
                                alt="WhatsApp"
                              />
                              <span>CONSULTAR DISPONIBILIDADE</span>
                            </button>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={!canGoNext}
                  className={`flex-shrink-0 p-2 rounded-full transition ${
                    canGoNext
                      ? "bg-primary hover:bg-yellow-500 text-dark"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                  aria-label="Próxima página"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Indicador de página */}
              <div className="text-center mb-8 text-sm text-gray-400">
                Página {Math.floor(carouselIndex / CARDS_PER_PAGE) + 1} de {totalPages}
              </div>

              {/* Botão Ver Mais */}
              <div className="flex justify-center">
                <Link href={`/maquinas/${categoria}`}>
                  <button className="bg-primary hover:bg-yellow-500 text-dark font-bold py-3 px-10 rounded-lg text-base transition shadow-lg hover:shadow-xl">
                    VER MAIS
                  </button>
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />

      <MachineModal 
        machine={selectedMachine as any} 
        isOpen={!!selectedMachine} 
        onClose={() => setSelectedMachine(null)} 
        getWhatsappLink={(m) => getWhatsappLink(m as Machine)} 
      />
    </div>
  );
}
