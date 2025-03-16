import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-950 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          {children}
        </main>
        <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} BookNote-LLM</p>
        </footer>
      </div>
    </div>
  );
}

interface TabsLayoutProps {
  textInputTab: React.ReactNode;
  fileUploadTab: React.ReactNode;
}

export function TabsLayout({ textInputTab, fileUploadTab }: TabsLayoutProps) {
  return (
    <Tabs defaultValue="text-input" className="w-full">
      <TabsList className="w-full flex justify-center mb-6 space-x-2 bg-transparent">
        <TabsTrigger 
          value="text-input" 
          className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 rounded-full px-6 py-2.5 transition-all"
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            <span>粘贴内容</span>
          </div>
        </TabsTrigger>
        <TabsTrigger 
          value="file-upload" 
          className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-md dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-blue-400 rounded-full px-6 py-2.5 transition-all"
        >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span>上传文件</span>
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="text-input" className="mt-2 focus-visible:outline-none focus-visible:ring-0">
        {textInputTab}
      </TabsContent>
      <TabsContent value="file-upload" className="mt-2 focus-visible:outline-none focus-visible:ring-0">
        {fileUploadTab}
      </TabsContent>
    </Tabs>
  );
} 