import React from "react";
import { ModelConfig } from "@/lib/models/types";

interface ModelSelectorProps {
  models: ModelConfig[];
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
}

export function ModelSelector({ models, selectedModel, onSelectModel }: ModelSelectorProps) {
  // 按提供商分组模型
  const modelsByProvider: Record<string, ModelConfig[]> = {};
  models.forEach(model => {
    if (!modelsByProvider[model.provider]) {
      modelsByProvider[model.provider] = [];
    }
    modelsByProvider[model.provider].push(model);
  });

  // 提供商名称映射
  const providerNames: Record<string, string> = {
    openai: "OpenAI",
    anthropic: "Anthropic",
    deepseek: "DeepSeek",
    other: "其他",
  };

  // 提供商图标
  const providerIcons: Record<string, React.ReactNode> = {
    openai: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.051 6.051 0 0 0 6.0572-4.1819 5.9895 5.9895 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7378-7.0969h.0048zm-9.3338 13.6107a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944v.0098zm-9.6607-3.6739a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-.1923v.0097zm-1.4342-9.0321a4.485 4.485 0 0 1 2.3417-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 1.819 10.7258zM16.5149 6.8894l-5.8144 3.3543L8.67 9.0702a.0757.0757 0 0 1-.0381-.0567V3.4378a4.5057 4.5057 0 0 1 7.0627-.85l-.142.0805-4.7735 2.7582a.7759.7759 0 0 0-.3927.6813v6.7369l-2.02-1.1685a.0662.0662 0 0 1-.0333-.0567V6.1553a.0804.0804 0 0 1 .0333-.0615l4.7735-2.7582a4.4944 4.4944 0 0 1 3.0089 3.5123zm1.5483 8.6465l-5.8144-3.3591v-2.3324a.0709.0709 0 0 1 .0381-.0567l4.8303-2.7865a4.4992 4.4992 0 0 1 6.6802 3.2608v.0567a4.4944 4.4944 0 0 1-2.3417 1.9728v-3.1136a.7712.7712 0 0 0-.3879-.6765l-5.8193-3.359 2.0201-1.1685a.0757.0757 0 0 1 .071 0l4.8303 2.7865a4.5013 4.5013 0 0 1-.6765 8.1042v-.0047zm1.4343-2.1312a.0757.0757 0 0 1-.071 0l-4.7735-2.7582a.7759.7759 0 0 0-.7854 0l-5.8144 3.3543v-2.3324a.0709.0709 0 0 1 .038-.0567l4.8303-2.7865a4.4992 4.4992 0 0 1 6.6802 3.2608v1.3276z" fill="currentColor" />
      </svg>
    ),
    anthropic: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 6L12 14L4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 18L12 14L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    deepseek: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" />
        <path d="M12 16V16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 13C12 11 13 11 13.5 10.5C14 10 14.5 9.5 14.5 8.5C14.5 7 13 6 12 6C11 6 10 6.5 9.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    other: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return (
    <div className="mb-4">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择模型</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {Object.entries(modelsByProvider).map(([provider, providerModels]) => (
          <div key={provider} className="space-y-1">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span className="text-gray-600 dark:text-gray-300">{providerIcons[provider]}</span>
              <span>{providerNames[provider] || provider}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {providerModels.map((model) => (
                <button
                  key={model.id}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
                    selectedModel === model.id
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => onSelectModel(model.id)}
                  title={model.description}
                >
                  <span>{model.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 