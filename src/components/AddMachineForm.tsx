"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 

interface Section {
  id: string;
  nome: string;
}

const AddMachineForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [name, setName] = useState("");
  const [descricao, setDescricao] = useState(""); // Ajustado para bater com a imagem
  const [valorDaMaquina, setValorDaMaquina] = useState(""); // Ajustado para bater com a imagem
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [newSectionName, setNewSectionName] = useState("");
  const [isCreatingNewSection, setIsCreatingNewSection] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setIsAuthorized(false);
    setPasswordInput("");
    setMessage({ text: "", type: "" });
  };

  const fetchSections = async () => {
    const { data, error } = await supabase
      .from("secoes")
      .select("id, nome")
      .order("nome", { ascending: true });

    if (error) console.error("Erro ao buscar seções:", error);
    else setSections(data || []);
  };

  useEffect(() => {
    if (isAuthorized) fetchSections();
  }, [isAuthorized]);

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "Abba88@@22") { // Mude sua senha aqui
      setIsAuthorized(true);
    } else {
      alert("Senha incorreta!");
      setPasswordInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "Enviando dados...", type: "" });

    try {
      if (!imageFile) throw new Error("Selecione uma imagem!");

      let finalSectionId = selectedSectionId;

      // 1. Lógica de Seção
      if (isCreatingNewSection) {
        const { data: novaSecao, error: sError } = await supabase
          .from("secoes")
          .insert([{ nome: newSectionName }])
          .select()
          .single();

        if (sError) throw sError;
        finalSectionId = novaSecao.id;
      }

      if (!finalSectionId) throw new Error("Selecione uma categoria!");

      // 2. Upload da Imagem para o Bucket 'fotos'
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `maquina_${Date.now()}.${fileExt}`;
      
      const { error: uError } = await supabase.storage
        .from("fotos")
        .upload(fileName, imageFile);

      if (uError) throw uError;

      const { data: { publicUrl } } = supabase.storage
        .from("fotos")
        .getPublicUrl(fileName);

      // O CORRETO É ASSIM (sem mencionar o 'id'):
      const { error: mError } = await supabase
        .from("maquinas")
        .insert([{
          nome: name,
          descricao: descricao,
          valor_da_maquina: valorDaMaquina,
          url_imagem: publicUrl,
          secao_id: finalSectionId
        }]);

      if (mError) throw mError;

      setMessage({ text: "Cadastrada com sucesso no banco!", type: "success" });
      
      // Limpeza
      setName(""); setDescricao(""); setValorDaMaquina(""); setImageFile(null);
      setNewSectionName(""); setIsCreatingNewSection(false);
      fetchSections();

    } catch (error: any) {
      console.error(error);
      setMessage({ text: error.message || "Erro ao salvar.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-dark p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition border-2 border-dark"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-dark border border-primary/20 p-6 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-2xl text-white">
            
            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-primary transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!isAuthorized ? (
              <form onSubmit={handleVerifyPassword} className="py-8 text-center">
                <h3 className="text-primary text-xl font-bold mb-4">Painel Administrativo</h3>
                <input
                  type="password" autoFocus value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-center mb-4 focus:border-primary outline-none"
                  placeholder="Senha"
                />
                <button type="submit" className="w-full bg-primary text-dark font-bold py-3 rounded hover:bg-yellow-500 transition">
                  ENTRAR
                </button>
              </form>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Nova Máquina</h2>
                
                {message.text && (
                  <div className={`p-3 mb-4 rounded text-sm font-bold ${message.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-dark">
                  <input
                    type="text" required placeholder="Nome do Equipamento"
                    className="w-full bg-gray-100 rounded p-2 outline-none focus:ring-2 ring-primary"
                    value={name} onChange={(e) => setName(e.target.value)}
                  />
                  <textarea
                    required placeholder="Descrição (Ex: Ano, Horas...)"
                    className="w-full bg-gray-100 rounded p-2 outline-none h-24 focus:ring-2 ring-primary"
                    value={descricao} onChange={(e) => setDescricao(e.target.value)}
                  />
                  <input
                    type="text" placeholder="Valor (Ex: R$ 400.000,00)"
                    className="w-full bg-gray-100 rounded p-2 outline-none focus:ring-2 ring-primary"
                    value={valorDaMaquina} onChange={(e) => setValorDaMaquina(e.target.value)}
                  />
                  
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <label className="text-xs text-primary font-bold block mb-2">SELECIONAR CATEGORIA</label>
                    <select
                      value={isCreatingNewSection ? "new" : selectedSectionId}
                      onChange={(e) => {
                        if (e.target.value === "new") { setIsCreatingNewSection(true); setSelectedSectionId(""); }
                        else { setIsCreatingNewSection(false); setSelectedSectionId(e.target.value); }
                      }}
                      className="w-full bg-gray-100 rounded p-2 outline-none mb-2"
                    >
                      <option value="" disabled>Escolha a seção...</option>
                      {sections.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
                      <option value="new" className="font-bold">+ Criar Nova Seção</option>
                    </select>

                    {isCreatingNewSection && (
                      <input
                        type="text" placeholder="Nome da nova seção"
                        className="w-full bg-white border-2 border-primary rounded p-2 outline-none"
                        value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)}
                      />
                    )}
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-600">
                    <input
                      type="file" accept="image/*" required
                      className="text-xs text-gray-300 file:bg-primary file:rounded file:px-3 file:py-1 file:border-0 cursor-pointer"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  <button
                    type="submit" disabled={isLoading}
                    className="w-full bg-primary text-dark font-bold py-4 rounded-lg hover:bg-yellow-500 transition disabled:bg-gray-500 shadow-xl"
                  >
                    {isLoading ? "SALVANDO NO BANCO..." : "CADASTRAR MÁQUINA"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddMachineForm;