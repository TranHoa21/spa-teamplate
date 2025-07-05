'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";

export default function Chart() {
    const [filteredData, setFilteredData] = useState<{ date: string; revenue: number; order: number }[]>([]);
    const [filterDuration, setFilterDuration] = useState<'3m' | '6m' | '1y'>('6m');

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/booking');

                // Kiểm tra nếu API trả về `response.data.orders`, nếu không thì dùng `response.data`
                const orders = response.data.orders || response.data;

                // Kiểm tra dữ liệu có hợp lệ không
                if (!Array.isArray(orders)) {
                    console.error("Invalid API response: expected an array but got", orders);
                    return;
                }

                const groupedData = groupDataByDate(orders);
                setFilteredData(getFilteredData(groupedData, filterDuration));

            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        }
        fetchData();
    }, [filterDuration]);

    const formatPrice = (price: number | string) => {
        const amount = typeof price === 'number' ? price : parseFloat(price);
        return `${amount.toLocaleString('vi-VN')} VND`;
    };

    function groupDataByDate(data: { createdAt: string; totalPrice: number }[]) {
        if (!Array.isArray(data)) {
            console.error("groupDataByDate received invalid data:", data);
            return [];
        }

        const groupedData: Record<string, { date: string; revenue: number; order: number }> = {};

        data.forEach((item) => {
            if (!item.createdAt || !item.totalPrice) {
                console.warn("Skipping invalid order:", item);
                return;
            }

            const createDate = new Date(item.createdAt);
            const dateStr = createDate.toISOString().split('T')[0];

            if (!groupedData[dateStr]) {
                groupedData[dateStr] = { date: dateStr, revenue: 0, order: 0 };
            }

            groupedData[dateStr].revenue += item.totalPrice;
            groupedData[dateStr].order += 1;
        });

        return Object.values(groupedData);
    }

    function getFilteredData(
        data: { date: string; revenue: number; order: number }[],
        duration: '3m' | '6m' | '1y'
    ): { date: string; revenue: number; order: number }[] {
        const today = new Date();
        const durationMap: Record<'3m' | '6m' | '1y', number> = { '3m': 90, '6m': 180, '1y': 365 };

        const days = durationMap[duration] || 90;
        const startDate = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);

        return data.filter((item) => new Date(item.date) >= startDate);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Daily Recap</h2>
            <div className="flex gap-4 mb-4">
                {(['3m', '6m', '1y'] as const).map((duration) => (
                    <button
                        key={duration}
                        className={`px-4 py-2 rounded-lg transition-all ${filterDuration === duration ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setFilterDuration(duration as '3m' | '6m' | '1y')}
                    >
                        {duration.toUpperCase()}
                    </button>
                ))}
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        formatter={(value: number | string, name: string) => {
                            if (name === "order") {
                                return `${value} Đơn`; // Hiển thị số đơn hàng
                            }
                            return formatPrice(value); // Hiển thị giá tiền có đơn vị VND
                        }}
                    />                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="order" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </motion.div>
    );
}
