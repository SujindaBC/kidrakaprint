'use client';

import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';

const FileUpload = ({ onFileAnalyzed }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file) => {
    if (file) {
      setAnalyzing(true);
      try {
        // For demo, we'll just count pages as 10
        const info = {
          name: file.name,
          type: file.type === 'application/pdf' ? 'PDF' : 'image',
          size: (file.size / (1024 * 1024)).toFixed(2), // MB
          pageCount: 10,
          colorPages: 0,
          bwPages: 10
        };
        setFileInfo(info);
        onFileAnalyzed(info);
      } catch (err) {
        setError(err.message);
      } finally {
        setAnalyzing(false);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Upload className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">อัพโหลดเอกสาร</h2>
        </div>
        {fileInfo && (
          <button
            onClick={() => {
              setFileInfo(null);
              onFileAnalyzed(null);
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            อัพโหลดไฟล์ใหม่
          </button>
        )}
      </div>

      {!fileInfo ? (
        <div
          className={`border-2 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'
          } rounded-lg p-8 text-center transition-colors duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="max-w-sm mx-auto">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer"
            >
              <FileText className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                คลิกเพื่ออัพโหลดหรือลากไฟล์มาวาง
              </p>
              <p className="text-sm text-gray-500">
                รองรับไฟล์ PDF, JPG, PNG
              </p>
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">ข้อมูลเอกสาร</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">ชื่อไฟล์</p>
                <p className="text-gray-900 font-medium">{fileInfo.name}</p>
              </div>
              <div>
                <p className="text-gray-600">ประเภท</p>
                <p className="text-gray-900 font-medium">{fileInfo.type}</p>
              </div>
              <div>
                <p className="text-gray-600">ขนาด</p>
                <p className="text-gray-900 font-medium">{fileInfo.size} MB</p>
              </div>
              <div>
                <p className="text-gray-600">จำนวนหน้าทั้งหมด</p>
                <p className="text-gray-900 font-medium">{fileInfo.pageCount} หน้า</p>
              </div>
              <div>
                <p className="text-gray-600">หน้าสี</p>
                <p className="text-gray-900 font-medium">{fileInfo.colorPages} หน้า</p>
              </div>
              <div>
                <p className="text-gray-600">หน้าขาวดำ</p>
                <p className="text-gray-900 font-medium">{fileInfo.bwPages} หน้า</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {analyzing && (
        <div className="mt-4 text-center text-gray-600">
          <p>กำลังวิเคราะห์เอกสาร...</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;