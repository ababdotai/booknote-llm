"use client";

import { useState, useEffect, useRef } from "react";
import { MainLayout, TabsLayout } from "@/components/MainLayout";
import { TextInput } from "@/components/TextInput";
import { FileUpload } from "@/components/FileUpload";
import { NoteOutput } from "@/components/NoteOutput";
import { NoteModal } from "@/components/NoteModal";
import { Hero } from "@/components/Hero";
import { PlatformLinks } from "@/components/PlatformLinks";
import { toast } from "sonner";
import { ModelConfig } from "@/lib/models/types";
import { Confetti, ConfettiRef } from "@/components/magicui/confetti";

// 模拟从API获取模型列表
const AVAILABLE_MODELS: ModelConfig[] = [
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
  {
    id: "claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "anthropic",
    description: "快速响应的轻量级模型",
    maxTokens: 200000,
    defaultTemperature: 0.7,
    isAvailable: true,
  },
  {
    id: "deepseek-chat",
    name: "DeepSeek Chat",
    provider: "deepseek",
    description: "DeepSeek的通用对话模型",
    maxTokens: 64000,
    defaultTemperature: 0.7,
    isAvailable: true,
  },
];

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState("kindle");
  const [selectedModel, setSelectedModel] = useState(AVAILABLE_MODELS[0].id);
  const [models, setModels] = useState<ModelConfig[]>(AVAILABLE_MODELS);
  const [modelInfo, setModelInfo] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

  // 在实际应用中，可以从API获取可用模型列表
  useEffect(() => {
    // 这里可以添加获取模型列表的API调用
    // 例如：fetch('/api/models').then(res => res.json()).then(data => setModels(data));
  }, []);

  const handleFileContent = (content: string) => {
    setInputText(content);
    toast.success("文件内容已加载");
  };

  const handleSubmit = async (source?: string, model?: string) => {
    if (!inputText.trim()) {
      toast.error("请输入或上传内容");
      return;
    }

    // 如果提供了source参数，则使用它，否则使用默认的selectedSource
    const sourceToUse = source || selectedSource;
    setSelectedSource(sourceToUse);
    
    // 如果提供了model参数，则使用它，否则使用默认的selectedModel
    const modelToUse = model || selectedModel;
    setSelectedModel(modelToUse);
    
    setIsLoading(true);
    setOutputText("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          content: inputText,
          source: sourceToUse,
          model: modelToUse
        }),
      });

      if (!response.ok) {
        throw new Error("生成笔记失败");
      }

      const data = await response.json();
      setOutputText(data.result);
      
      // 如果返回了模型信息，显示它
      if (data.model) {
        const modelUsed = models.find(m => m.id === data.model) || { name: data.model };
        setModelInfo(`使用模型: ${modelUsed.name}`);
      }
      
      toast.success("笔记生成成功");
      
      // 自动打开模态框
      setIsModalOpen(true);
      
      // 触发彩带效果
      setTimeout(() => {
        if (confettiRef.current) {
          confettiRef.current.fire();
        }
      }, 300);
    } catch (error) {
      console.error("Error:", error);
      toast.error("生成笔记时出错，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Hero />
      
      <div className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <PlatformLinks />
        </div>
      </div>
      
      <MainLayout>
        <div id="main-content" className="flex flex-col gap-8">
          
          <TabsLayout
            textInputTab={
              <TextInput
                value={inputText}
                onChange={setInputText}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                models={models}
              />
            }
            fileUploadTab={
              <FileUpload 
                onFileContent={handleFileContent} 
                onSubmit={handleSubmit}
                isLoading={isLoading}
                models={models}
              />
            }
          />

          {outputText && (
            <NoteOutput content={outputText} modelInfo={modelInfo} />
          )}
        </div>
      </MainLayout>
      
      <Confetti 
        ref={confettiRef}
        options={{ 
          particleCount: 100,
          spread: 70,
          origin: { y: 0.25 }
        }}
        manualstart={true}
        className="fixed inset-0 pointer-events-none z-50"
      />
      
      <NoteModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        content={outputText} 
        modelInfo={modelInfo} 
      />
    </>
  );
}
