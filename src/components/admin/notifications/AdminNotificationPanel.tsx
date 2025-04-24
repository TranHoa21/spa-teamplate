"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Notification {
    id: string;
    title: string;
    content: string;
    seen: boolean;
    createdAt: string;
    orderId: number;
}

export default function AdminNotificationPanel() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/notification", { cache: "no-store" });

            if (!res.ok) throw new Error(`Lỗi server: ${res.status}`);
            const data = await res.json();
            setNotifications(data);
            setUnreadCount(data.filter((n: Notification) => !n.seen).length);
        } catch (error) {
            console.error("Lỗi khi fetch notification:", error);
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            await fetch(`/api/notification/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            // Cập nhật local state để tránh gọi API lại
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, seen: true } : n))
            );
            setUnreadCount((prev) => prev - 1);
        } catch (err) {
            console.error("Lỗi khi đánh dấu đã đọc:", err);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-bold">🔔 Thông báo</span>
                {unreadCount > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </div>

            {loading ? (
                <div className="p-4 text-gray-500 text-center">⏳ Đang tải thông báo...</div>
            ) : notifications.length === 0 ? (
                <div className="p-4 text-gray-500 text-center">📭 Không có thông báo nào</div>
            ) : (
                <ul className="bg-white border border-gray-200 rounded-lg shadow-md max-h-96 overflow-auto">
                    {notifications.map((noti) => (
                        <li
                            key={noti.id}
                            className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${!noti.seen
                                ? "bg-orange-50 font-semibold text-blue-800"
                                : "text-gray-600"
                                }`}
                            onClick={() => markAsRead(noti.id)}
                        >
                            <Link href={`/admin/orders/${noti.orderId}`}>
                                <div>
                                    <div className="text-sm">{noti.title}</div>
                                    <div className="text-xs">{noti.content}</div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        {new Date(noti.createdAt).toLocaleString("vi-VN")}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
}
