import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SourceSelector } from "./SourceSelector";

interface FileUploadProps {
  onFileContent: (content: string) => void;
}

export function FileUpload({ onFileContent }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState("kindle");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onFileContent(content);
      }
    };
    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    if (file.type === "text/plain" || file.name.endsWith(".txt") || file.name.endsWith(".md")) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          onFileContent(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card className="w-full border-0 shadow-md bg-white dark:bg-gray-800 overflow-hidden">
      <CardContent className="p-6">
        <SourceSelector selectedSource={selectedSource} onSelectSource={setSelectedSource} />
        
        <div 
          className={`flex flex-col items-center justify-center gap-6 p-8 border-2 border-dashed rounded-xl transition-colors ${
            isDragging 
              ? "border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20" 
              : "border-gray-200 dark:border-gray-700"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {fileName 
                ? `已选择文件: ${fileName}` 
                : "拖放文件到此处，或点击选择文件"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              支持上传 .txt 文件，包括 Kindle、微信读书导出的笔记
            </p>
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt"
            className="hidden"
          />
          
          <Button 
            onClick={handleButtonClick}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/50 dark:hover:bg-blue-900 dark:text-blue-300 px-6 py-2 rounded-full font-medium transition-all"
          >
            选择文件
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 