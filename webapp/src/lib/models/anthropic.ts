import Anthropic from "@anthropic-ai/sdk";
import { ModelConfig, ModelService, GenerateParams, GenerateResult } from "./types";
import { getUserPrompt } from "../prompt";
import { getSystemPrompt } from "../prompt";

// 获取环境变量
const apiKey = process.env.ANTHROPIC_API_KEY || "";
const defaultModel = process.env.ANTHROPIC_DEFAULT_MODEL || "claude-3.5-haiku";
const defaultTemperature = parseFloat(process.env.ANTHROPIC_DEFAULT_TEMPERATURE || "0.7");

// 初始化Anthropic客户端
const anthropic = new Anthropic({
  apiKey,
});

// Anthropic模型列表
const ANTHROPIC_MODELS: ModelConfig[] = [
  {
    id: "claude-3.5-opus",
    name: "Claude 3.5 Opus",
    provider: "anthropic",
    description: "Anthropic最强大的模型，适合复杂任务",
    maxTokens: 200000,
    defaultTemperature: 0.7,
    isAvailable: true,
  },
  {
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    description: "平衡性能和速度的中等模型",
    maxTokens: 200000,
    defaultTemperature: 0.7,
    isAvailable: true,
  },
  {
    id: "claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "anthropic",
    description: "快速响应的轻量级模型",
    maxTokens: 200000,
    defaultTemperature: 0.7,
    isAvailable: true,
  },
];


/**
 * Anthropic模型服务实现
 */
export class AnthropicModelService implements ModelService {
  /**
   * 获取可用模型列表
   */
  getAvailableModels(): ModelConfig[] {
    // 如果没有API密钥，则所有模型都不可用
    if (!apiKey) {
      return [];
    }
    return ANTHROPIC_MODELS.filter(model => model.isAvailable);
  }

  /**
   * 生成内容
   */
  async generate(params: GenerateParams): Promise<GenerateResult> {
    const { content, source, model = defaultModel, temperature = defaultTemperature } = params;

    if (!content) {
      throw new Error("Content is required");
    }

    if (!apiKey) {
      throw new Error("Anthropic API key is not configured");
    }

    // 系统提示词
    const systemPrompt = getSystemPrompt(source);

    // 用户提示词
    const userPrompt = getUserPrompt(content);

    try {
      const response = await anthropic.messages.create({
        model,
        system: systemPrompt,
        messages: [
          { role: "user", content: userPrompt }
        ],
        temperature,
        max_tokens: 4000,
      });

      return {
        result: response.content[0].text,
        model,
        usage: {
          // Anthropic目前不提供详细的token使用情况
          totalTokens: response.usage?.input_tokens + response.usage?.output_tokens,
          promptTokens: response.usage?.input_tokens,
          completionTokens: response.usage?.output_tokens,
        },
      };
    } catch (error) {
      console.error("Anthropic API error:", error);
      throw new Error("Failed to generate content with Anthropic");
    }
  }
} 