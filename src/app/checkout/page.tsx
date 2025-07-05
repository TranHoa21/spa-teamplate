"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const VNPAY_PAYMENT_URL = "/api/payment";

type OrderData = {
    productId: string;
    imageUrl: string;
    productName: string;
    drawStyle?: string | null;
    font?: string | null;
    customText?: string | null;
    selectedOption?: string | null;
    quantity: number;
    price: number;
    designType: string;
};



type CustomerInfo = {
    name: string;
    phone: string;
    email: string;
    address: string;
    paymentMethod: string;
};

export default function CheckoutPage() {
    const [orderData, setOrderData] = useState<OrderData[]>([]); // ← CHUYỂN THÀNH MẢNG
    const [selectedUserImages, setSelectedUserImages] = useState<File[]>([]);

    const [customer, setCustomer] = useState<CustomerInfo>({
        name: "",
        phone: "",
        email: "",
        address: "",
        paymentMethod: "Thanh toán khi nhận hàng",
    });
    useEffect(() => {
        const stored = localStorage.getItem("orderData");
        if (stored) {
            const parsed = JSON.parse(stored);
            setOrderData(Array.isArray(parsed) ? parsed : [parsed]);
        }
    }, []);

    useEffect(() => {
        const storedImage = localStorage.getItem("selectedUserImage");
        if (storedImage) {
            fetch(storedImage)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "uploaded-image.png", { type: "image/png" });
                    // Gán 1 ảnh cho mỗi sản phẩm (hoặc lặp lại)
                    const files = orderData.map(() => file);
                    setSelectedUserImages(files);
                });
        }
    }, [orderData]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleOrder = async () => {
        if (!orderData.length) return alert("Không có sản phẩm trong giỏ hàng!");

        const formData = new FormData();
        formData.append("name", customer.name);
        formData.append("phone", customer.phone);
        formData.append("email", customer.email);
        formData.append("address", customer.address);
        formData.append("paymentMethod", customer.paymentMethod);

        let total = 0;
        const items: {
            productId: string;
            productName: string;
            quantity: number;
            designType: string;
            drawStyle?: string | null;
            font?: string | null;
            customText?: string | null;
            selectedOption?: string | null;
            imageFieldName: string;
        }[] = [];

        orderData.forEach((item, index) => {
            const imageFieldName = `image_${index}`;
            total += item.price * item.quantity;

            items.push({
                productId: item.productId,
                productName: item.productName,
                quantity: item.quantity,
                designType: item.designType,
                drawStyle: item.drawStyle,
                font: item.font,
                customText: item.customText,
                selectedOption: item.selectedOption,
                imageFieldName,
            });

            const imageFile = selectedUserImages[index];
            if (imageFile) {
                formData.append(imageFieldName, imageFile);
            }
        });

        formData.append("totalPrice", total.toString());
        formData.append("items", JSON.stringify(items));

        try {
            const response = await fetch("/api/booking", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {

                await fetch("/api/email/order-confirmation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: customer.name,
                        email: customer.email,
                        orderId: result.order.id,
                        totalPrice: total,  // biến total tính ở trên
                    }),
                });



                const storedUser = localStorage.getItem("user");
                const user = storedUser ? JSON.parse(storedUser) : null;

                try {
                    // 🔥 Nếu có user → gọi API xóa cart items khỏi DB
                    if (user?.id) {
                        await fetch(`/api/cart?userId=${user.id}`, { method: "DELETE" });
                    }

                    // 🧹 Xóa localStorage dù có đăng nhập hay không
                    localStorage.removeItem("localCart");
                    localStorage.removeItem("cartCount");
                    localStorage.removeItem("orderData");
                    localStorage.removeItem("selectedUserImage");

                    if (customer.paymentMethod !== "Chuyển khoản") {
                        alert("Đặt hàng thành công!");
                    }

                    if (customer.paymentMethod === "Chuyển khoản") {
                        handlePayment(result.order.id);
                    } else {
                        window.location.href = "/";
                    }
                } catch (cleanupErr) {
                    console.error("Lỗi khi xóa giỏ hàng:", cleanupErr);
                }
            } else {
                alert(result.error || "Có lỗi xảy ra khi đặt hàng.");
            }
        } catch (error) {
            console.error(error);
            alert("Lỗi khi gửi dữ liệu.");
        }
    };


    const handlePayment = async (orderId: string) => {
        try {
            const numericOrderId = Number(orderId);
            const response = await fetch(VNPAY_PAYMENT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: orderData.reduce((sum, item) => sum + item.price * item.quantity, 0),
                    orderId: numericOrderId, // ✅ Dùng orderId từ API trả về
                    orderInfo: `Thanh toán đơn hàng ${orderId}`
                })
            });

            const result = await response.json();
            if (result.paymentUrl) {
                window.location.href = result.paymentUrl;
            } else {
                alert("Lỗi khi tạo link thanh toán");
            }
        } catch (error) {
            console.error("Lỗi khi thanh toán:", error);
            alert("Có lỗi xảy ra khi xử lý thanh toán.");
        }
    };


    if (!orderData) return <div className="p-6 text-center">Không có sản phẩm nào trong đơn hàng.</div>;

    const totalPrice = orderData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = 20000;
    const grandTotal = totalPrice + shippingFee;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gray-100 min-h-screen p-4 ">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white rounded-2xl shadow p-6 space-y-6">
                    <h1 className="text-2xl font-bold">Xác nhận đơn hàng</h1>
                    <div className="flex gap-4 border rounded-xl p-4 shadow-sm bg-gray-50">
                        {orderData.map((item, index) => (
                            <div key={index} className="flex gap-4 border rounded-xl p-4 shadow-sm bg-gray-50 mb-4">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.productName}
                                    width={96}
                                    height={96}
                                    className="w-24 h-24 object-cover rounded-lg border"
                                />
                                <div className="text-sm space-y-1">
                                    <p><strong>Kiểu vẽ:</strong> {item.drawStyle || "Không có"}</p>
                                    <p><strong>Font:</strong> {item.font || "Không có"}</p>
                                    <p><strong>Tên in:</strong> {item.customText || "Không có"}</p>
                                    <p><strong>Tuỳ chọn:</strong> {item.selectedOption || "Không có"}</p>
                                    <p><strong>Số lượng:</strong> {item.quantity}</p>
                                    <p className="text-red-600 font-semibold">
                                        {(item.price ?? 0).toLocaleString()}đ
                                    </p>                                </div>
                            </div>
                        ))}

                    </div>
                    <div className="space-y-4">
                        <h2 className="font-semibold text-lg">Thông tin người nhận</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="name" value={customer.name} onChange={handleChange} placeholder="Họ và tên" className="border p-2 rounded-md w-full" />
                            <input name="phone" value={customer.phone} onChange={handleChange} placeholder="Số điện thoại" className="border p-2 rounded-md w-full" />
                            <input name="email" value={customer.email} onChange={handleChange} placeholder="Email" className="border p-2 rounded-md w-full" />
                            <input name="address" value={customer.address} onChange={handleChange} placeholder="Địa chỉ giao hàng" className="border p-2 rounded-md w-full" />
                            <select name="paymentMethod" value={customer.paymentMethod} onChange={handleChange} className="border p-2 rounded-md w-full">
                                <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                                <option value="Chuyển khoản">Chuyển khoản</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow p-6 h-fit">
                    <h2 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h2>
                    <div className="space-y-2 text-sm border-b pb-4">
                        <div className="flex justify-between"><span>Tạm tính:</span><span>{totalPrice.toLocaleString()}đ</span></div>
                        <div className="flex justify-between"><span>Phí vận chuyển:</span><span>{shippingFee.toLocaleString()}đ</span></div>
                        <div className="flex justify-between font-semibold text-base">
                            <span>Tổng cộng:</span>
                            <span className="text-red-600">{grandTotal.toLocaleString()}đ</span>
                        </div>
                    </div>
                    <button
                        onClick={handleOrder} // ❌ Bỏ tham số truyền vào
                        className="w-full mt-6 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        {customer.paymentMethod === "Chuyển khoản" ? "Thanh toán qua VNPay" : "Đặt hàng ngay"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
