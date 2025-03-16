import React from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  iconBg: string;
}

function FeatureCard({ icon, title, description, color, iconBg }: FeatureCardProps) {
  return (
    <div className={`rounded-xl p-6 transition-all hover:shadow-md ${color}`}>
      <div className={`flex h-14 w-14 items-center justify-center rounded-full mb-5 ${iconBg}`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

export function FeatureCards() {
  return (
    <div className="mb-12">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">强大功能</h2>
        <p className="text-gray-600 dark:text-gray-400">
          BookNote-LLM 提供多种功能，帮助您高效整理笔记
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon="📚"
          title="智能笔记整理"
          description="自动将文本转换为结构化笔记，包括主题分类和关键点提取"
          color="bg-white dark:bg-gray-800"
          iconBg="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        />
        <FeatureCard
          icon="✨"
          title="多源支持"
          description="支持Kindle、微信读书、网页和文章等多种来源的内容整理"
          color="bg-white dark:bg-gray-800"
          iconBg="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
        />
        <FeatureCard
          icon="⚡"
          title="一键生成"
          description="快速处理，几秒钟内将您的文本转换为结构化笔记，支持导出"
          color="bg-white dark:bg-gray-800"
          iconBg="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
        />
      </div>
    </div>
  );
} 