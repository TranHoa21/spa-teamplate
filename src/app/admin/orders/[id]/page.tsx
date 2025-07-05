"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

interface OrderItem {
    id: number;
    productId: string;
    productName?: string;
    quantity: number;
    designType: string;
    drawStyle?: string;
    font?: string;
    customText?: string;
    imageUrl: string;
    selectedOption?: string;
}

interface Order {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    paymentMethod: string;
    totalPrice: number;
    status: string;
    transactionNo?: string;
    paymentTime?: string;
    orderItems: OrderItem[];
}

export default function OrderEditPage() {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        const fetchOrder = async () => {
            try {
                const response = await axios.get(`/api/booking/${id}`);
                setOrder(response.data.order);
            } catch (error) {
                console.error("Lỗi khi lấy đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!order) return;
        setOrder({ ...order, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!order) return;
        setSaving(true);
        try {
            await axios.put(`/api/booking/${id}`, order);
            alert("Cập nhật thành công!");
            router.push("/admin/orders");
        } catch (error) {
            console.error("Lỗi khi cập nhật đơn hàng:", error);
            alert("Có lỗi xảy ra!");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <p className="text-center py-4">Đang tải dữ liệu...</p>;
    if (!order) return <p className="text-center py-4 text-red-500">Không tìm thấy đơn hàng!</p>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Chỉnh Sửa Đơn Hàng</h2>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">Tên khách hàng:</label>
                    <input
                        type="text"
                        name="name"
                        value={order.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={order.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Số điện thoại:</label>
                    <input
                        type="text"
                        name="phone"
                        value={order.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Địa chỉ:</label>
                    <input
                        type="text"
                        name="address"
                        value={order.address}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Phương thức thanh toán:</label>
                    <input
                        type="text"
                        name="paymentMethod"
                        value={order.paymentMethod}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-gray-700">Trạng thái đơn hàng:</label>
                    <input
                        type="text"
                        name="status"
                        value={order.status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
            </div>

            {/* Danh sách sản phẩm */}
            {order.orderItems.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Danh sách sản phẩm trong đơn hàng</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {order.orderItems.map((item, index) => (
                            <div key={item.id} className="border rounded-lg p-4 shadow bg-gray-50">
                                <h4 className="font-semibold text-lg mb-2">Sản phẩm {index + 1}</h4>
                                <p><strong>Tên sản phẩm:</strong> {item.productName || "Không xác định"}</p>
                                <p><strong>Loại thiết kế:</strong> {item.designType}</p>
                                <p><strong>Phong cách:</strong> {item.drawStyle || "-"}</p>
                                <p><strong>Font chữ:</strong> {item.font || "-"}</p>
                                <p><strong>Chữ tuỳ chỉnh:</strong> {item.customText || "-"}</p>
                                <p><strong>Số lượng:</strong> {item.quantity}</p>
                                <p><strong>Tuỳ chọn:</strong> {item.selectedOption || "-"}</p>
                                {item.imageUrl && (
                                    <div className="mt-2">
                                        <img
                                            src={item.imageUrl}
                                            alt="Ảnh sản phẩm"
                                            className="max-h-40 rounded shadow"
                                        />
                                        <a
                                            href={item.imageUrl}
                                            download={`orderitem_${item.id}.jpg`}
                                            className="inline-block mt-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                                        >
                                            Tải ảnh
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={handleSave}
                className={`mt-6 px-6 py-2 text-white rounded ${saving ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
                disabled={saving}
            >
                {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
        </motion.div>
    );
}
