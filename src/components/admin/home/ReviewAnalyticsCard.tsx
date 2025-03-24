'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { icons } from "@/app/data/icon";
import AnalyticsWidgetSummary from "./AnalyticsWidgetSummary";

const ReviewAnalyticsCard = () => {
    const [totalReviews, setTotalReviews] = useState(0);
    const [percentIncrease, setPercentIncrease] = useState(0);
    const [reviewData, setReviewData] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/reviews'); // API Next.js
                const data = response.data;

                const currentMonth = new Date().getMonth();
                const previousMonth = currentMonth - 1;

                const reviewsInCurrentMonth = data.filter((review: { created_at: string }) => {
                    const startDay = new Date(review.created_at);
                    return startDay.getMonth() === currentMonth;
                });

                const reviewsInPreviousMonth = data.filter((review: { created_at: string }) => {
                    const startDay = new Date(review.created_at);
                    return startDay.getMonth() === previousMonth;
                });

                const totalReviewsInCurrentMonth = reviewsInCurrentMonth.length;
                const totalReviewsInPreviousMonth = reviewsInPreviousMonth.length;

                let percentIncrease = 0;
                if (totalReviewsInPreviousMonth !== 0) {
                    percentIncrease = ((totalReviewsInCurrentMonth - totalReviewsInPreviousMonth) / totalReviewsInPreviousMonth) * 100;
                } else if (totalReviewsInCurrentMonth !== 0) {
                    percentIncrease = 100;
                }

                setTotalReviews(totalReviewsInCurrentMonth);
                setPercentIncrease(percentIncrease);
                setReviewData(Array(8).fill(0)); // Dữ liệu giả định cho biểu đồ

            } catch (error) {
                console.error("Error fetching review data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <span className="text-3xl text-yellow-500">{icons.star}</span>
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
            <p className="text-gray-500">New Reviews</p>
            <h3 className="text-3xl font-bold">{totalReviews}</h3>
            <div className="mt-6">
                <AnalyticsWidgetSummary
                    title="Weekly Reviews"
                    percent={2.6}
                    total={714000}
                    icon={<img alt="icon" src="/assets/icons/review/ic-review.svg" className="w-6 h-6" />}
                    chart={{
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                        series: [56, 30, 23, 54, 47, 40, 62, 73],
                    }}
                />
            </div>
        </div>
    );
};

export default ReviewAnalyticsCard;
