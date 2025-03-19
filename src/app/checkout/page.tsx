// components/Checkout.tsx

"use client"
import { useEffect, useState } from "react";

type OrderData = {
    productName: string;
    imageUrl: string;
    drawStyle: string;
    font: string;
    customText: string;
    quantity: number;
    price: number;
};

type CustomerInfo = {
    name: string;
    phone: string;
    email: string;
    address: string;
    paymentMethod: string;
};

export default function CheckoutPage() {
    const [orderData, setOrderData] = useState<OrderData | null>(null);
    const [customer, setCustomer] = useState<CustomerInfo>({
        name: "",
        phone: "",
        email: "",
        address: "",
        paymentMethod: "Thanh toán khi nhận hàng",
    });

    useEffect(() => {
        const stored = localStorage.getItem("orderData");
        if (stored) setOrderData(JSON.parse(stored));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleOrder = async () => {
        if (!orderData) return;

        const response = await fetch("https://script.google.com/macros/s/AKfycbxi21-tZ7tltaf_lfdibnh-0Q4W2_Iu2JcLxKpMYwaZ3hq4FiCqvZnM7KuoDideNy37cg/exec", {
            method: "POST",
            body: JSON.stringify({
                ...customer,
                productName: orderData.productName,
                imageUrl: orderData.imageUrl,
                drawStyle: orderData.drawStyle,
                font: orderData.font,
                customText: orderData.customText,
                quantity: orderData.quantity,
                price: orderData.price,
            }),
        });

        const result = await response.json();
        if (result.success) {
            alert("Đặt hàng thành công! " + result.orderId);
            localStorage.removeItem("orderData");
            window.location.href = "/";
        } else {
            alert("Có lỗi xảy ra khi đặt hàng.");
        }
    };

    if (!orderData) return <div className="p-6 text-center">Không có sản phẩm nào trong đơn hàng.</div>;

    const totalPrice = orderData.price * orderData.quantity;
    const shippingFee = 20000;
    const grandTotal = totalPrice + shippingFee;

    return (
        <div className="bg-gray-100 min-h-screen p-4 mt-[5%]">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                {/* Cột trái */}
                <div className="md:col-span-2 bg-white rounded-2xl shadow p-6 space-y-6">
                    <h1 className="text-2xl font-bold">Xác nhận đơn hàng</h1>

                    {/* Sản phẩm */}
                    <div className="flex gap-4 border rounded-xl p-4 shadow-sm bg-gray-50">
                        <img
                            src={orderData.imageUrl}
                            alt="Product"
                            className="w-24 h-24 object-cover rounded-lg border"
                        />
                        <div className="text-sm space-y-1">
                            <p className="font-medium">{orderData.productName}</p>
                            <p>Kiểu vẽ: {orderData.drawStyle}</p>
                            <p>Font: {orderData.font}</p>
                            <p>Tên in: {orderData.customText}</p>
                            <p>Số lượng: {orderData.quantity}</p>
                            <p className="text-red-600 font-semibold">
                                {orderData.price.toLocaleString()}đ
                            </p>
                        </div>
                    </div>

                    {/* Thông tin khách */}
                    <div className="space-y-4">
                        <h2 className="font-semibold text-lg">Thông tin người nhận</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="name"
                                onChange={handleChange}
                                placeholder="Họ và tên"
                                className="border p-2 rounded-md w-full"
                            />
                            <input
                                name="phone"
                                onChange={handleChange}
                                placeholder="Số điện thoại"
                                className="border p-2 rounded-md w-full"
                            />
                            <input
                                name="email"
                                onChange={handleChange}
                                placeholder="Email"
                                className="border p-2 rounded-md w-full"
                            />
                            <input
                                name="address"
                                onChange={handleChange}
                                placeholder="Địa chỉ giao hàng"
                                className="border p-2 rounded-md w-full"
                            />
                            <select
                                name="paymentMethod"
                                onChange={handleChange}
                                className="border p-2 rounded-md w-full"
                            >
                                <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                                <option value="Chuyển khoản">Chuyển khoản</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Cột phải */}
                <div className="bg-white rounded-2xl shadow p-6 h-fit">
                    <h2 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h2>

                    <div className="space-y-2 text-sm border-b pb-4">
                        <div className="flex justify-between">
                            <span>Tạm tính:</span>
                            <span>{totalPrice.toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Phí vận chuyển:</span>
                            <span>{shippingFee.toLocaleString()}đ</span>
                        </div>
                        <div className="flex justify-between font-semibold text-base">
                            <span>Tổng cộng:</span>
                            <span className="text-red-600">{grandTotal.toLocaleString()}đ</span>
                        </div>
                    </div>

                    <button
                        onClick={handleOrder}
                        className="w-full mt-6 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Đặt hàng ngay
                    </button>
                </div>
            </div>
        </div>
    );
}
