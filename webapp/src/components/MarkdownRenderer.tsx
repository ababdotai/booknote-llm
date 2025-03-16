import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  // 提取标题生成目录
  useEffect(() => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const headings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');

      headings.push({ id, text, level });
    }

    setToc(headings);
  }, [content]);

  // 监听滚动，高亮当前可见的标题
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      if (headingElements.length === 0) return;

      // 找到当前在视口中的第一个标题
      for (const element of headingElements) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
          setActiveHeading(element.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始化时执行一次

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toc]);

  return (
    <div className={`flex ${className}`}>
      {/* 主要内容区域 */}
      <div className="flex-grow overflow-auto">
        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-pre:p-0">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]]}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>

      {/* 侧边栏目录 */}
      {toc.length > 0 && (
        <div className="w-64 flex-shrink-0 hidden lg:block pl-6 border-l">
          <div className="sticky top-6">
            <h3 className="text-lg font-semibold mb-4">目录</h3>
            <nav className="space-y-2">
              {toc.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.id}`}
                  className={`block text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                    activeHeading === item.id
                      ? 'text-blue-600 dark:text-blue-400 font-medium'
                      : 'text-gray-600 dark:text-gray-400'
                  } ${item.level > 1 ? `pl-${(item.level - 1) * 4}` : ''}`}
                  style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
} 