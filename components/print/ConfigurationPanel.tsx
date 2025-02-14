'use client';

import React, { useState } from 'react';
import { Wrench } from 'lucide-react';

// Define an interface for the paper type
interface PaperType {
  name: string;
  color: string;
  cost: number;
}

const ConfigurationPanel: React.FC = () => {
  const [paperTypes, setPaperTypes] = useState<PaperType[]>([
    { name: 'กระดาษธรรมดา A4', color: '#FFFFFF', cost: 0.27 },
    { name: 'กระดาษพรีเมียม', color: '#F0F0F0', cost: 0.7 },
  ]);

  // Add explicit type annotations to the function parameters
  const handlePaperTypeChange = (
    index: number, 
    field: keyof PaperType, 
    value: string | number
  ) => {
    const newPaperTypes = [...paperTypes];
    newPaperTypes[index] = {
      ...newPaperTypes[index],
      [field]: value
    };
    setPaperTypes(newPaperTypes);
  };

  const addPaperType = () => {
    setPaperTypes([
      ...paperTypes,
      { name: 'กระดาษใหม่', color: '#000000', cost: 0 }
    ]);
  };

  const removePaperType = (index: number) => {
    if (paperTypes.length > 1) {
      const newPaperTypes = paperTypes.filter((_, i) => i !== index);
      setPaperTypes(newPaperTypes);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Wrench className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-900">ตั้งค่ากระดาษ</h2>
      </div>

      <div className="space-y-4 text-gray-900">
        {paperTypes.map((paperType, index) => (
          <div 
            key={index} 
            className="grid grid-cols-[1fr_1fr_auto] gap-4 items-center"
          >
            <input
              type="text"
              value={paperType.name}
              onChange={(e) => handlePaperTypeChange(index, 'name', e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded"
              placeholder="ชื่อประเภทกระดาษ"
            />
            
            <input
              type="number"
              step="0.01"
              value={paperType.cost}
              onChange={(e) => handlePaperTypeChange(index, 'cost', parseFloat(e.target.value))}
              className="w-full p-2 border-2 border-gray-300 rounded"
              placeholder="ราคา"
            />
            {paperTypes.length > 1 && (
              <button
                onClick={() => removePaperType(index)}
                className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
              >
                ลบ
              </button>
            )}
          </div>
        ))}

        <div className="mt-4">
          <button
            onClick={addPaperType}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
          >
            เพิ่มประเภทกระดาษ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationPanel;