import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { AI_PROVIDERS, getModelDisplayName, getProviderFromModel } from '@/data/models';

interface ModelSelectorProps {
  currentModel: string;
  onModelChange: (model: string) => void;
}

export function ModelSelector({ currentModel, onModelChange }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [expandedProvider, setExpandedProvider] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const provider = getProviderFromModel(currentModel);

  const filteredProviders = Object.values(AI_PROVIDERS).map((p) => ({
    ...p,
    filteredModels: p.models.filter((m) =>
      m.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((p) => p.filteredModels.length > 0);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm"
      >
        {provider && (
          <img
            src={provider.logo}
            alt={provider.name}
            className="w-4 h-4 rounded-sm object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        )}
        <span className="text-xs font-medium text-foreground max-w-[120px] truncate">
          {getModelDisplayName(currentModel)}
        </span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 max-h-[70vh] bg-card border border-border rounded-xl shadow-2xl shadow-black/20 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search models..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-background border border-input rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                autoFocus
              />
            </div>
          </div>

          {/* Provider list */}
          <div className="overflow-y-auto max-h-[55vh] scrollbar-thin">
            {filteredProviders.map((p) => (
              <div key={p.id}>
                <button
                  onClick={() => setExpandedProvider(expandedProvider === p.id ? null : p.id)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="w-5 h-5 rounded-sm object-contain shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="flex-1 text-left">
                    <span className="text-xs font-medium text-foreground">{p.name}</span>
                    <span className="text-[10px] text-muted-foreground ml-2">
                      {p.filteredModels.length} models
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3 h-3 text-muted-foreground transition-transform ${
                      expandedProvider === p.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedProvider === p.id && (
                  <div className="bg-muted/20 border-t border-border/50">
                    {p.filteredModels.map((model) => (
                      <button
                        key={model}
                        onClick={() => {
                          onModelChange(model);
                          setIsOpen(false);
                          setSearch('');
                        }}
                        className={`w-full text-left px-8 py-2 text-xs transition-colors ${
                          model === currentModel
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-foreground/80 hover:bg-muted/50'
                        }`}
                      >
                        {getModelDisplayName(model)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}