import { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Menu, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ModelSelector } from '@/components/ModelSelector';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import type { Conversation, Message } from '@/pages/Index';
import { getProviderFromModel, getModelDisplayName } from '@/data/models';

interface ChatPanelProps {
  conversation: Conversation;
  currentModel: string;
  onModelChange: (model: string) => void;
  onSendMessage: (content: string, onChunk: (chunk: string) => void) => Promise<string>;
  onToggleSidebar: () => void;
}

export function ChatPanel({
  conversation,
  currentModel,
  onModelChange,
  onSendMessage,
  onToggleSidebar,
}: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation.messages, streamingContent]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || isStreaming) return;

    setInput('');
    setIsStreaming(true);
    setStreamingContent('');

    await onSendMessage(text, (chunk) => {
      setStreamingContent((prev) => prev + chunk);
    });

    setIsStreaming(false);
    setStreamingContent('');
  }, [input, isStreaming, onSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const provider = getProviderFromModel(currentModel);

  return (
    <div className="flex flex-col h-screen min-h-0">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 md:px-6 py-3 border-b border-border bg-card/80 backdrop-blur-sm shrink-0">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 rounded-md text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          {provider && (
            <img
              src={provider.logo}
              alt={provider.name}
              className="w-5 h-5 rounded-sm object-contain shrink-0"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          <span className="text-sm font-medium text-foreground truncate">
            {conversation.title}
          </span>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            · {getModelDisplayName(currentModel)}
          </span>
        </div>

        <ModelSelector currentModel={currentModel} onModelChange={onModelChange} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 min-h-0 scrollbar-thin">
        {conversation.messages.length === 0 && !streamingContent ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🦊</span>
              </div>
              <p className="text-sm text-muted-foreground">The fox spirit awaits your first message...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {conversation.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {streamingContent && (
              <MessageBubble
                message={{
                  id: 'streaming',
                  role: 'assistant',
                  content: streamingContent,
                  model: currentModel,
                  createdAt: new Date().toISOString(),
                }}
                isStreaming
              />
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="border-t border-border px-4 md:px-6 py-4 bg-card/80 backdrop-blur-sm shrink-0">
        <div className="max-w-3xl mx-auto flex gap-2 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share your thoughts with Lisichka..."
            disabled={isStreaming}
            rows={1}
            className="resize-none min-h-[44px] max-h-[200px] bg-background border-input focus-visible:ring-primary/50 text-sm rounded-xl"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            size="icon"
            className="h-11 w-11 shrink-0 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-xl transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {isStreaming && (
          <p className="text-xs text-muted-foreground/60 mt-2 max-w-3xl mx-auto pl-1 animate-pulse">
            The fox spirit is thinking...
          </p>
        )}
        <div className="flex items-center justify-between max-w-3xl mx-auto mt-2">
          <span className="text-[10px] text-muted-foreground/40">
            Shift+Enter for new line
          </span>
          <span className="text-[10px] text-muted-foreground/40">
            {input.length > 0 && `${input.length} chars`}
          </span>
        </div>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';
  const provider = message.model ? getProviderFromModel(message.model) : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
          isUser
            ? 'bg-secondary'
            : 'bg-primary/10 border border-primary/20'
        }`}
      >
        {isUser ? (
          <span className="text-xs font-semibold text-secondary-foreground">Y</span>
        ) : provider ? (
          <img
            src={provider.logo}
            alt={provider.name}
            className="w-4 h-4 rounded-sm object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-xs font-semibold text-primary">L</span>';
            }}
          />
        ) : (
          <span className="text-xs font-semibold text-primary">L</span>
        )}
      </div>

      {/* Message content */}
      <div className={`max-w-[80%] md:max-w-2xl flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Model badge for assistant */}
        {!isUser && message.model && (
          <span className="text-[10px] text-muted-foreground/60 mb-1 px-1">
            {getModelDisplayName(message.model)}
          </span>
        )}

        <div
          className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? 'bg-primary text-primary-foreground rounded-tr-md'
              : 'bg-card border border-border shadow-sm rounded-tl-md'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="markdown-content">
              <MarkdownRenderer content={message.content} />
              {isStreaming && (
                <span className="inline-block w-1.5 h-4 ml-0.5 bg-primary opacity-80 animate-pulse align-middle rounded-sm" />
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        {!isUser && !isStreaming && (
          <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1 rounded-md text-muted-foreground/50 hover:text-foreground hover:bg-muted transition-colors"
              title="Copy message"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
            </button>
            <span className="text-[10px] text-muted-foreground/40">
              {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}