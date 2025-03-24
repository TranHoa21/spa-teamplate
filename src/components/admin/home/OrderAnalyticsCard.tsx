'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { icons } from "@/lib/data/icon";
import AnalyticsWidgetSummary from "./AnalyticsWidgetSummary";
import Image from 'next/image';

const OrderAnalyticsCard = () => {
    const [totalOrders, setTotalOrders] = useState(0);
    const [percentIncrease, setPercentIncrease] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/orders'); // API Next.js
                const data = response.data.orders;

                const currentMonth = new Date().getMonth();
                const previousMonth = currentMonth - 1;

                const ordersInCurrentMonth = data.filter((order: { updated_at: string }) => {
                    const startDay = new Date(order.updated_at);
                    return startDay.getMonth() === currentMonth;
                });

                const ordersInPreviousMonth = data.filter((order: { updated_at: string }) => {
                    const startDay = new Date(order.updated_at);
                    return startDay.getMonth() === previousMonth;
                });

                const totalOrdersInCurrentMonth = ordersInCurrentMonth.length;
                const totalOrdersInPreviousMonth = ordersInPreviousMonth.length;

                let percentIncrease = 0;
                if (totalOrdersInPreviousMonth !== 0) {
                    percentIncrease = ((totalOrdersInCurrentMonth - totalOrdersInPreviousMonth) / totalOrdersInPreviousMonth) * 100;
                } else if (totalOrdersInCurrentMonth !== 0) {
                    percentIncrease = 100;
                }

                setTotalOrders(totalOrdersInCurrentMonth);
                setPercentIncrease(percentIncrease);

            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <span className="text-3xl text-blue-500">{icons.shoppingCart}</span>
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
            <p className="text-gray-500">New Orders</p>
            <h3 className="text-3xl font-bold">{totalOrders}</h3>
            <div className="mt-6">
                <AnalyticsWidgetSummary
                    title="Weekly Orders"
                    percent={2.6}
                    total={714000}
                    color="secondary"
                    icon={<Image alt="icon" src="/assets/icons/order/ic-order.svg" width={24} height={24} className="w-6 h-6" />}
                    chart={{
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                        series: [56, 47, 40, 62, 73, 30, 23, 54],
                    }}
                />
            </div>
        </div>
    );
};

export default OrderAnalyticsCard;
