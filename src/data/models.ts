export interface AIProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  models: string[];
}

export interface AIModel {
  provider: string;
  providerName: string;
  model: string;
  logo: string;
}

export const AI_PROVIDERS: Record<string, AIProvider> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
    description: 'GPT series & reasoning models',
    models: [
      'openai/gpt-5.6-sol',
      'openai/gpt-5.6-sol-pro',
      'openai/gpt-5.6-terra',
      'openai/gpt-5.6-terra-pro',
      'openai/gpt-5.6-luna',
      'openai/gpt-5.6-luna-pro',
      'openai/gpt-5.5-pro',
      'openai/gpt-5.5',
      'openai/gpt-5.4-pro',
      'openai/gpt-5.4',
      'openai/gpt-5.4-mini',
      'openai/gpt-5.4-nano',
      'openai/gpt-5.3-chat',
      'openai/gpt-5.3-codex',
      'openai/gpt-5.2',
      'openai/gpt-5.2-chat',
      'openai/gpt-5.2-pro',
      'openai/gpt-5.1',
      'openai/gpt-5.1-chat-latest',
      'openai/gpt-5.1-codex',
      'openai/gpt-5.1-codex-mini',
      'openai/gpt-5.1-codex-max',
      'openai/gpt-5',
      'openai/gpt-5-mini',
      'openai/gpt-5-nano',
      'openai/gpt-5-chat-latest',
      'openai/gpt-5-codex',
      'openai/gpt-4.1',
      'openai/gpt-4.1-mini',
      'openai/gpt-4.1-nano',
      'openai/gpt-4.5-preview',
      'openai/gpt-4o',
      'openai/gpt-4o-mini',
      'openai/o1',
      'openai/o1-mini',
      'openai/o1-pro',
      'openai/o3',
      'openai/o3-mini',
      'openai/o4-mini',
    ],
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Claude_AI_logo.svg',
    description: "Anthropic's reasoning models",
    models: [
      'claude-fable-5',
      'claude-opus-5',
      'claude-opus-5-fast',
      'claude-sonnet-5',
      'claude-opus-4.8-fast',
      'claude-opus-4-8',
      'claude-opus-4.7-fast',
      'claude-opus-4-7',
      'claude-sonnet-4-6',
      'claude-opus-4-6',
      'claude-opus-4-5',
      'claude-haiku-4-5',
      'claude-sonnet-4-5',
      'claude-opus-4-1',
      'claude-opus-4',
      'claude-sonnet-4',
    ],
  },
  kimi: {
    id: 'kimi',
    name: 'Kimi (Moonshot)',
    logo: 'https://seeklogo.com/images/M/moonshot-ai-logo-3C07529589-seeklogo.com.png',
    description: "Moonshot AI's Kimi models",
    models: [
      'moonshotai/kimi-k3',
      'moonshotai/kimi-k2.7-code',
      'moonshotai/kimi-k2.6',
      'moonshotai/kimi-k2.5',
      'moonshotai/kimi-k2-thinking',
      'moonshotai/kimi-k2-0905',
      'moonshotai/kimi-k2',
      'moonshotai/moonshot-v1-8k',
      'moonshotai/moonshot-v1-8k-vision-preview',
      'moonshotai/moonshot-v1-32k',
      'moonshotai/moonshot-v1-32k-vision-preview',
      'moonshotai/moonshot-v1-128k',
      'moonshotai/moonshot-v1-128k-vision-preview',
    ],
  },
  mistral: {
    id: 'mistral',
    name: 'Mistral AI',
    logo: 'https://seeklogo.com/images/M/mistral-ai-logo-218D43C42F-seeklogo.com.png',
    description: 'European open-weight models',
    models: [
      'mistralai/mistral-large-2512',
      'mistralai/mistral-medium-3-5',
      'mistralai/mistral-small-2603',
      'mistralai/codestral-2508',
      'mistralai/devstral-2512',
      'mistralai/mistral-medium-2508',
      'mistralai/mistral-medium-3.1',
      'mistralai/voxtral-small-2507',
      'mistralai/voxtral-small-24b-2507',
      'mistralai/mistral-small-3.2-24b-instruct',
      'mistralai/mistral-small-3.1-24b-instruct',
      'mistralai/magistral-medium-2509',
      'mistralai/magistral-small-2509',
      'mistralai/mistral-saba',
      'mistralai/ministral-3b',
      'mistralai/ministral-8b',
      'mistralai/ministral-3b-2512',
      'mistralai/ministral-8b-2512',
      'mistralai/pixtral-12b',
      'mistralai/mistral-large-2407',
      'mistralai/mistral-7b-instruct-v0.3',
      'mistralai/mixtral-8x22b-instruct',
      'mistralai/mistral-7b-instruct-v0.2',
      'mistralai/mistral-tiny',
    ],
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    logo: 'https://seeklogo.com/images/D/deepseek-logo-133D0AE0B3-seeklogo.com.png',
    description: 'Cost-effective reasoning models',
    models: [
      'deepseek/deepseek-v4-pro',
      'deepseek/deepseek-v4-flash',
      'deepseek/deepseek-v3.2',
      'deepseek/deepseek-v3.2-exp',
      'deepseek/deepseek-v3.1-terminus',
      'deepseek/deepseek-r1-0528',
      'deepseek/deepseek-chat-v3-0324',
      'deepseek/deepseek-chat-v3.1',
    ],
  },
  qwen: {
    id: 'qwen',
    name: 'Qwen (Alibaba)',
    logo: 'https://seeklogo.com/images/Q/qwen-logo-1264601D6F-seeklogo.com.png',
    description: "Alibaba's multimodal models",
    models: [
      'qwen/qwen3.7-plus',
      'qwen/qwen3.7-max',
      'qwen/qwen3.6-max-preview',
      'qwen/qwen3.6-plus',
      'qwen/qwen3.6-flash',
      'qwen/qwen3.6-27b',
      'qwen/qwen3.6-35b-a3b',
      'qwen/qwen3.5-plus',
      'qwen/qwen3.5-122b-a10b',
      'qwen/qwen3.5-27b',
      'qwen/qwen3.5-35b-a3b',
      'qwen/qwen3.5-flash-02-23',
      'qwen/qwen3.5-397b-a17b',
      'qwen/qwen3-max-thinking',
      'qwen/qwen3-coder-next',
      'qwen/qwen3-next-80b-a3b-instruct',
      'qwen/qwen3-235b-a22b-2507',
      'qwen/qwen3-coder-480b-a35b-instruct',
      'qwen/qwen3-coder-30b-a3b-instruct',
      'qwen/qwen3-coder-flash',
      'qwen/qwen2.5-coder-32b-instruct',
      'qwen/qwen3-vl-235b-a22b-thinking',
      'qwen/qwen3-vl-30b-a3b-instruct',
      'qwen/qwen3-vl-plus',
      'qwen/qwen-image',
      'qwen/qwen-image-2.0',
      'qwen/qwen-image-2.0-pro',
      'qwen/qwen-max',
      'qwen/qwen-plus',
      'qwen/qwen-flash',
      'qwen/qwen-turbo',
    ],
  },
  grok: {
    id: 'grok',
    name: 'Grok (xAI)',
    logo: 'https://seeklogo.com/images/G/grok-logo-99A8E4E9D8-seeklogo.com.png',
    description: "xAI's witty reasoning models",
    models: [
      'x-ai/grok-4.5',
      'x-ai/grok-build-0.1',
      'x-ai/grok-4.3',
      'x-ai/grok-4.20',
      'x-ai/grok-4.20-multi-agent',
      'x-ai/grok-4-1-fast',
      'x-ai/grok-4-1-fast-non-reasoning',
      'x-ai/grok-code-fast-1',
      'x-ai/grok-4',
      'x-ai/grok-4-fast',
      'x-ai/grok-4-fast-non-reasoning',
      'x-ai/grok-4-0709',
      'x-ai/grok-3',
      'x-ai/grok-3-fast',
      'x-ai/grok-3-mini',
      'x-ai/grok-imagine-image',
      'x-ai/grok-2',
    ],
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini (Google)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Google_Gemini_Logo.svg/1024px-Google_Gemini_Logo.svg.png',
    description: "Google's multimodal models",
    models: [
      'google/gemini-2.5-pro',
      'google/gemini-2.5-flash',
      'google/gemini-2.5-flash-image',
      'google/gemini-2.5-flash-lite',
      'google/gemini-3-flash-preview',
      'google/gemini-3-pro-image-preview',
      'google/gemini-3.1-flash-image-preview',
      'google/gemini-3.1-flash-lite',
      'google/gemini-3.1-pro-preview',
      'google/gemma-4-31b-it',
      'google/gemma-4-26b-a4b-it',
      'google/gemma-3-27b-it',
      'google/gemma-3-12b-it',
      'google/gemma-3-4b-it',
      'google/gemma-2-27b-it',
    ],
  },
  llama: {
    id: 'llama',
    name: 'Llama (Meta)',
    logo: 'https://seeklogo.com/images/L/llama-logo-F0C307C08A-seeklogo.com.png',
    description: "Meta's open-source models",
    models: [
      'meta-llama/llama-4-maverick',
      'meta-llama/llama-4-scout',
      'meta-llama/llama-guard-4-12b',
      'meta-llama/llama-3.3-70b-instruct',
      'meta-llama/llama-3.2-1b-instruct',
      'meta-llama/llama-3.2-3b-instruct',
      'meta-llama/llama-3.1-70b-instruct',
      'meta-llama/llama-3.1-8b-instruct',
    ],
  },
};

export function getAllModels(): AIModel[] {
  const all: AIModel[] = [];
  Object.keys(AI_PROVIDERS).forEach((provider) => {
    AI_PROVIDERS[provider].models.forEach((model) => {
      all.push({
        provider,
        providerName: AI_PROVIDERS[provider].name,
        model,
        logo: AI_PROVIDERS[provider].logo,
      });
    });
  });
  return all;
}

export function getModelDisplayName(modelId: string): string {
  const parts = modelId.split('/');
  return parts.length > 1 ? parts[1] : modelId;
}

export function getProviderFromModel(modelId: string): AIProvider | null {
  for (const provider of Object.values(AI_PROVIDERS)) {
    if (provider.models.includes(modelId)) {
      return provider;
    }
  }
  return null;
}

export const DEFAULT_MODEL = 'openai/gpt-4o';