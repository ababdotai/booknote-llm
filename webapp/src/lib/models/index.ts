import { ModelConfig, ModelProvider, ModelService } from "./types";
import { OpenAIModelService } from "./openai";
import { AnthropicModelService } from "./anthropic";
import { DeepSeekModelService } from "./deepseek";

// 模型服务实例
const openAIService = new OpenAIModelService();
const anthropicService = new AnthropicModelService();
const deepSeekService = new DeepSeekModelService();

/**
 * 模型服务工厂
 */
export class ModelServiceFactory {
  /**
   * 获取所有可用模型
   */
  static getAllModels(): ModelConfig[] {
    return [
      ...openAIService.getAvailableModels(),
      ...anthropicService.getAvailableModels(),
      ...deepSeekService.getAvailableModels(),
    ];
  }

  /**
   * 根据提供商获取模型服务
   */
  static getServiceByProvider(provider: ModelProvider): ModelService {
    switch (provider) {
      case "openai":
        return openAIService;
      case "anthropic":
        return anthropicService;
      case "deepseek":
        return deepSeekService;
      default:
        return openAIService; // 默认使用OpenAI
    }
  }

  /**
   * 根据模型ID获取模型服务
   */
  static getServiceByModelId(modelId: string): ModelService {
    const allModels = this.getAllModels();
    const model = allModels.find(m => m.id === modelId);
    
    if (!model) {
      return openAIService; // 默认使用OpenAI
    }
    
    return this.getServiceByProvider(model.provider);
  }
}

// 导出类型和服务
export * from "./types";
export { OpenAIModelService, AnthropicModelService, DeepSeekModelService }; 