'use client';
import { useState } from 'react'
import FileUpload from '@/components/print/FileUpload'
import PriceCalculator from '@/components/print/PriceCalculator'
import ConfigurationPanel from '@/components/print/ConfigurationPanel'

// Shared FileInfo interface that matches across components
export interface FileInfo {
  name: string;
  size: number;
  type: string;
  pageCount: number;  // Made required
  colorPages?: number;
  bwPages?: number;
}

export default function Home() {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">คิดราคาปริ้น</h1>
          <p className="text-gray-600 mt-2">คำนวณราคาค่าพิมพ์แบบทันที</p>
        </header>

        <button
          onClick={() => setShowConfig(!showConfig)}
          className="text-gray-900 mb-4 px-4 py-2 text-sm bg-white border rounded-lg hover:bg-gray-50 transition-colors"
        >
          {showConfig ? 'ซ่อนการตั้งค่า' : 'แสดงการตั้งค่า'}
        </button>

        {showConfig && (
          <div className="mb-8">
            <ConfigurationPanel />
          </div>
        )}

        <div className="space-y-6">
          <FileUpload onFileAnalyzed={setFileInfo} />
          {fileInfo && (
            <PriceCalculator fileInfo={fileInfo} />
          )}
        </div>
      </div>
    </main>
  )
}