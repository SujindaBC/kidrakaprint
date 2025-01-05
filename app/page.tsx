'use client';
import { useState, useEffect } from 'react'
import Script from 'next/script'
import FileUpload from '@/components/print/FileUpload'
import PriceCalculator from '@/components/print/PriceCalculator'
import ConfigurationPanel from '@/components/print/ConfigurationPanel'

export default function Home() {
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [showConfig, setShowConfig] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Top Ad Script */}
        <Script 
          id="top-ad-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
          }}
        />
        <ins 
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6272836017246600"
          data-ad-slot="5054851327"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>

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

        {/* Bottom Ad Script */}
        <Script 
          id="bottom-ad-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({});`
          }}
        />
        <ins 
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-6272836017246600"
          data-ad-slot="5614088676"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </main>
  )
}