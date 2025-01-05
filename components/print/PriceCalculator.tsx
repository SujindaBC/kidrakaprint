'use client';

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

// Define more specific types
interface PaperType {
    name: string;
    cost: number;
}

interface VolumePricing {
    [key: number]: number;
}

interface DefaultConfig {
    paperTypes: {
        [key: string]: PaperType;
    };
    volumePricing: {
        bw: VolumePricing;
        color: VolumePricing;
    };
}

interface FileInfo {
    pageCount: number;
    colorPages?: number;
    bwPages?: number;
}

interface OrderDetails {
    copies: number;
    paperType: string;
    doubleSided: boolean;
}

interface PriceCalculation {
    printing: number;
    paper: number;
    total: number;
    perPage: number;
    totalPages: number;
}

const defaultConfig: DefaultConfig = {
    paperTypes: {
        plain: { name: 'กระดาษธรรมดา A4', cost: 0.27 },
        premium: { name: 'กระดาษพรีเมียม', cost: 0.7 },
        photo: { name: 'กระดาษโฟโต้', cost: 2 },
        color_paper: { name: 'กระดาษสี', cost: 0.5 },
        sticker: { name: 'กระดาษสติกเกอร์', cost: 3 }
    },
    volumePricing: {
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
    }
};

const PriceCalculator: React.FC<{ fileInfo: FileInfo }> = ({ fileInfo }) => {
    const [orderDetails, setOrderDetails] = useState<OrderDetails>({
        copies: 1,
        paperType: 'plain',
        doubleSided: false
    });

    const roundUpToWholeBaht = (price: number): number => {
        return Math.ceil(price);
    };

    const getBasePrice = (pages: number, type: 'bw' | 'color'): number => {
        const prices = defaultConfig.volumePricing[type];
        const thresholds = Object.keys(prices)
            .map(Number)
            .sort((a, b) => b - a);

        for (const threshold of thresholds) {
            if (pages >= threshold) {
                return prices[threshold];
            }
        }
        return prices[1];
    };

    const calculatePrice = (): PriceCalculation | null => {
        if (!fileInfo?.pageCount) return null;

        const totalPages = fileInfo.pageCount * orderDetails.copies;
        const paperCost = defaultConfig.paperTypes[orderDetails.paperType].cost;

        // Calculate effective pages for double-sided printing
        const effectivePages = orderDetails.doubleSided
            ? Math.ceil(fileInfo.pageCount / 2)
            : fileInfo.pageCount;

        // Default to BW if color info is not available
        const colorPages = fileInfo.colorPages || 0;
        const bwPages = fileInfo.bwPages || fileInfo.pageCount;

        // Calculate printing costs
        const bwPrintingCost = bwPages * getBasePrice(bwPages * orderDetails.copies, 'bw') * orderDetails.copies;
        const colorPrintingCost = colorPages * getBasePrice(colorPages * orderDetails.copies, 'color') * orderDetails.copies;
        const totalPaperCost = fileInfo.pageCount * paperCost * orderDetails.copies;
        const totalPrintingCost = bwPrintingCost + colorPrintingCost;

        return {
            printing: roundUpToWholeBaht(totalPrintingCost),
            paper: roundUpToWholeBaht(totalPaperCost),
            total: roundUpToWholeBaht(totalPrintingCost + totalPaperCost),
            perPage: roundUpToWholeBaht(getBasePrice(totalPages, 'bw') + paperCost),
            totalPages
        };
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
                <Calculator className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">คำนวณราคา</h2>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">จำนวนชุด</label>
                        <input
                            type="number"
                            min="1"
                            value={orderDetails.copies}
                            onChange={(e) => setOrderDetails(prev => ({
                                ...prev,
                                copies: Math.max(1, parseInt(e.target.value) || 1)
                            }))}
                            className="w-full p-2 border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">ประเภทกระดาษ</label>
                        <select
                            value={orderDetails.paperType}
                            onChange={(e) => setOrderDetails(prev => ({
                                ...prev,
                                paperType: e.target.value
                            }))}
                            className="w-full p-2 border-2 border-gray-300 rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-gray-900"
                        >
                            {Object.entries(defaultConfig.paperTypes).map(([key, { name }]) => (
                                <option key={key} value={key}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={orderDetails.doubleSided}
                                onChange={(e) => setOrderDetails(prev => ({
                                    ...prev,
                                    doubleSided: e.target.checked
                                }))}
                                className="w-4 h-4 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm font-semibold text-gray-900">พิมพ์สองด้าน</span>
                        </label>
                    </div>
                </div>

                {fileInfo && (() => {
                    const calculation = calculatePrice();
                    if (!calculation) return null;

                    return (
                        <div className="mt-6 space-y-4">
                            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-2">รายละเอียดราคา</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-gray-900">
                                        <span>ค่าพิมพ์ ({fileInfo.pageCount} หน้า × {orderDetails.copies} ชุด)</span>
                                        <span className="font-medium">฿{calculation.printing}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-900">
                                        <span>ค่ากระดาษ</span>
                                        <span className="font-medium">฿{calculation.paper}</span>
                                    </div>
                                    <div className="border-t-2 border-gray-200 pt-2 mt-2">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-900">รวมทั้งหมด</span>
                                            <span className="text-2xl font-bold text-blue-600">฿{calculation.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-gray-900">
                                <ul className="space-y-1 list-disc pl-5">
                                    <li>ราคาต่อหน้า: <span className="font-medium">฿{calculation.perPage}</span></li>
                                    {orderDetails.doubleSided && (
                                        <li className="text-gray-900">เปิดใช้การพิมพ์สองด้าน (ปัดขึ้นเป็นจำนวนหน้าคู่)</li>
                                    )}
                                    {calculation.totalPages >= 10 && (
                                        <li className="font-medium text-blue-600">
                                            ได้รับส่วนลดสำหรับการพิมพ์จำนวนมาก
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    );
                })()}
            </div>
        </div>
    );
};

export default PriceCalculator;