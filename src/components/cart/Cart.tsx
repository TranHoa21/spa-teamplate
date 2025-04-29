import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
    id?: string;
    productId: string;
    quantity: number;
    product?: {
        name: string;
        price: number;
        imageUrl: string;
    };
}

const Cart: React.FC<{ setCartOpen: (open: boolean) => void }> = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCart = async () => {
            const storedUser = localStorage.getItem("user");
            const user = storedUser ? JSON.parse(storedUser) : null;
            if (user?.id) {
                const res = await fetch(`/api/cart?userId=${user.id}`);
                const cart = await res.json();
                setCartItems(cart.items || []);
            }
            setLoading(false);
        };
        loadCart();
    }, []);

    const totalPrice = cartItems.reduce((sum, item) => {
        const price = item.product?.price || 0;
        return sum + price * item.quantity;
    }, 0);

    if (loading) return <p className="text-white">Loading...</p>;
    if (cartItems.length === 0) return <p className="text-gray-400">Your cart is empty</p>;

    return (
        <div className="text-white">
            <div className="space-y-4">
                {cartItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                        <Image
                            src={item.product?.imageUrl || "/default.jpg"}
                            alt={item.product?.name || "Product"}
                            width={50}
                            height={50}
                            className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold">{item.product?.name}</h4>
                            <p className="text-gray-400 text-xs">
                                {item.quantity} × ${item.product?.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-600 my-4 pt-4">
                <div className="flex justify-between mb-4">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex gap-4">
                    <Link href="/cart" className="hex-button w-1/2 text-center">View Cart</Link>
                    <Link href="/checkout" className="hex-button w-1/2 text-center">Checkout</Link>
                </div>
            </div>

            <style jsx>{`
        .hex-button {
          background: #07273c;
          padding: 0.75rem 1rem;
          clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
          font-weight: 600;
          transition: background 0.3s;
        }
        .hex-button:hover {
          background: #0b3d5b;
        }
      `}</style>
        </div>
    );
};

export default Cart;
