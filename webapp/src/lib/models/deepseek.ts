import { ModelConfig, ModelService, GenerateParams, GenerateResult } from "./types";
import { getSystemPrompt, getUserPrompt } from "../prompt";
// 获取环境变量
const apiKey = process.env.DEEPSEEK_API_KEY || "";
const apiBase = process.env.DEEPSEEK_API_BASE || "https://api.deepseek.com/v1";
const defaultModel = process.env.DEEPSEEK_DEFAULT_MODEL || "deepseek-chat";
const defaultTemperature = parseFloat(process.env.DEEPSEEK_DEFAULT_TEMPERATURE || "0.7");

// DeepSeek模型列表
const DEEPSEEK_MODELS: ModelConfig[] = [
  {
    id: "deepseek-chat",
    name: "DeepSeek Chat",
    provider: "deepseek",
    description: "DeepSeek的通用对话模型",
    maxTokens: 64000,
    defaultTemperature: 0.7,
    isAvailable: true,
  },
  {
    id: "deepseek-reasoner",
    name: "DeepSeek Reasoner",
    provider: "deepseek",
    description: "专为推理优化的模型",
    maxTokens: 64000,
    defaultTemperature: 0.7,
    isAvailable: true,
  },
];

/**
 * DeepSeek模型服务实现
 * 注意：DeepSeek API与OpenAI API兼容，所以我们可以使用类似的实现
 */
export class DeepSeekModelService implements ModelService {
  /**
   * 获取可用模型列表
   */
  getAvailableModels(): ModelConfig[] {
    // 如果没有API密钥，则所有模型都不可用
    if (!apiKey) {
      return [];
    }
    return DEEPSEEK_MODELS.filter(model => model.isAvailable);
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
      throw new Error("DeepSeek API key is not configured");
    }

    // 系统提示词
    const systemPrompt = getSystemPrompt(source);

    // 用户提示词
    const userPrompt = getUserPrompt(content);

    try {
      // DeepSeek API与OpenAI API兼容
      const response = await fetch(`${apiBase}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          temperature,
          max_tokens: 2000,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "DeepSeek API request failed");
      }

      const data = await response.json();

      return {
        result: data.choices[0].message.content,
        model,
        usage: {
          promptTokens: data.usage?.prompt_tokens,
          completionTokens: data.usage?.completion_tokens,
          totalTokens: data.usage?.total_tokens,
        },
      };
    } catch (error) {
      console.error("DeepSeek API error:", error);
      throw new Error("Failed to generate content with DeepSeek");
    }
  }
} 