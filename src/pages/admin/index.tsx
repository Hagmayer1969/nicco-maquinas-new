"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

const AdminPanel = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState<"add" | "manage">("add");
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

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
        router.replace("/admin/login");
        return;
      }
      setIsAuthorized(true);
      fetchData();
      
      // Configurar logout automático após 30 minutos de inatividade
      const inactivityTimer = setTimeout(async () => {
        await supabase.auth.signOut();
        router.replace("/admin/login");
      }, 30 * 60 * 1000);
      
      return () => clearTimeout(inactivityTimer);
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      router.replace("/admin/login");
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const fetchData = async () => {
    try {
      const { data: sData } = await supabase
        .from("secoes")
        .select("id, nome")
        .order("nome");
      const { data: mData } = await supabase
        .from("maquinas")
        .select("id, nome, url_imagem, secao_id")
        .order("nome");
      setSections(sData || []);
      setMachines(mData || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsAuthorized(false);
      setIsCheckingAuth(true);
      await router.replace("/admin/login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      await router.replace("/admin/login");
    }
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
    } catch (err) {
      alert("Erro ao excluir.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSection = async (sectionId: string, sectionName: string) => {
    if (!window.confirm(`Deseja excluir a seção "${sectionName}" e TODAS as máquinas dentro dela? Esta ação não pode ser desfeita!`)) return;
    setIsLoading(true);
    try {
      // Pega todas as máquinas da seção
      const { data: machinesInSection } = await supabase
        .from("maquinas")
        .select("id, url_imagem")
        .eq("secao_id", sectionId);

      // Deleta todas as imagens das máquinas no Storage
      if (machinesInSection && machinesInSection.length > 0) {
        for (const machine of machinesInSection) {
          const fileName = machine.url_imagem.split("/").pop();
          if (fileName) {
            await supabase.storage.from("fotos").remove([fileName]);
          }
        }
        // Deleta todas as máquinas da seção no banco
        await supabase.from("maquinas").delete().eq("secao_id", sectionId);
      }

      // Deleta a seção
      await supabase.from("secoes").delete().eq("id", sectionId);
      fetchData();
      alert("Seção e todas as máquinas foram excluídas com sucesso!");
    } catch (err) {
      console.error("Erro ao excluir seção:", err);
      alert("Erro ao excluir seção.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "Enviando dados...", type: "" });

    try {
      if (!imageFile) throw new Error("Selecione a imagem da máquina!");
      let finalSectionId = selectedSectionId;

      if (isCreatingNewSection) {
        if (!newSectionName || !sectionImageFile)
          throw new Error("Preencha os dados da nova seção!");
        const sExt = sectionImageFile.name.split(".").pop();
        const sName = `secao_${Date.now()}.${sExt}`;
        await supabase.storage.from("fotos").upload(sName, sectionImageFile);
        const { data } = supabase.storage.from("fotos").getPublicUrl(sName);
        const { data: novaS } = await supabase
          .from("secoes")
          .insert([{ nome: newSectionName, url_imagem: data.publicUrl }])
          .select()
          .single();
        finalSectionId = novaS.id;
      }

      if (!finalSectionId) throw new Error("Selecione uma categoria!");

      const mExt = imageFile.name.split(".").pop();
      const mName = `maquina_${Date.now()}.${mExt}`;
      await supabase.storage.from("fotos").upload(mName, imageFile);
      const { data } = supabase.storage.from("fotos").getPublicUrl(mName);

      const { error: mError } = await supabase.from("maquinas").insert([
        {
          nome: name,
          descricao,
          valor_da_maquina: valorDaMaquina,
          url_imagem: data.publicUrl,
          secao_id: finalSectionId,
        },
      ]);

      if (mError) throw mError;
      setMessage({ text: "Cadastrada com sucesso!", type: "success" });
      setName("");
      setDescricao("");
      setValorDaMaquina("");
      setImageFile(null);
      setNewSectionName("");
      setSectionImageFile(null);
      setIsCreatingNewSection(false);
      fetchData();
    } catch (error: any) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-primary animate-pulse font-bold text-xl">
          VERIFICANDO ACESSO...
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-dark to-black text-white p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <img src="/images/logonm.png" alt="Nicco" className="w-32" />
            <div>
              <h1 className="text-3xl font-bold text-primary uppercase tracking-widest">
                Painel Admin
              </h1>
              <p className="text-gray-400 text-sm">Gerenciador de máquinas</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition"
          >
            LOGOUT
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-dark border border-primary/20 p-6 rounded-2xl shadow-2xl">
          {/* ABAS */}
          <div className="flex gap-2 mb-8 bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("add")}
              className={`flex-1 py-2 rounded-md font-bold text-sm transition ${
                activeTab === "add"
                  ? "bg-primary text-dark"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              ADICIONAR NOVO
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex-1 py-2 rounded-md font-bold text-sm transition ${
                activeTab === "manage"
                  ? "bg-red-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              GERENCIAR ESTOQUE
            </button>
          </div>

          {message.text && (
            <div
              className={`p-3 mb-4 rounded text-sm font-bold ${
                message.type === "success"
                  ? "bg-green-900 text-green-100"
                  : "bg-red-900 text-red-100"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* ABA DE ADICIONAR */}
          {activeTab === "add" ? (
            <form onSubmit={handleSubmit} className="space-y-4 text-dark">
              <input
                type="text"
                required
                placeholder="Nome do Equipamento"
                className="w-full bg-gray-100 rounded p-2 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                required
                placeholder="Descrição"
                className="w-full bg-gray-100 rounded p-2 outline-none h-24"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <input
                type="text"
                placeholder="Valor (Ex: R$ 400.000,00)"
                className="w-full bg-gray-100 rounded p-2 outline-none"
                value={valorDaMaquina}
                onChange={(e) => setValorDaMaquina(e.target.value)}
              />

              <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                <label className="text-xs text-primary font-bold block mb-2 uppercase">
                  Categoria
                </label>
                <select
                  value={isCreatingNewSection ? "new" : selectedSectionId}
                  onChange={(e) => {
                    setIsCreatingNewSection(e.target.value === "new");
                    setSelectedSectionId(
                      e.target.value === "new" ? "" : e.target.value
                    );
                  }}
                  className="w-full bg-gray-100 rounded p-2 outline-none mb-2"
                >
                  <option value="" disabled>
                    Escolha a seção...
                  </option>
                  {sections.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                  <option value="new" className="font-bold text-blue-600">
                    + Criar Nova Seção
                  </option>
                </select>

                {isCreatingNewSection && (
                  <div className="mt-3 space-y-3 p-3 bg-gray-700 rounded-lg border border-primary/50">
                    <input
                      type="text"
                      placeholder="Nome da nova categoria"
                      className="w-full bg-white rounded p-2 text-sm"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="text-[10px] text-white"
                      onChange={(e) =>
                        setSectionImageFile(e.target.files?.[0] || null)
                      }
                    />
                  </div>
                )}
              </div>

              <div className="bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-600">
                <label className="text-xs text-primary font-bold block mb-1 uppercase">
                  Foto da Máquina
                </label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  className="text-xs text-gray-300"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-dark font-bold py-4 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50"
              >
                {isLoading ? "SALVANDO..." : "CADASTRAR EQUIPAMENTO"}
              </button>
            </form>
          ) : (
            /* ABA DE GERENCIAR (EXCLUIR) */
            <div className="space-y-6">
              {sections.map((section) => {
                const sectionMachines = machines.filter(
                  (m) => m.secao_id === section.id
                );
                if (sectionMachines.length === 0) return null;
                return (
                  <div key={section.id} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                    <div className="flex justify-between items-center mb-3 pb-1 border-b border-gray-700">
                      <h3 className="text-primary font-bold text-xs uppercase">
                        {section.nome}
                      </h3>
                      <button
                        onClick={() => handleDeleteSection(section.id, section.nome)}
                        className="bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-bold px-3 py-1 rounded transition"
                      >
                        APAGAR SEÇÃO
                      </button>
                    </div>
                    <div className="space-y-2">
                      {sectionMachines.map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center justify-between bg-darkGray p-2 rounded"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={m.url_imagem}
                              className="w-10 h-10 object-cover rounded"
                              alt=""
                            />
                            <span className="text-xs font-bold truncate w-32 uppercase">
                              {m.nome}
                            </span>
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
      </div>
    </div>
  );
};

export default AdminPanel;
