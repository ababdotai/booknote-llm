/**
 * 模型提供商类型
 */
export type ModelProvider = 'openai' | 'anthropic' | 'deepseek' | 'other';

/**
 * 模型配置接口
 */
export interface ModelConfig {
  id: string;
  name: string;
  provider: ModelProvider;
  description: string;
  maxTokens: number;
  defaultTemperature: number;
  isAvailable: boolean;
}

/**
 * 生成请求参数接口
 */
export interface GenerateParams {
  content: string;
  source: string;
  model?: string;
  temperature?: number;
}

/**
 * 生成结果接口
 */
export interface GenerateResult {
  result: string;
  model?: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

/**
 * 模型服务接口
 */
export interface ModelService {
  /**
   * 获取模型列表
   */
  getAvailableModels(): ModelConfig[];
  
  /**
   * 生成内容
   * @param params 生成参数
   */
  generate(params: GenerateParams): Promise<GenerateResult>;
} 