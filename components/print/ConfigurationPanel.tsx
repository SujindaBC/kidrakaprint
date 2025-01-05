'use client';

import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const ConfigurationPanel = () => {
  const [paperTypes, setPaperTypes] = useState([
    { name: 'กระดาษธรรมดา A4', cost: 0.30 },
    { name: 'กระดาษโฟโต้ 100+ gsm', cost: 6 },
    { name: 'กระดาษโฟโต้ 200+ gsm', cost: 7 },
    { name: 'กระดาษการ์ดขาว', cost: 3 },
    { name: 'กระดาษสี', cost: 1.5 }
  ]);

  const [volumePricing, setVolumePricing] = useState({
    bw: {
      1: 3.0,
      10: 2.8,
      20: 2.5,
      50: 2.2,
      100: 2.0
    },
    color: {
      1: 5.0,
      10: 4.5,
      20: 4.0,
      50: 3.5,
      100: 3.0
    }
  });

  const [editingMode, setEditingMode] = useState(false);

  const handleSave = () => {
    localStorage.setItem('printPricing', JSON.stringify({
      paperTypes,
      volumePricing
    }));
    setEditingMode(false);
  };

  const handlePaperTypeChange = (index, field, value) => {
    const newPaperTypes = [...paperTypes];
    newPaperTypes[index] = {
      ...newPaperTypes[index],
      [field]: field === 'cost' ? parseFloat(value) : value
    };
    setPaperTypes(newPaperTypes);
  };

  const handleVolumeChange = (type, pages, value) => {
    setVolumePricing({
      ...volumePricing,
      [type]: {
        ...volumePricing[type],
        [pages]: parseFloat(value)
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">ตั้งค่าราคา</h2>
        </div>
        <button
          onClick={() => editingMode ? handleSave() : setEditingMode(true)}
          className={`px-4 py-2 rounded ${
            editingMode 
              ? 'bg-blue-600 text-white hover:bg-blue-700 text-gray-900' 
              : 'border border-gray-300 hover:bg-gray-50 text-gray-900'
          }`}
        >
          {editingMode ? 'บันทึก' : 'แก้ไข'}
        </button>
      </div>

      <div className="space-y-8">
        {/* ประเภทกระดาษ */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ประเภทกระดาษ</h3>
          <div className="space-y-3">
            {paperTypes.map((paper, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={paper.name}
                  onChange={(e) => handlePaperTypeChange(index, 'name', e.target.value)}
                  disabled={!editingMode}
                  className="p-2 border rounded text-gray-900 disabled:bg-gray-50"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={paper.cost}
                    onChange={(e) => handlePaperTypeChange(index, 'cost', e.target.value)}
                    disabled={!editingMode}
                    step="0.01"
                    className="p-2 border rounded w-24 text-gray-900 disabled:bg-gray-50"
                  />
                  <span className="text-gray-600">บาท/แผ่น</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ราคาตามจำนวน */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ราคาตามจำนวน</h3>
          <div className="grid grid-cols-2 gap-8">
            {/* ขาว-ดำ */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">ขาว-ดำ</h4>
              <div className="space-y-3">
                {Object.entries(volumePricing.bw).map(([pages, price]) => (
                  <div key={pages} className="flex items-center gap-2">
                    <span className="w-16 text-gray-600">{pages}+ หน้า:</span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => handleVolumeChange('bw', pages, e.target.value)}
                      disabled={!editingMode}
                      step="0.1"
                      className="p-2 border rounded w-24 text-gray-900 disabled:bg-gray-50"
                    />
                    <span className="text-gray-600">บาท/หน้า</span>
                  </div>
                ))}
              </div>
            </div>

            {/* สี */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">สี</h4>
              <div className="space-y-3">
                {Object.entries(volumePricing.color).map(([pages, price]) => (
                  <div key={pages} className="flex items-center gap-2">
                    <span className="w-16 text-gray-600">{pages}+ หน้า:</span>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => handleVolumeChange('color', pages, e.target.value)}
                      disabled={!editingMode}
                      step="0.1"
                      className="p-2 border rounded w-24 text-gray-900 disabled:bg-gray-50"
                    />
                    <span className="text-gray-600">บาท/หน้า</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;