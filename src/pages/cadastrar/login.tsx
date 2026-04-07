"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    // Fazer logout ao entrar na página de login (limpa qualquer sessão anterior)
    clearSession();
  }, []);

  const clearSession = async () => {
    try {
      await supabase.auth.signOut();
      // Limpar localStorage e sessionStorage
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }
    } catch (err) {
      console.error("Erro ao limpar sessão:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error("Email e senha são obrigatórios");
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      // Aguardar um pouco para garantir que a sessão foi criada
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      router.push("/cadastrar");
    } catch (err: any) {
      console.error("Erro no login:", err);
      setError(
        err.message || "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-dark to-black flex items-center justify-center p-4">
      <div className="bg-dark border border-primary/20 p-8 rounded-2xl max-w-sm w-full shadow-2xl">
        <div className="text-center mb-8">
          <img
            src="/images/logonm.png"
            alt="Nicco Máquinas"
            className="w-32 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-primary uppercase tracking-widest">
            Admin
          </h1>
          <p className="text-gray-400 text-sm mt-2">Acesso restrito</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-100 text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs text-primary font-bold mb-2 uppercase">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-primary outline-none transition"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs text-primary font-bold mb-2 uppercase">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-800 border border-gray-700 rounded p-3 text-white focus:border-primary outline-none transition"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-dark font-bold py-3 rounded hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
          >
            {isLoading ? "ENTRANDO..." : "ENTRAR"}
          </button>
        </form>

        <p className="text-gray-400 text-xs text-center mt-6">
          Apenas administradores têm acesso a esta área.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
