"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 

interface Section {
  id: string;
  nome: string;
}

interface Machine {
  id: string;
  nome: string;
  url_imagem: string;
  secao_id: string;
}

const AddMachineForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<"add" | "manage">("add");
  const [passwordInput, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Estados Cadastro
  const [name, setName] = useState("");
  const [descricao, setDescricao] = useState(""); 
  const [valorDaMaquina, setValorDaMaquina] = useState(""); 
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState("");
  const [newSectionName, setNewSectionName] = useState("");
  const [sectionImageFile, setSectionImageFile] = useState<File | null>(null);
  const [isCreatingNewSection, setIsCreatingNewSection] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setIsAuthorized(false);
    setPasswordInput("");
    setMessage({ text: "", type: "" });
    setActiveTab("add");
  };

  const fetchData = async () => {
    const { data: sData } = await supabase.from("secoes").select("id, nome").order("nome");
    const { data: mData } = await supabase.from("maquinas").select("id, nome, url_imagem, secao_id").order("nome");
    setSections(sData || []);
    setMachines(mData || []);
  };

  useEffect(() => {
    if (isAuthorized) fetchData();
  }, [isAuthorized]);

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "Abba88@@22") setIsAuthorized(true);
    else { alert("Senha incorreta!"); setPasswordInput(""); }
  };

  const handleDeleteMachine = async (id: string, url: string) => {
    if (!window.confirm("Confirmar exclusão desta máquina?")) return;
    setIsLoading(true);
    try {
      const fileName = url.split("/").pop();
      if (fileName) await supabase.storage.from("fotos").remove([fileName]);
      await supabase.from("maquinas").delete().eq("id", id);
      fetchData();
      alert("Excluída com sucesso!");
    } catch (err) { alert("Erro ao excluir."); }
    finally { setIsLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "Enviando dados...", type: "" });

    try {
      if (!imageFile) throw new Error("Selecione a imagem da máquina!");
      let finalSectionId = selectedSectionId;

      if (isCreatingNewSection) {
        if (!newSectionName || !sectionImageFile) throw new Error("Preencha os dados da nova seção!");
        const sExt = sectionImageFile.name.split(".").pop();
        const sName = `secao_${Date.now()}.${sExt}`;
        await supabase.storage.from("fotos").upload(sName, sectionImageFile);
        const { data: { publicUrl: sUrl } } = supabase.storage.from("fotos").getPublicUrl(sName);
        const { data: novaS } = await supabase.from("secoes").insert([{ nome: newSectionName, url_imagem: sUrl }]).select().single();
        finalSectionId = novaS.id;
      }

      if (!finalSectionId) throw new Error("Selecione uma categoria!");

      const mExt = imageFile.name.split(".").pop();
      const mName = `maquina_${Date.now()}.${mExt}`;
      await supabase.storage.from("fotos").upload(mName, imageFile);
      const { data: { publicUrl: mUrl } } = supabase.storage.from("fotos").getPublicUrl(mName);

      const { error: mError } = await supabase.from("maquinas").insert([{
        nome: name, descricao, valor_da_maquina: valorDaMaquina, url_imagem: mUrl, secao_id: finalSectionId
      }]);

      if (mError) throw mError;
      setMessage({ text: "Cadastrada com sucesso!", type: "success" });
      setName(""); setDescricao(""); setValorDaMaquina(""); setImageFile(null);
      setNewSectionName(""); setSectionImageFile(null); setIsCreatingNewSection(false);
      fetchData();
    } catch (error: any) { setMessage({ text: error.message, type: "error" }); }
    finally { setIsLoading(false); }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="fixed bottom-6 right-6 bg-primary text-dark p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition border-2 border-dark">
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
                <h3 className="text-primary text-xl font-bold mb-4 uppercase tracking-widest">Acesso Administrativo</h3>
                <input type="password" autoFocus value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-center mb-4 focus:border-primary outline-none" placeholder="Senha" />
                <button type="submit" className="w-full bg-primary text-dark font-bold py-3 rounded hover:bg-yellow-500 transition">ENTRAR</button>
              </form>
            ) : (
              <div>
                {/* ABAS */}
                <div className="flex gap-2 mb-8 bg-gray-800 p-1 rounded-lg">
                  <button 
                    onClick={() => setActiveTab("add")}
                    className={`flex-1 py-2 rounded-md font-bold text-sm transition ${activeTab === "add" ? "bg-primary text-dark" : "text-gray-400 hover:text-white"}`}
                  >
                    ADICIONAR NOVO
                  </button>
                  <button 
                    onClick={() => setActiveTab("manage")}
                    className={`flex-1 py-2 rounded-md font-bold text-sm transition ${activeTab === "manage" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"}`}
                  >
                    GERENCIAR ESTOQUE
                  </button>
                </div>

                {message.text && (
                  <div className={`p-3 mb-4 rounded text-sm font-bold ${message.type === 'success' ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'}`}>
                    {message.text}
                  </div>
                )}

                {/* ABA DE ADICIONAR */}
                {activeTab === "add" ? (
                  <form onSubmit={handleSubmit} className="space-y-4 text-dark">
                    <input type="text" required placeholder="Nome do Equipamento" className="w-full bg-gray-100 rounded p-2 outline-none" value={name} onChange={(e) => setName(e.target.value)} />
                    <textarea required placeholder="Descrição" className="w-full bg-gray-100 rounded p-2 outline-none h-24" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    <input type="text" placeholder="Valor (Ex: R$ 400.000,00)" className="w-full bg-gray-100 rounded p-2 outline-none" value={valorDaMaquina} onChange={(e) => setValorDaMaquina(e.target.value)} />
                    
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <label className="text-xs text-primary font-bold block mb-2 uppercase">Categoria</label>
                      <select value={isCreatingNewSection ? "new" : selectedSectionId} onChange={(e) => { setIsCreatingNewSection(e.target.value === "new"); setSelectedSectionId(e.target.value === "new" ? "" : e.target.value); }} className="w-full bg-gray-100 rounded p-2 outline-none mb-2">
                        <option value="" disabled>Escolha a seção...</option>
                        {sections.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
                        <option value="new" className="font-bold text-blue-600">+ Criar Nova Seção</option>
                      </select>

                      {isCreatingNewSection && (
                        <div className="mt-3 space-y-3 p-3 bg-gray-700 rounded-lg border border-primary/50">
                          <input type="text" placeholder="Nome da nova categoria" className="w-full bg-white rounded p-2 text-sm" value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} />
                          <input type="file" accept="image/*" className="text-[10px] text-white" onChange={(e) => setSectionImageFile(e.target.files?.[0] || null)} />
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-600">
                      <label className="text-xs text-primary font-bold block mb-1 uppercase">Foto da Máquina</label>
                      <input type="file" accept="image/*" required className="text-xs text-gray-300" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full bg-primary text-dark font-bold py-4 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50">
                      {isLoading ? "SALVANDO..." : "CADASTRAR EQUIPAMENTO"}
                    </button>
                  </form>
                ) : (
                  /* ABA DE GERENCIAR (EXCLUIR) */
                  <div className="space-y-6">
                    {sections.map(section => {
                      const sectionMachines = machines.filter(m => m.secao_id === section.id);
                      if (sectionMachines.length === 0) return null;
                      return (
                        <div key={section.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                          <h3 className="text-primary font-bold text-xs uppercase mb-3 border-b border-gray-700 pb-1">{section.nome}</h3>
                          <div className="space-y-2">
                            {sectionMachines.map(m => (
                              <div key={m.id} className="flex items-center justify-between bg-darkGray p-2 rounded">
                                <div className="flex items-center gap-3">
                                  <img src={m.url_imagem} className="w-10 h-10 object-cover rounded" alt="" />
                                  <span className="text-xs font-bold truncate w-32 uppercase">{m.nome}</span>
                                </div>
                                <button 
                                  onClick={() => handleDeleteMachine(m.id, m.url_imagem)}
                                  className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-3 py-2 rounded transition"
                                >
                                  EXCLUIR
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddMachineForm;