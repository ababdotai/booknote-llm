import OpenAI from "openai";
import { ModelConfig, ModelProvider, ModelService, GenerateParams, GenerateResult } from "./types";
import { getSystemPrompt, getUserPrompt } from "../prompt";

// 获取环境变量
const apiKey = process.env.OPENAI_API_KEY || "";
const apiBase = process.env.OPENAI_API_BASE;
const defaultModel = process.env.DEFAULT_MODEL || "gpt-4o-mini";
const defaultTemperature = parseFloat(process.env.DEFAULT_TEMPERATURE || "0.7");

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey,
  baseURL: apiBase,
});

// OpenAI模型列表
const OPENAI_MODELS: ModelConfig[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    description: "OpenAI最强大的多模态模型，支持文本、图像和音频",
    maxTokens: 8192,
    defaultTemperature: 0.7,
    isAvailable: true,
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "openai",
    description: "GPT-4o的轻量版本，速度更快，成本更低",
    maxTokens: 4096,
    defaultTemperature: 0.7,
    isAvailable: true,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    description: "平衡性能和成本的模型",
    maxTokens: 4096,
    defaultTemperature: 0.7,
    isAvailable: true,
  },
];

/**
 * OpenAI模型服务实现
 */
export class OpenAIModelService implements ModelService {
  /**
   * 获取可用模型列表
   */
  getAvailableModels(): ModelConfig[] {
    return OPENAI_MODELS.filter(model => model.isAvailable);
  }

  /**
   * 生成内容
   */
  async generate(params: GenerateParams): Promise<GenerateResult> {
    const { content, source, model = defaultModel, temperature = defaultTemperature } = params;

    if (!content) {
      throw new Error("Content is required");
    }

    // 系统提示词
    const systemPrompt = getSystemPrompt(source);

    // 用户提示词
    const userPrompt = getUserPrompt(content);

    try {
      const response = await openai.chat.completions.create({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature,
        max_tokens: 2000,
      });

      return {
        result: response.choices[0].message.content || "",
        model,
        usage: {
          promptTokens: response.usage?.prompt_tokens,
          completionTokens: response.usage?.completion_tokens,
          totalTokens: response.usage?.total_tokens,
        },
      };
    } catch (error) {
      console.error("OpenAI API error:", error);
      throw new Error("Failed to generate content with OpenAI");
    }
  }
} 