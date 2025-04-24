"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Order {
    id: number;
    name: string;
    status: string;
    paymentMethod: string;
    totalPrice: string;
}

const Transactions = () => {
    const [data, setData] = useState<Order[]>([]);

    const formatPrice = (price: string) => {
        const amount = parseFloat(price);
        return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/orders`); // Next.js API route
                const sortedData = response.data.orders.sort((a: Order, b: Order) => b.id - a.id);
                setData(sortedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Latest Transactions</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 border border-gray-200 text-left">Name</th>
                            <th className="p-3 border border-gray-200 text-left">Status</th>
                            <th className="p-3 border border-gray-200 text-left">Method</th>
                            <th className="p-3 border border-gray-200 text-left">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(0, 4).map((booking, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="p-3 flex items-center gap-2">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src="https://res.cloudinary.com/dhjrrk4pg/image/upload/v1715060332/user_1177568_mxilzq.png"
                                        alt="User"
                                    />
                                    {booking.name}
                                </td>
                                <td className="p-3">
                                    <span className={`px-3 py-1 text-sm font-medium rounded-full 
                                        ${booking.status.toLowerCase() === "completed" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}
                                    `}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="p-3">{booking.paymentMethod}</td>
                                <td className="p-3 font-semibold text-right">{formatPrice(booking.totalPrice)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default Transactions;
