import { useState, useCallback } from 'react';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatPanel } from '@/components/ChatPanel';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { DEFAULT_MODEL } from '@/data/models';

export interface Conversation {
  id: string;
  title: string;
  model: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  model?: string;
  createdAt: string;
}

export default function Index() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentModel, setCurrentModel] = useState(DEFAULT_MODEL);

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId) || null;

  const handleNewChat = useCallback(() => {
    const newConv: Conversation = {
      id: crypto.randomUUID(),
      title: 'New conversation',
      model: currentModel,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setConversations((prev) => [newConv, ...prev]);
    setSelectedConversationId(newConv.id);
    setSidebarOpen(false);
  }, [currentModel]);

  const handleSelectConversation = useCallback((id: string) => {
    setSelectedConversationId(id);
    setSidebarOpen(false);
  }, []);

  const handleDeleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (selectedConversationId === id) {
      setSelectedConversationId(null);
    }
  }, [selectedConversationId]);

  const handleUpdateConversation = useCallback((id: string, updates: Partial<Conversation>) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c))
    );
  }, []);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!selectedConversationId) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        createdAt: new Date().toISOString(),
      };

      // Add user message
      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversationId
            ? {
                ...c,
                messages: [...c.messages, userMessage],
                updatedAt: new Date().toISOString(),
                title: c.messages.length === 0 ? content.slice(0, 50) : c.title,
              }
            : c
        )
      );

      // Simulate AI response using Puter.js
      try {
        const conv = conversations.find((c) => c.id === selectedConversationId);
        const history = conv ? conv.messages : [];

        // Use Puter AI chat
        const puter = (window as any).puter;
        if (puter && puter.ai) {
          const response = await puter.ai.chat(content, {
            model: currentModel,
            stream: false,
          });

          const aiContent = typeof response === 'string'
            ? response
            : response?.message?.content || response?.text || 'I could not generate a response.';

          const assistantMessage: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: aiContent,
            model: currentModel,
            createdAt: new Date().toISOString(),
          };

          setConversations((prev) =>
            prev.map((c) =>
              c.id === selectedConversationId
                ? { ...c, messages: [...c.messages, assistantMessage], updatedAt: new Date().toISOString() }
                : c
            )
          );
        } else {
          // Fallback demo response
          const assistantMessage: Message = {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: `*The fox spirit stirs...*\n\nI sense your message, but my connection to the ethereal realm (Puter.js) has not yet been established. Please ensure you are running this within the Puter environment.\n\nYour message was: "${content}"`,
            model: currentModel,
            createdAt: new Date().toISOString(),
          };

          setConversations((prev) =>
            prev.map((c) =>
              c.id === selectedConversationId
                ? { ...c, messages: [...c.messages, assistantMessage], updatedAt: new Date().toISOString() }
                : c
            )
          );
        }
      } catch (error) {
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'The fox spirit encountered an error while processing your request. Please try again.',
          model: currentModel,
          createdAt: new Date().toISOString(),
        };

        setConversations((prev) =>
          prev.map((c) =>
            c.id === selectedConversationId
              ? { ...c, messages: [...c.messages, errorMessage], updatedAt: new Date().toISOString() }
              : c
          )
        );
      }
    },
    [selectedConversationId, currentModel, conversations]
  );

  const handleStreamMessage = useCallback(
    async (content: string, onChunk: (chunk: string) => void): Promise<string> => {
      if (!selectedConversationId) return '';

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        createdAt: new Date().toISOString(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversationId
            ? {
                ...c,
                messages: [...c.messages, userMessage],
                updatedAt: new Date().toISOString(),
                title: c.messages.length === 0 ? content.slice(0, 50) : c.title,
              }
            : c
        )
      );

      let fullResponse = '';

      try {
        const puter = (window as any).puter;
        if (puter && puter.ai) {
          const response = await puter.ai.chat(content, {
            model: currentModel,
            stream: true,
          });

          for await (const part of response) {
            if (part?.text) {
              fullResponse += part.text;
              onChunk(part.text);
            }
          }
        } else {
          const fallback = `*The fox spirit awakens...*\n\nI hear your words echoing through the mist. The ethereal connection (Puter.js) awaits initialization. Your message: "${content}"`;
          for (const char of fallback) {
            fullResponse += char;
            onChunk(char);
            await new Promise((r) => setTimeout(r, 15));
          }
        }
      } catch {
        const errorText = 'The fox spirit lost connection to the ethereal realm. Please try again.';
        fullResponse = errorText;
        onChunk(errorText);
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: fullResponse,
        model: currentModel,
        createdAt: new Date().toISOString(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === selectedConversationId
            ? { ...c, messages: [...c.messages, assistantMessage], updatedAt: new Date().toISOString() }
            : c
        )
      );

      return fullResponse;
    },
    [selectedConversationId, currentModel, conversations]
  );

  return (
    <div className="flex h-screen overflow-hidden noise-overlay relative dark">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <ChatSidebar
        conversations={conversations}
        selectedConversationId={selectedConversationId}
        onSelectConversation={handleSelectConversation}
        onNewChat={handleNewChat}
        onDeleteConversation={handleDeleteConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {selectedConversation ? (
          <ChatPanel
            conversation={selectedConversation}
            currentModel={currentModel}
            onModelChange={setCurrentModel}
            onSendMessage={handleStreamMessage}
            onToggleSidebar={() => setSidebarOpen((o) => !o)}
          />
        ) : (
          <WelcomeScreen
            currentModel={currentModel}
            onModelChange={setCurrentModel}
            onNewChat={handleNewChat}
            onToggleSidebar={() => setSidebarOpen((o) => !o)}
          />
        )}
      </div>
    </div>
  );
}