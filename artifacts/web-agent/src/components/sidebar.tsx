import { useLocation } from "wouter";
import { 
  useListConversations, 
  useCreateConversation, 
  useDeleteConversation,
  getListConversationsQueryKey
} from "@vilelaia/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare, Trash2, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export function Sidebar({ currentConversationId }: { currentConversationId: number | null }) {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  const { data: conversations, isLoading } = useListConversations();
  
  const createConversation = useCreateConversation();
  const deleteConversation = useDeleteConversation();

  const handleNewConversation = () => {
    createConversation.mutate(
      { data: { title: "Nova conversa" } },
      {
        onSuccess: (data: any) => {
          queryClient.invalidateQueries({ queryKey: getListConversationsQueryKey() });
          setLocation(`/c/${data.id}`);
        }
      }
    );
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    deleteConversation.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListConversationsQueryKey() });
          if (currentConversationId === id) {
            setLocation("/");
          }
        }
      }
    );
  };

  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar flex flex-col h-full flex-shrink-0">
      <div className="p-4 flex items-center gap-2 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground">
          <Code2 size={20} />
        </div>
        <div className="font-semibold text-sidebar-foreground truncate">Agente Vilela</div>
      </div>
      
      <div className="p-4">
        <Button 
          onClick={handleNewConversation} 
          className="w-full justify-start gap-2" 
          disabled={createConversation.isPending}
        >
          <Plus size={16} />
          Nova conversa
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 pb-4">
          {isLoading ? (
            <div className="px-2 py-4 text-sm text-muted-foreground text-center">Carregando...</div>
          ) : conversations?.length === 0 ? (
            <div className="px-2 py-4 text-sm text-muted-foreground text-center">Nenhuma conversa</div>
          ) : (
            conversations?.map((conv: any) => (
              <div
                key={conv.id}
                onClick={() => setLocation(`/c/${conv.id}`)}
                className={cn(
                  "group flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm transition-colors",
                  currentConversationId === conv.id 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <MessageSquare size={16} className="flex-shrink-0 text-muted-foreground" />
                  <span className="truncate">{conv.title}</span>
                </div>
                <button
                  onClick={(e) => handleDelete(e, conv.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-destructive transition-opacity"
                  title="Excluir conversa"
                  disabled={deleteConversation.isPending}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
