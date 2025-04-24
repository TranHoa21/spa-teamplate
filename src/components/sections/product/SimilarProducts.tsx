"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useParams } from "next/navigation"; // Lấy ID sản phẩm từ URL
import { motion } from "framer-motion";

interface Product {
    id: number;
    name: string;
    imageUrl: string;
    price: string;
    originalPrice?: string;
    sale: boolean;
    rating: number;
    slug: string;
}

export default function SimilarProducts() {
    const { id } = useParams(); // Lấy id sản phẩm từ đường dẫn
    const productId = Number(id); // Chuyển thành số để so sánh
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/products");
                if (!res.ok) throw new Error("Không thể tải dữ liệu");
                const data: Product[] = await res.json();

                // Lọc bỏ sản phẩm có id trùng với sản phẩm đang xem
                const filteredProducts = data.filter((product) => product.id !== productId);
                setProducts(filteredProducts);
            } catch (err) {
                console.error("Lỗi tải sản phẩm:", err);
                setError("Lỗi khi tải sản phẩm");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [productId]);

    const formatPrice = (price: string | number) => {
        return new Intl.NumberFormat("vi-VN").format(Number(price)) + " đ";
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            id="similar-products"
            className="bg-white py-12 px-4">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Sản phẩm tương tự</h2>
                <p className="text-gray-600 mb-10">Khám phá thêm những sản phẩm mà bạn có thể thích</p>

                {loading && <p className="text-center text-gray-500">Đang tải...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Link key={product.id} href={`/san-pham/${product.id}`}>
                            <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer">
                                <div className="relative w-full h-64 overflow-hidden">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {product.sale && (
                                        <span className="absolute top-2 left-2 bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow">
                                            Đang giảm
                                        </span>
                                    )}
                                </div>
                                <div className="p-4 text-left space-y-2">
                                    <h3 className="text-xl font-medium text-gray-800 group-hover:text-red-500 transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-red-500">
                                        {Array.from({ length: product.rating }, (_, i) => (
                                            <Star key={i} size={16} fill="currentColor" stroke="currentColor" />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-red-500 font-semibold">{formatPrice(product.price)}</p>
                                        {product.sale && product.originalPrice && (
                                            <p className="text-gray-500 line-through text-sm">{formatPrice(product.originalPrice)}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
