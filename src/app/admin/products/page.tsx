'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    createdAt: string;
    slug: string; // ✅ Thêm slug để điều hướng sửa sản phẩm
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const router = useRouter();

    // ✅ Lấy danh sách sản phẩm
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []);

    // ✅ Xóa sản phẩm
    const handleDelete = async (productId: string) => {
        if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;

        try {
            const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });

            const result = await res.json();
            console.log("Phản hồi từ API xóa:", result); // ✅ Debug phản hồi API

            if (res.ok) {
                setProducts(products.filter((product) => product.id !== productId));
                alert('Xóa sản phẩm thành công!');
            } else {
                alert(result.error || 'Xóa sản phẩm thất bại.');
            }
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm:', error);
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-[#333]">Quản lý sản phẩm</h1>
                <Button variant="primary" size="sm" onClick={() => router.push('/admin/products/tao-san-pham-moi')}>
                    + Thêm sản phẩm
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border text-sm text-left">
                    <thead className="bg-[#FFF1E6] text-[#333]">
                        <tr>
                            <th className="p-3">Hình</th>
                            <th className="p-3">Tên</th>
                            <th className="p-3">Giá</th>
                            <th className="p-3">Ngày tạo</th>
                            <th className="p-3 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-t hover:bg-gray-50">
                                <td className="p-3">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        width={60}
                                        height={60}
                                        className="rounded-md object-cover"
                                    />
                                </td>
                                <td className="p-3 font-medium text-[#333]">{product.name}</td>
                                <td className="p-3 text-red-600 font-semibold">{product.price.toLocaleString()} đ</td>
                                <td className="p-3 text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</td>
                                <td className="p-3 text-right space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => router.push(`/admin/products/${product.id}`)}>
                                        <Pencil size={16} className="mr-1" /> Sửa
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                                        <Trash2 size={16} className="mr-1" /> Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.section>
    );
}
