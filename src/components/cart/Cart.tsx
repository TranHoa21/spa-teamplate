"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CartItem {
    id?: string;
    productId: string;
    quantity: number;
    product?: {
        name: string;
        price: number;
        imageUrl: string;
    };
    productName?: string;
    price?: number;
    imageUrl?: string;

    // ✅ BỔ SUNG CÁC TRƯỜNG NÀY CHO KHỚP VỚI orderData
    designType?: string;
    drawStyle?: string;
    font?: string;
    customText?: string;
    selectedOption?: string;
}

const Cart: React.FC<{ setCartOpen: (open: boolean) => void }> = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            const storedUser = localStorage.getItem("user");
            const user = storedUser ? JSON.parse(storedUser) : null;

            if (user?.id) {
                await syncLocalCartToDB(user.id); // 🔄 Đồng bộ nếu có dữ liệu local
                const res = await fetch(`/api/cart?userId=${user.id}`);
                const cart = await res.json();
                setCartItems(cart.items || []);
                updateCartCount(cart.items || []);
            } else {
                const localCart = localStorage.getItem("localCart");
                if (localCart) {
                    const parsed = JSON.parse(localCart);
                    setCartItems(parsed);
                    updateCartCount(parsed);
                }
            }

            setLoading(false);
        };

        loadCart();
    }, []);

    const syncLocalCartToDB = async (userId: string) => {
        const localCart = JSON.parse(localStorage.getItem("localCart") || "[]");
        if (localCart.length === 0) return;

        try {
            const res = await fetch(`/api/cart?userId=${userId}`);
            const cart = await res.json();
            const cartId = cart.id;

            for (const item of localCart) {
                await fetch("/api/cartItem", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...item, cartId }),
                });
            }

            localStorage.removeItem("localCart");
        } catch (error) {
            console.error("Lỗi đồng bộ localCart:", error);
        }
    };

    const updateCartCount = (items: CartItem[]) => {
        const total = items.reduce((sum, item) => sum + item.quantity, 0);
        localStorage.setItem("cartCount", JSON.stringify(total));
    };

    const updateQuantity = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        let updated: CartItem[] = [];

        if (user?.id) {
            await fetch(`/api/cartItem/${itemId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quantity: newQuantity }), // hoặc các field khác nếu cần
            });

            updated = cartItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            );
        } else {
            updated = cartItems.map((item, idx) =>
                idx.toString() === itemId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
            localStorage.setItem("localCart", JSON.stringify(updated));
        }

        setCartItems(updated);
        updateCartCount(updated);
    };

    const handleRemoveItem = async (itemId: string) => {
        const storedUser = localStorage.getItem("user");
        const user = storedUser ? JSON.parse(storedUser) : null;

        let updated: CartItem[] = [];

        if (user?.id) {
            await fetch(`/api/cartItem/${itemId}`, { method: "DELETE" });
            updated = cartItems.filter((item) => item.id !== itemId);
        } else {
            updated = cartItems.filter((_, idx) => idx.toString() !== itemId);
            localStorage.setItem("localCart", JSON.stringify(updated));
        }

        setCartItems(updated);
        updateCartCount(updated);
        localStorage.removeItem("orderData");
    };

    const totalPrice = cartItems.reduce((sum, item) => {
        const price = item.product?.price || item.price || 0;
        return sum + price * item.quantity;
    }, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-4">
            {loading ? (
                <p>Đang tải...</p>
            ) : cartItems.length === 0 ? (
                <p className="text-gray-500">Giỏ hàng trống</p>
            ) : (
                cartItems.map((item, idx) => (
                    <div key={item.id || idx} className="flex items-center justify-between mb-4 border-b pb-2">
                        <Image
                            src={item.product?.imageUrl || item.imageUrl || "/default-image.jpg"}
                            alt={item.product?.name || item.productName || "Sản phẩm"}
                            width={64}
                            height={64}
                            className="object-cover"
                        />
                        <div className="flex-1 ml-4">
                            <h3 className="font-medium">{item.product?.name || item.productName}</h3>
                            <p className="font-semibold">{(item.product?.price || item.price || 0).toLocaleString()}₫</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id || idx.toString(), item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </Button>
                                <span>{item.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateQuantity(item.id || idx.toString(), item.quantity + 1)}
                                >
                                    +
                                </Button>
                            </div>
                        </div>
                        <X
                            className="cursor-pointer text-red-500"
                            onClick={() => handleRemoveItem(item.id || idx.toString())}
                        />
                    </div>
                ))
            )}

            {!loading && cartItems.length > 0 && (
                <div className="mt-4 text-right">
                    <p className="font-bold">Tổng: {totalPrice.toLocaleString()}₫</p>
                    <Button
                        className="mt-2 w-full"
                        onClick={() => {
                            // ✅ Chuyển cartItems sang OrderData chuẩn
                            const orderData = cartItems.map((item) => ({
                                productId: item.productId,
                                productName: item.product?.name || item.productName || '',
                                imageUrl: item.product?.imageUrl || item.imageUrl || '',
                                quantity: item.quantity,
                                price: item.product?.price || item.price || 0,
                                designType: item["designType"] || '',
                                drawStyle: item["drawStyle"] || '',
                                font: item["font"] || '',
                                customText: item["customText"] || '',
                                selectedOption: item["selectedOption"] || '',
                            }));

                            localStorage.setItem('orderData', JSON.stringify(orderData));
                            window.location.href = '/checkout';
                        }}
                    >
                        Tiến hành đặt hàng
                    </Button>
                </div>
            )}
        </motion.div>
    );
};

export default Cart;
