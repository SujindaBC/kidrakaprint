'use client';

import React, { useState, useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';
import { FileInfo } from '@/app/page';

interface FileUploadProps {
  onFileAnalyzed: (fileInfo: FileInfo | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileAnalyzed }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const analyzeFile = useCallback(async (file: File) => {
    setIsAnalyzing(true);
    setUploadError(null);

    try {
      // Basic file analysis with default pageCount
      const fileAnalysis: FileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
        pageCount: 1,  // Default to 1, update with actual page count
        colorPages: 0,
        bwPages: 1
      };

      // Additional analysis for PDFs or specific file types
      if (file.type === 'application/pdf') {
        // You might want to use a PDF.js or other library to count pages
        // This is a placeholder - you'll need to implement actual PDF page counting
        // fileAnalysis.pageCount = await countPdfPages(file);
      }

      onFileAnalyzed(fileAnalysis);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setUploadError(errorMessage);
      onFileAnalyzed(null);
    } finally {
      setIsAnalyzing(false);
    }
  }, [onFileAnalyzed]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      analyzeFile(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Upload className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">อัปโหลดไฟล์</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label 
            htmlFor="file-upload" 
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FileText className="h-10 w-10 text-gray-400 mb-4" />
              <p className="mb-2 text-sm text-gray-500">
                {isAnalyzing 
                  ? 'กำลังวิเคราะห์ไฟล์...' 
                  : 'คลิกเพื่ออัปโหลดหรือลากไฟล์มาวางที่นี่'}
              </p>
              <p className="text-xs text-gray-400">PDF, DOC, DOCX</p>
            </div>
            <input 
              id="file-upload"
              type="file" 
              className="hidden"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              disabled={isAnalyzing}
            />
          </label>
        </div>

        {uploadError && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{uploadError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;