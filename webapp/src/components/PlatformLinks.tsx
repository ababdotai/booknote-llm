import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface PlatformCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isComingSoon?: boolean;
  link?: string;
  bgColor: string;
  iconBgColor: string;
}

function PlatformCard({ icon, title, description, isComingSoon = true, link, bgColor, iconBgColor }: PlatformCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    if (isComingSoon) {
      toast.info(`${title} 即将推出，敬请期待！`);
    } else if (link) {
      window.open(link, "_blank");
    }
  };
  
  return (
    <div 
      className={`relative overflow-hidden rounded-xl border border-gray-200 ${bgColor} p-6 shadow-sm transition-all dark:border-gray-800 h-full flex flex-col ${
        !isComingSoon ? "hover:shadow-md cursor-pointer" : "cursor-default"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${iconBgColor}`}>
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">{description}</p>
      
      {isComingSoon && isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
          <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
            Building...
          </div>
        </div>
      )}
    </div>
  );
}

export function PlatformLinks() {
  return (
    <div className="py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-4 text-3xl font-bold">多平台支持</h2>
        <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
          BookNote-LLM 提供多种客户端，满足您在不同场景下的使用需求
        </p>
      </div>
      
      <TooltipProvider>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-full">
                <PlatformCard 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="M10 4v4" /><path d="M2 8h20" /><path d="M6 12v4" /><path d="M12 12v4" /><path d="M18 12v4" /></svg>}
                  title="Web 应用"
                  description="在浏览器中使用，无需安装，随时随地访问"
                  isComingSoon={false}
                  link="#"
                  bgColor="bg-blue-50 dark:bg-blue-950/40"
                  iconBgColor="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>当前正在使用</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-full">
                <PlatformCard 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" /><polygon points="12 15 17 21 7 21 12 15" /></svg>}
                  title="Chrome 插件"
                  description="浏览网页时一键保存内容，自动记录您的划线和标注"
                  bgColor="bg-purple-50 dark:bg-purple-950/40"
                  iconBgColor="bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>即将推出</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-full">
                <PlatformCard 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>}
                  title="Android 应用"
                  description="悬浮球监控剪贴板，自动记录复制的内容，随时整理笔记"
                  bgColor="bg-green-50 dark:bg-green-950/40"
                  iconBgColor="bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>即将推出</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-full">
                <PlatformCard 
                  icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>}
                  title="iOS 应用"
                  description="悬浮球监控剪贴板，自动记录复制的内容，随时整理笔记"
                  bgColor="bg-amber-50 dark:bg-amber-950/40"
                  iconBgColor="bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400"
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>即将推出</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
} 