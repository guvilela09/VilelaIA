import { useRoute, useLocation } from "wouter";
import { Sidebar } from "@/components/sidebar";
import { ChatArea } from "@/components/chat-area";
import { WelcomeScreen } from "@/components/welcome-screen";

export default function ChatPage() {
  const [match, params] = useRoute("/c/:id");
  const [, setLocation] = useLocation();
  const conversationId = match && params?.id ? parseInt(params.id, 10) : null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar currentConversationId={conversationId} />
      <main className="flex-1 flex flex-col min-w-0 relative">
        {conversationId ? (
          <ChatArea conversationId={conversationId} />
        ) : (
          <WelcomeScreen />
        )}
      </main>
    </div>
  );
}
