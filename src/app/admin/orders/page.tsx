"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface Order {
    id: string;
    productName: string;
    quantity: number;
    totalPrice: number;
    status: string;
    createdAt: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders");
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="p-6">Đang tải đơn hàng...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-[#FF6B6B]">Danh sách đơn hàng</h1>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Mã đơn</th>
                            <th className="px-4 py-2 border">Sản phẩm</th>
                            <th className="px-4 py-2 border">Số lượng</th>
                            <th className="px-4 py-2 border">Tổng tiền</th>
                            <th className="px-4 py-2 border">Trạng thái</th>
                            <th className="px-4 py-2 border">Ngày tạo</th>
                            <th className="px-4 py-2 border">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">#{order.id.slice(0, 6)}</td>
                                <td className="px-4 py-2 border">{order.productName}</td>
                                <td className="px-4 py-2 border">{order.quantity}</td>
                                <td className="px-4 py-2 border">{order.totalPrice.toLocaleString()}đ</td>
                                <td className="px-4 py-2 border">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${order.status === "PENDING"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : order.status === "CONFIRMED"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : order.status === "COMPLETED"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2 border">{format(new Date(order.createdAt), "dd/MM/yyyy")}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        onClick={() => router.push(`/admin/orders/${order.id}`)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Xem chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">
                                    Không có đơn hàng nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
