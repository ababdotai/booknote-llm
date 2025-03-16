import React from 'react'
import Image from 'next/image'
import { WarpBackground } from '@/components/magicui/warp-background'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'

export function Hero() {
  return (
    <div className="relative overflow-hidden pb-10">
      <WarpBackground className="p-0" beamsPerSide={3} beamSize={3} beamDuration={50} gridColor="rgba(59, 130, 246, 0.2)">
        <div className="container mx-auto px-4 pt-10 text-center">
          {/* Logo和标题 */}
          <div className="mb-6 flex justify-center">
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 opacity-20 blur-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image src="/logo.png" alt="BookNote-LLM Logo" width={96} height={96} className="rounded-full" />
              </div>
            </div>
          </div>

          {/* 主标题 */}
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">BookNote-LLM</span>
          </h1>

          {/* 副标题 */}
          <h2 className="mb-6 text-6xl font-medium text-gray-700 dark:text-gray-300">
            复制/划线/想法<span className="mx-2 text-gray-400"> 生成 </span>
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">智能笔记</span>
          </h2>

          {/* 描述文字 */}
          <p className="mx-auto mb-8 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
            将您的文本划线、标注和想法转换为结构化笔记，支持Kindle/微信读书/微信文章/网页浏览，一键生成精美笔记
          </p>

          {/* 胶囊标签 */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">100% 免费</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">无需登录</span>
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              支持多种模型
            </span>
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
              长文自动分析
            </span>
            <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">无限生成</span>
          </div>
        </div>
      </WarpBackground>
      
      {/* 开始使用按钮 */}
      <div className="flex justify-center mt-20 mb-0">
        <InteractiveHoverButton
          className="border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
          onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
        >
          立即开始
        </InteractiveHoverButton>
      </div>
    </div>
  )
}
