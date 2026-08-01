import { Plus, Trash2, MessageSquare, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Conversation } from '@/pages/Index';
import { getProviderFromModel, getModelDisplayName } from '@/data/models';

interface ChatSidebarProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  return (
    <aside
      className={`
        fixed md:relative z-30 md:z-auto
        w-72 md:w-80 bg-sidebar border-r border-sidebar-border
        flex flex-col h-screen
        transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      {/* Header */}
      <div className="p-4 md:p-5 border-b border-sidebar-border flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <h1 className="text-lg font-bold text-sidebar-foreground tracking-tight">
              Lisichka
            </h1>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-md text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <Button
          onClick={onNewChat}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 mr-2" />
          New conversation
        </Button>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1 px-3 py-3">
        {conversations.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sidebar-accent/50 flex items-center justify-center">
              <MessageSquare className="w-7 h-7 text-sidebar-foreground/30" />
            </div>
            <p className="text-sm text-sidebar-foreground/50 leading-relaxed">
              Begin your journey with the fox spirit
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {conversations.map((conv) => {
              const provider = getProviderFromModel(conv.model);
              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`
                    group relative p-3 rounded-xl cursor-pointer transition-all duration-200
                    ${
                      selectedConversationId === conv.id
                        ? 'bg-primary/10 border border-primary/20 shadow-sm'
                        : 'hover:bg-sidebar-accent/60 border border-transparent'
                    }
                  `}
                >
                  <div className="pr-8">
                    <div className="flex items-center gap-2 mb-1">
                      {provider && (
                        <img
                          src={provider.logo}
                          alt={provider.name}
                          className="w-3.5 h-3.5 rounded-sm object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      )}
                      <span className="font-medium text-sm leading-snug line-clamp-1 text-sidebar-foreground">
                        {conv.title}
                      </span>
                    </div>
                    <div className="text-xs text-sidebar-foreground/50 flex items-center gap-2">
                      <span>{conv.messages.length} msgs</span>
                      <span>·</span>
                      <span>{getModelDisplayName(conv.model)}</span>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conv.id);
                    }}
                    className="absolute top-2 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7 text-sidebar-foreground/40 hover:text-destructive"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-xs text-sidebar-foreground/40">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Puter AI Connected</span>
        </div>
      </div>
    </aside>
  );
}