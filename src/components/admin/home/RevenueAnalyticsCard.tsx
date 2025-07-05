'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { icons } from "@/lib/data/icon";
import AnalyticsWidgetSummary from "./AnalyticsWidgetSummary";
import Image from 'next/image';
import { motion } from "framer-motion";

const RevenueAnalyticsCard = () => {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [percentIncrease, setPercentIncrease] = useState(0);

    const formatPrice = (price: number) => {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/booking');
                const data = response.data.orders;

                console.log("API Response:", data); // Debug
                if (!Array.isArray(data)) {
                    console.error("API response is not an array", data);
                    return;
                }

                const now = new Date();
                const currentMonth = now.getUTCMonth();
                const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

                const revenueInCurrentMonth = data.filter((order) => {
                    if (!order || !order.createdAt) return false;
                    const orderDate = new Date(order.createdAt);
                    return orderDate.getUTCMonth() === currentMonth;
                });

                const revenueInPreviousMonth = data.filter((order) => {
                    if (!order || !order.createdAt) return false;
                    const orderDate = new Date(order.createdAt);
                    return orderDate.getUTCMonth() === previousMonth;
                });

                const totalRevenueInCurrentMonth = revenueInCurrentMonth.reduce((total, order) => total + (order.totalPrice || 0), 0);
                const totalRevenueInPreviousMonth = revenueInPreviousMonth.reduce((total, order) => total + (order.totalPrice || 0), 0);

                console.log("Revenue This Month:", totalRevenueInCurrentMonth);
                console.log("Revenue Last Month:", totalRevenueInPreviousMonth);

                let percentIncrease = 0;
                if (totalRevenueInPreviousMonth !== 0) {
                    percentIncrease = ((totalRevenueInCurrentMonth - totalRevenueInPreviousMonth) / totalRevenueInPreviousMonth) * 100;
                } else if (totalRevenueInCurrentMonth !== 0) {
                    percentIncrease = 100;
                }

                setTotalRevenue(totalRevenueInCurrentMonth);
                setPercentIncrease(percentIncrease);

            } catch (error) {
                console.error("Error fetching revenue data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-6 bg-white shadow-lg rounded-lg">
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
                    icon={<Image alt="icon" src="/assets/icons/revenue/ic-revenue.svg" width={24} height={24} className="w-6 h-6" />}
                    chart={{
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                        series: [40, 70, 50, 28, 70, 75, 7, 64],
                    }}
                />
            </div>
        </motion.div>
    );
};

export default RevenueAnalyticsCard;
