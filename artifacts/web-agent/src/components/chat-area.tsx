import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useListMessages,
  getListMessagesQueryKey,
  useGetConversation
} from "@vilelaia/api-client-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";

export function ChatArea({ conversationId }: { conversationId: number }) {
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: conversation } = useGetConversation(conversationId);
  const { data: messages, isLoading } = useListMessages(conversationId);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const content = input.trim();
    setInput("");
    
    // Add optimistic user message to cache
    const currentMessages = queryClient.getQueryData<any>(getListMessagesQueryKey(conversationId)) || [];
    const optimisticMessage = {
      id: Date.now(),
      conversationId,
      role: "user",
      content,
      createdAt: new Date().toISOString()
    };
    
    queryClient.setQueryData(getListMessagesQueryKey(conversationId), [...currentMessages, optimisticMessage]);

    setIsStreaming(true);
    setStreamingContent("");

    try {
      const apiUrl = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api/conversations/${conversationId}/messages`
        : `/api/conversations/${conversationId}/messages`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar mensagem');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let done = false;
        let text = "";
        
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') break;
                try {
                  const parsed = JSON.parse(data);
                  if (parsed.content) {
                    text += parsed.content;
                    setStreamingContent(text);
                  }
                  if (parsed.error) {
                    console.error('Erro do servidor:', parsed.error);
                  }
                } catch (e) {
                  // Ignore parsing errors for incomplete chunks
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Erro no streaming:', error);
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
      queryClient.invalidateQueries({ queryKey: getListMessagesQueryKey(conversationId) });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="border-b border-border p-4 flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <h2 className="font-semibold">{conversation?.title || "Carregando..."}</h2>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6"
      >
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-muted-foreground">Carregando mensagens...</span>
          </div>
        ) : (
          <>
            {messages?.map((msg: any) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            
            {isStreaming && streamingContent ? (
              <MessageBubble 
                message={{
                  id: -1,
                  conversationId,
                  role: "assistant",
                  content: streamingContent,
                  createdAt: new Date().toISOString()
                }} 
              />
            ) : isStreaming ? (
              <div className="flex justify-start">
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-sm">
                  <TypingIndicator />
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>

      <div className="p-4 bg-background">
        <form 
          onSubmit={handleSubmit}
          className="relative max-w-4xl mx-auto flex items-end gap-2 bg-card border border-border rounded-xl p-2 shadow-sm focus-within:ring-1 focus-within:ring-ring"
        >
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            className="min-h-[44px] max-h-32 resize-none border-0 focus-visible:ring-0 shadow-none bg-transparent p-3 py-2"
            disabled={isStreaming}
          />
          <Button 
            type="submit" 
            size="icon" 
            className="shrink-0 rounded-lg h-[44px] w-[44px]"
            disabled={!input.trim() || isStreaming}
          >
            <SendHorizontal size={20} />
          </Button>
        </form>
        <div className="text-center mt-2 text-xs text-muted-foreground">
          Agente Vilela pode cometer erros. Considere verificar as informações.
        </div>
      </div>
    </div>
  );
}
