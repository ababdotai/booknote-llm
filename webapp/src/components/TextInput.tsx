import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SourceSelector } from "./SourceSelector";
import { ModelSelector } from "./ModelSelector";
import { ModelConfig } from "@/lib/models/types";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (source?: string, model?: string) => void;
  isLoading: boolean;
  models: ModelConfig[];
}

export function TextInput({ value, onChange, onSubmit, isLoading, models }: TextInputProps) {
  const [selectedSource, setSelectedSource] = useState("kindle");
  const [selectedModel, setSelectedModel] = useState(models[0]?.id || "gpt-4o-mini");

  return (
    <Card className="w-full border-0 shadow-md bg-white dark:bg-gray-800 overflow-hidden">
      <CardContent className="p-6">
        <SourceSelector selectedSource={selectedSource} onSelectSource={setSelectedSource} />
        
        <ModelSelector 
          models={models} 
          selectedModel={selectedModel} 
          onSelectModel={setSelectedModel} 
        />
        
        <div className="relative">
          <div className="absolute top-3 left-3 text-gray-400 dark:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
          <Textarea
            placeholder="粘贴您的笔记内容，可以是Kindle、微信读书的划线和标注，或者是网页、文章中复制的内容..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[240px] border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-500 transition-colors resize-none p-4 pl-10 text-base rounded-xl"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4 border-t border-gray-100 dark:border-gray-800">
        <Button 
          onClick={() => onSubmit(selectedSource, selectedModel)} 
          disabled={!value.trim() || isLoading}
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
        </Button>
      </CardFooter>
    </Card>
  );
} 