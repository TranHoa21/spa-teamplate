'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { icons } from "@/app/data/icon";
import AnalyticsWidgetSummary from "./AnalyticsWidgetSummary";

const RevenueAnalyticsCard = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [percentIncrease, setPercentIncrease] = useState(0);
    const [revenueData, setRevenueData] = useState<number[]>([]);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/orders'); // API Next.js
                const data = response.data.orders;

                const currentMonth = new Date().getMonth();
                const previousMonth = currentMonth - 1;

                const revenueInCurrentMonth = data.filter((order: { created_at: string }) => {
                    const startDay = new Date(order.created_at);
                    return startDay.getMonth() === currentMonth;
                });

                const revenueInPreviousMonth = data.filter((order: { created_at: string }) => {
                    const startDay = new Date(order.created_at);
                    return startDay.getMonth() === previousMonth;
                });

                const totalRevenueInCurrentMonth = revenueInCurrentMonth.reduce((total: number, order: { total_amount: string }) => total + parseFloat(order.total_amount), 0);
                const totalRevenueInPreviousMonth = revenueInPreviousMonth.reduce((total: number, order: { total_amount: string }) => total + parseFloat(order.total_amount), 0);

                let percentIncrease = 0;
                if (totalRevenueInPreviousMonth !== 0) {
                    percentIncrease = ((totalRevenueInCurrentMonth - totalRevenueInPreviousMonth) / totalRevenueInPreviousMonth) * 100;
                } else if (totalRevenueInCurrentMonth !== 0) {
                    percentIncrease = 100;
                }

                setTotalRevenue(totalRevenueInCurrentMonth);
                setPercentIncrease(percentIncrease);
                setRevenueData(Array(8).fill(0)); // Dữ liệu giả định cho biểu đồ

            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <span className="text-3xl text-green-500">{icons.revenue}</span>
                    <div>
                        <span className={`text-lg font-semibold ${percentIncrease >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {isFinite(percentIncrease) ? (
                                percentIncrease > 0 ? `+${Math.round(percentIncrease)}%` : `-${Math.round(Math.abs(percentIncrease))}%`
                            ) : 'N/A'}
                        </span>
                        <span className="text-gray-600"> {percentIncrease >= 0 ? "more" : "less"}</span>
                    </div>
                </div>
            </div>
            <p className="text-gray-500">Total Revenue</p>
            <h3 className="text-3xl font-bold">{formatPrice(totalRevenue)}</h3>
            <div className="mt-6">
                <AnalyticsWidgetSummary
                    title="Weekly Revenue"
                    percent={2.6}
                    total={714000}
                    icon={<img alt="icon" src="/assets/icons/revenue/ic-revenue.svg" className="w-6 h-6" />}
                    chart={{
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                        series: [40, 70, 50, 28, 70, 75, 7, 64],
                    }}
                />
            </div>
        </div>
    );
};

export default RevenueAnalyticsCard;
