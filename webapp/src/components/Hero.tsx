import React from "react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative overflow-hidden pb-10">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-0 h-[300px] w-[300px] rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="absolute left-1/4 top-1/3 h-[250px] w-[250px] rounded-full bg-purple-200 opacity-20 blur-3xl"></div>
        <div className="absolute right-1/3 bottom-0 h-[200px] w-[200px] rounded-full bg-cyan-200 opacity-20 blur-3xl"></div>
        
        {/* 键盘背景图案 - 类似MD2Card */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 L1000,0 L1000,1000 L0,1000 Z" fill="none" stroke="#000" strokeWidth="1" />
            <g transform="translate(100, 100) scale(0.8)">
              {Array.from({ length: 10 }).map((_, i) => (
                <g key={i} transform={`translate(0, ${i * 80})`}>
                  {Array.from({ length: 10 }).map((_, j) => (
                    <rect key={j} x={j * 80} y="0" width="70" height="70" rx="10" fill="none" stroke="#000" strokeWidth="1" />
                  ))}
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-10 text-center">
        {/* Logo和标题 */}
        <div className="mb-6 flex justify-center">
          <div className="relative h-24 w-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-20 blur-lg"></div>
            <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white shadow-md dark:bg-gray-800">
              <span className="text-4xl">📚</span>
            </div>
          </div>
        </div>

        {/* 主标题 */}
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
            BookNote-LLM
          </span>
        </h1>

        {/* 副标题 */}
        <h2 className="mb-6 text-6xl font-medium text-gray-700 dark:text-gray-300">
          复制/划线/想法<span className="mx-2 text-gray-400"> 生成 </span>
          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            智能笔记
          </span>
        </h2>

        {/* 描述文字 */}
        <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          将您的文本划线、标注和想法转换为结构化笔记，支持Kindle/微信读书/微信文章/网页浏览，一键生成精美笔记
        </p>

        {/* 胶囊标签 */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            100% 免费
          </span>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            无需登录
          </span>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            支持多种模型
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
            长文自动分析
          </span>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
            无限生成
          </span>
        </div>

        {/* 开始使用按钮 */}
        <Button 
          className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-6 text-lg font-medium text-white shadow-lg transition-all hover:shadow-xl hover:from-blue-700 hover:to-cyan-600"
          size="lg"
          onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
        >
          立即开始
        </Button>
      </div>
    </div>
  );
} 