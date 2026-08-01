import { Menu, Sparkles, Zap, Brain, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModelSelector } from '@/components/ModelSelector';
import { AI_PROVIDERS } from '@/data/models';

interface WelcomeScreenProps {
  currentModel: string;
  onModelChange: (model: string) => void;
  onNewChat: () => void;
  onToggleSidebar: () => void;
}

export function WelcomeScreen({ currentModel, onModelChange, onNewChat, onToggleSidebar }: WelcomeScreenProps) {
  const totalModels = Object.values(AI_PROVIDERS).reduce((acc, p) => acc + p.models.length, 0);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
      {/* Mobile header */}
      <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm shrink-0">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-md text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <span className="font-semibold text-sm text-foreground">Lisichka</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 overflow-y-auto scrollbar-thin">
        <div className="text-center max-w-4xl w-full">
          {/* Hero */}
          <div className="mb-10">
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-orange animate-float">
              <span className="text-4xl">🦊</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
              Welcome to <span className="text-gradient">Lisichka</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Your mystical AI companion powered by {totalModels}+ models from {Object.keys(AI_PROVIDERS).length} providers.
            </p>
          </div>

          {/* Model selector */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <ModelSelector currentModel={currentModel} onModelChange={onModelChange} />
            <Button
              onClick={onNewChat}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start chatting
            </Button>
          </div>

          {/* Provider grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-8">
            {Object.values(AI_PROVIDERS).map((provider) => (
              <div
                key={provider.id}
                className="group p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  onModelChange(provider.models[0]);
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-lg font-bold text-primary">${provider.name[0]}</span>`;
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-foreground truncate w-full">{provider.name}</p>
                    <p className="text-[10px] text-muted-foreground">{provider.models.length} models</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature hints */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-border/30">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-foreground">Streaming</p>
                <p className="text-[10px] text-muted-foreground">Real-time responses</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-border/30">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-foreground">Multi-model</p>
                <p className="text-[10px] text-muted-foreground">Switch freely</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-border/30">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                <Code className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-foreground">Markdown</p>
                <p className="text-[10px] text-muted-foreground">Rich formatting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}