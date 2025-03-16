import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { NoteModal } from "./NoteModal";
import { Confetti, ConfettiRef } from "@/components/magicui/confetti";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Download, Maximize } from "lucide-react";

interface NoteOutputProps {
  content: string;
  modelInfo?: string;
}

export function NoteOutput({ content, modelInfo }: NoteOutputProps) {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);
  const [title, setTitle] = useState<string>("生成的笔记");

  // 提取内容的第一行作为标题
  useEffect(() => {
    if (content) {
      const firstLine = content.split('\n').find(line => line.trim() !== '');
      if (firstLine) {
        // 移除Markdown标记并截取前30个字符
        const cleanTitle = firstLine
          .replace(/^#+\s+/, '') // 移除标题标记
          .replace(/[*_`~]/g, '') // 移除其他Markdown标记
          .trim();
        
        setTitle(cleanTitle.length > 30 ? cleanTitle.substring(0, 30) + '...' : cleanTitle);
      }
    }
  }, [content]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("已复制到剪贴板");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `booknote-${new Date().toISOString().split("T")[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("笔记已下载");
  };

  const openFullscreenModal = () => {
    setIsModalOpen(true);
    // 触发彩带效果
    setTimeout(() => {
      if (confettiRef.current) {
        confettiRef.current.fire();
      }
    }, 300);
  };

  if (!content) {
    return null;
  }

  return (
    <>
      <Card className="w-full border-0 shadow-md bg-white dark:bg-gray-800 overflow-hidden">
        <CardHeader className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b p-4 flex flex-row items-center justify-between">
          <div className="flex-1 flex items-center">
            <span className="text-green-500 dark:text-green-400 text-xl mr-2">📝</span>
            <CardTitle className="text-xl">
              {title}
              {modelInfo && (
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                  {modelInfo}
                </span>
              )}
            </CardTitle>
          </div>
          
          <div className="flex-shrink-0">
            <TooltipProvider>
              <Dock 
                className="bg-transparent"
                iconSize={32}
                iconMagnification={36}
                iconDistance={80}
              >
                <DockIcon 
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  onClick={copyToClipboard}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center h-full w-full">
                        <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>复制</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
                
                <DockIcon 
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  onClick={downloadMarkdown}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center h-full w-full">
                        <Download className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>下载</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
                
                <DockIcon 
                  className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  onClick={openFullscreenModal}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center h-full w-full">
                        <Maximize className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>全屏查看</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              </Dock>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <MarkdownRenderer content={content} />
        </CardContent>
      </Card>

      <Confetti 
        ref={confettiRef}
        options={{ 
          particleCount: 100,
          spread: 70,
          origin: { y: 0.25 }
        }}
        manualstart={true}
        className="absolute inset-0 pointer-events-none"
      />

      <NoteModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        content={content} 
        modelInfo={modelInfo} 
      />
    </>
  );
} 