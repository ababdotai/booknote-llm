import React, { useState, useRef, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog'
import { MarkdownRenderer } from './MarkdownRenderer'
import { Confetti, ConfettiRef } from '@/components/magicui/confetti'
import { Dock, DockIcon } from '@/components/magicui/dock'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { toast } from 'sonner'
import { Copy, Download, Edit, Share, Bookmark, Printer, X } from 'lucide-react'

interface NoteModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  content: string
  modelInfo?: string
}

export function NoteModal({ isOpen, onOpenChange, content, modelInfo }: NoteModalProps) {
  const [copied, setCopied] = useState(false)
  const confettiRef = useRef<ConfettiRef>(null)
  const [title, setTitle] = useState<string>("生成的笔记")

  // 当模态框打开时触发彩带效果
  useEffect(() => {
    if (isOpen && confettiRef.current) {
      setTimeout(() => {
        confettiRef.current?.fire()
      }, 300)
    }
  }, [isOpen])

  // 提取内容的第一行作为标题
  useEffect(() => {
    if (content) {
      const firstLine = content.split('\n').find(line => line.trim() !== '')
      if (firstLine) {
        // 移除Markdown标记并截取前30个字符
        const cleanTitle = firstLine
          .replace(/^#+\s+/, '') // 移除标题标记
          .replace(/[*_`~]/g, '') // 移除其他Markdown标记
          .trim()
        
        setTitle(cleanTitle.length > 30 ? cleanTitle.substring(0, 30) + '...' : cleanTitle)
      }
    }
  }, [content])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    toast.success('已复制到剪贴板')
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadMarkdown = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `booknote-${new Date().toISOString().split('T')[0]}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('笔记已下载')
  }

  const printNote = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>BookNote-LLM 笔记</title>
            <style>
              body {
                font-family: system-ui, -apple-system, sans-serif;
                line-height: 1.6;
                padding: 2rem;
                max-width: 800px;
                margin: 0 auto;
              }
              h1, h2, h3, h4, h5, h6 {
                margin-top: 1.5em;
                margin-bottom: 0.5em;
              }
              p {
                margin-bottom: 1em;
              }
              blockquote {
                border-left: 4px solid #e5e7eb;
                padding-left: 1rem;
                font-style: italic;
                margin: 1rem 0;
              }
              pre {
                background-color: #f3f4f6;
                padding: 1rem;
                border-radius: 0.25rem;
                overflow-x: auto;
              }
              code {
                font-family: monospace;
              }
              @media print {
                body {
                  padding: 0;
                }
              }
            </style>
          </head>
          <body>
            <div id="content"></div>
            <script>
              document.getElementById('content').innerHTML = \`${content.replace(/`/g, '\\`')}\`;
              setTimeout(() => { window.print(); window.close(); }, 500);
            </script>
          </body>
        </html>
      `)
      printWindow.document.close()
    }
    toast.success('正在准备打印...')
  }

  const shareNote = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'BookNote-LLM 笔记',
          text: content.substring(0, 100) + '...',
          url: window.location.href,
        })
        .then(() => toast.success('分享成功'))
        .catch((error) => toast.error('分享失败: ' + error))
    } else {
      toast.info('您的浏览器不支持分享功能')
    }
  }

  const saveToBookmarks = () => {
    // 这里可以实现保存到书签的功能
    toast.success('已保存到书签')
  }

  const editNote = () => {
    // 这里可以实现编辑笔记的功能
    toast.info('编辑功能即将推出')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-screen h-screen max-w-none m-0 p-0 rounded-none overflow-hidden flex flex-col">
        <Confetti
          ref={confettiRef}
          options={{
            particleCount: 100,
            spread: 70,
            origin: { y: 0.25 },
          }}
          manualstart={true}
          className="absolute inset-0 pointer-events-none"
        />

        <DialogHeader className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b p-4 flex flex-row items-center justify-between">
          <div className="flex-1 flex justify-start">
            <span className="text-green-500 dark:text-green-400 text-xl">📝</span>
          </div>
          
          <DialogTitle className="flex-1 text-center text-xl font-medium">
            {title}
            {modelInfo && <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">{modelInfo}</span>}
          </DialogTitle>
          
          <div className="flex-1 flex justify-end">
            <TooltipProvider>
              <Dock
                className="bg-transparent"
                iconSize={32}
                iconMagnification={36}
                iconDistance={80}
              >
                <DockIcon className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" onClick={() => onOpenChange(false)}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center justify-center h-full w-full">
                        <X className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>关闭</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              </Dock>
            </TooltipProvider>
          </div>
        </DialogHeader>

        <div className="flex-grow overflow-auto p-6">
          <MarkdownRenderer content={content} />
        </div>

        <div className="border-t p-4 flex justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
          <TooltipProvider>
            <Dock
              className="bg-white/50 dark:bg-black/50 backdrop-blur-md border border-gray-200 dark:border-gray-800"
              iconSize={40}
              iconMagnification={48}
              iconDistance={100}
            >
              <DockIcon className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" onClick={copyToClipboard}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center h-full w-full">
                      <Copy className={`h-5 w-5 ${copied ? 'text-green-500' : ''}`} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>复制</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>

              <div className="h-full w-px bg-gray-200 dark:bg-gray-700 mx-1" />

              <DockIcon className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" onClick={downloadMarkdown}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center h-full w-full">
                      <Download className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>下载 Markdown</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>

              <div className="h-full w-px bg-gray-200 dark:bg-gray-700 mx-1" />

              <DockIcon className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" onClick={printNote}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center h-full w-full">
                      <Printer className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>打印</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>

              <div className="h-full w-px bg-gray-200 dark:bg-gray-700 mx-1" />

              <DockIcon className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" onClick={editNote}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center h-full w-full">
                      <Edit className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>编辑</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>

              <div className="h-full w-px bg-gray-200 dark:bg-gray-700 mx-1" />

              <DockIcon className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" onClick={shareNote}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center h-full w-full">
                      <Share className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>分享</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>

              <div className="h-full w-px bg-gray-200 dark:bg-gray-700 mx-1" />

              <DockIcon className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" onClick={saveToBookmarks}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center h-full w-full">
                      <Bookmark className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>保存到书签</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            </Dock>
          </TooltipProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}
