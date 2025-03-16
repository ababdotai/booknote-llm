"use client";

import { useState } from "react";
import { MainLayout, TabsLayout } from "@/components/MainLayout";
import { TextInput } from "@/components/TextInput";
import { FileUpload } from "@/components/FileUpload";
import { NoteOutput } from "@/components/NoteOutput";
import { FeatureCards } from "@/components/FeatureCards";
import { Hero } from "@/components/Hero";
import { PlatformLinks } from "@/components/PlatformLinks";
import { toast } from "sonner";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSource, setSelectedSource] = useState("other");

  const handleFileContent = (content: string) => {
    setInputText(content);
    toast.success("文件内容已加载");
  };

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast.error("请输入或上传内容");
      return;
    }

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
          source: selectedSource 
        }),
      });

      if (!response.ok) {
        throw new Error("生成笔记失败");
      }

      const data = await response.json();
      setOutputText(data.result);
      toast.success("笔记生成成功");
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
        <div className="container mx-auto px-4 py-12">
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
              />
            }
            fileUploadTab={
              <div className="space-y-8">
                <FileUpload onFileContent={handleFileContent} />
                {inputText && (
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 disabled:opacity-70 disabled:transform-none"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          处理中...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>生成笔记</span>
                          <span>✨</span>
                        </div>
                      )}
                    </button>
                  </div>
                )}
              </div>
            }
          />

          {outputText && <NoteOutput content={outputText} />}
        </div>
      </MainLayout>
    </>
  );
}
