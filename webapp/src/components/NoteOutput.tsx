import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { NoteModal } from "./NoteModal";
import { Confetti, ConfettiRef } from "@/components/magicui/confetti";

interface NoteOutputProps {
  content: string;
  modelInfo?: string;
}

export function NoteOutput({ content, modelInfo }: NoteOutputProps) {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

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
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-b flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <span className="text-green-500 dark:text-green-400">📝</span>
            <span>生成的笔记</span>
            {modelInfo && (
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                {modelInfo}
              </span>
            )}
          </CardTitle>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyToClipboard}
              className={`rounded-full px-4 border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-900/30 transition-all ${
                copied ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                {copied ? "已复制" : "复制"}
              </div>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadMarkdown}
              className="rounded-full px-4 border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-900/30 transition-all"
            >
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                下载 Markdown
              </div>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={openFullscreenModal}
              className="rounded-full px-4 border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:border-green-700 dark:hover:bg-green-900/30 transition-all"
            >
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M15 3h6v6"></path>
                  <path d="M10 14 21 3"></path>
                  <path d="M9 21H3v-6"></path>
                  <path d="M3 9v6"></path>
                  <path d="M14 15l-5 5"></path>
                </svg>
                全屏查看
              </div>
            </Button>
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