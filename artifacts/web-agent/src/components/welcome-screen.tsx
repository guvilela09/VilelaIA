import { useLocation } from "wouter";
import { useCreateConversation } from "@vilelaia/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListConversationsQueryKey } from "@vilelaia/api-client-react";
import { Code2 } from "lucide-react";

const SUGGESTIONS = [
  "Crie uma landing page para minha startup",
  "Qual a melhor stack para um SaaS?",
  "Como otimizar a conversão de uma LP?",
  "Componentes React para dashboard",
  "Arquitetura para um e-commerce escalável",
  "Melhores práticas de acessibilidade web"
];

export function WelcomeScreen() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const createConversation = useCreateConversation();

  const handleSuggestionClick = (prompt: string) => {
    createConversation.mutate(
      { data: { title: "Nova conversa" } },
      {
        onSuccess: async (data: any) => {
          queryClient.invalidateQueries({ queryKey: getListConversationsQueryKey() });

          const apiUrl = import.meta.env.VITE_API_URL
            ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/conversations/${data.id}/messages`
            : `/api/conversations/${data.id}/messages`;

          try {
            await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: prompt }),
            });
          } catch (e) {
            console.error("Failed to send initial message", e);
          }

          setLocation(`/c/${data.id}`);
        }
      }
    );
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-card h-full">
      <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground mb-6 shadow-lg">
        <Code2 size={32} />
      </div>
      <h1 className="text-3xl font-bold mb-2">Agente Vilela</h1>
      <p className="text-muted-foreground text-center max-w-md mb-10">
        Seu parceiro de engenharia sênior. Especialista em criar landing pages, sites e softwares web com precisão.
      </p>

      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-3">
        {SUGGESTIONS.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(suggestion)}
            className="p-4 text-left border border-border rounded-xl bg-background hover:bg-muted transition-all duration-200 text-sm font-medium hover:border-primary/50 disabled:opacity-50"
            disabled={createConversation.isPending}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
