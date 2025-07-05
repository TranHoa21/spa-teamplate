"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    const [deleting, setDeleting] = useState<string | null>(null);
    const router = useRouter();

    // Lấy danh sách đơn hàng
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/booking");
                const data = await res.json();

                if (data.success && Array.isArray(data.orders)) {
                    setOrders(data.orders);
                } else {
                    console.error("Dữ liệu trả về không hợp lệ:", data);
                    setOrders([]); // Tránh lỗi .map()
                }
            } catch (err) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", err);
                setOrders([]); // Xử lý lỗi để tránh .map() trên undefined
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Hàm xóa đơn hàng
    const handleDelete = async (orderId: string) => {
        if (!confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) return;
        setDeleting(orderId);

        try {
            const res = await fetch(`/api/booking/${orderId}`, { method: "DELETE" });
            if (res.ok) {
                setOrders((prev) => prev.filter((order) => order.id !== orderId));
                alert("Xóa đơn hàng thành công!");
            } else {
                alert("Xóa đơn hàng thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa đơn hàng:", error);
            alert("Lỗi khi xóa đơn hàng!");
        } finally {
            setDeleting(null);
        }
    };

    if (loading) return <div className="p-6">Đang tải đơn hàng...</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-6">
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
                                <td className="px-4 py-2 border">#{order.id.toString().slice(0, 6)}</td>
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
                                <td className="px-4 py-2 border flex gap-3">
                                    {/* Nút Chỉnh sửa */}
                                    <button
                                        onClick={() => router.push(`/admin/orders/${order.id}`)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Chỉnh sửa
                                    </button>

                                    {/* Nút Xóa */}
                                    <button
                                        onClick={() => handleDelete(order.id)}
                                        className={`text-red-600 hover:underline text-sm ${deleting === order.id ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        disabled={deleting === order.id}
                                    >
                                        {deleting === order.id ? "Đang xóa..." : "Xóa"}
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
        </motion.div>
    );
}
