"use client";

import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from 'chart.js';
import { motion } from "framer-motion";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

interface ChartData {
    categories: string[];
    series: number[];
}

interface AnalyticsWidgetSummaryProps {
    chart: ChartData;
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    sx?: object;
    [key: string]: unknown; // Cho phép thêm các props khác
}

const AnalyticsWidgetSummary: React.FC<AnalyticsWidgetSummaryProps> = ({ chart, color = 'primary', sx, ...other }) => {
    const theme = useTheme();

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
    };

    return (
        <motion.div initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }} >
            <Box sx={{ width: 84, height: 56, ...sx }} {...other}>
                <Line
                    data={{
                        labels: chart.categories,
                        datasets: [
                            {
                                data: chart.series,
                                borderColor: theme.palette[color]?.main || '#000',
                                backgroundColor: theme.palette[color]?.light || '#ddd',
                                tension: 0.4,
                                fill: true,
                            },
                        ],
                    }}
                    options={chartOptions}
                />
            </Box>
        </motion.div>
    );
};

export default AnalyticsWidgetSummary;
