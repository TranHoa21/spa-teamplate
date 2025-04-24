'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { motion } from "framer-motion";

interface ProductImage {
    id: string;
    url: string;
    productId: string;
}
export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [discountPrice, setDiscountPrice] = useState('');
    const [rating, setRating] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [images, setImages] = useState<ProductImage[]>([]); // ✅ Sửa kiểu dữ liệu
    const [newImages, setNewImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();

                setName(data.name);
                setDescription(data.description);
                setPrice(data.price.toString());
                setOriginalPrice(data.originalPrice?.toString() || '');
                setDiscountPrice(data.discountPrice?.toString() || '');
                setRating(data.rating?.toString() || '');
                setImageUrl(data.imageUrl);
                setImages(data.images || []);
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('originalPrice', originalPrice);
        formData.append('discountPrice', discountPrice);
        formData.append('rating', rating);

        newImages.forEach((file) => {
            formData.append('image', file);
        });

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                body: formData,
            });

            const result = await res.json();
            if (res.ok) {
                alert('Cập nhật sản phẩm thành công!');
                router.push('/admin/products');
            } else {
                alert(result.error || 'Cập nhật thất bại.');
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi khi cập nhật sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setNewImages(Array.from(files));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl mx-auto py-10 px-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Chỉnh sửa sản phẩm</h1>

            {loading && <p className="text-center text-gray-500">Đang tải...</p>}

            <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                    <Label className="font-semibold">Tên sản phẩm</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div>
                    <Label className="font-semibold">Mô tả</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
                </div>

                <div>
                    <Label className="font-semibold">Giá bán (VNĐ)</Label>
                    <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>

                <div>
                    <Label className="font-semibold">Giá gốc (VNĐ)</Label>
                    <Input type="number" step="0.01" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} />
                </div>

                <div>
                    <Label className="font-semibold">Giá giảm (VNĐ)</Label>
                    <Input type="number" step="0.01" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} />
                </div>

                <div>
                    <Label className="font-semibold">Đánh giá (0 - 5)</Label>
                    <Input type="number" step="0.1" min="0" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
                </div>

                {/* Hiển thị ảnh đại diện */}
                <div>
                    <Label className="font-semibold">Ảnh đại diện</Label>
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt="Ảnh chính"
                            width={200}
                            height={200}
                            className="rounded-md object-cover mt-2 shadow-sm"
                        />
                    )}
                </div>

                {/* Hiển thị ảnh chi tiết */}
                <div>
                    <Label className="font-semibold">Ảnh chi tiết</Label>
                    {images.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {images.map((image, index) => (
                                <Image
                                    key={image.id} // Nên dùng ID thay vì index để tránh lỗi key trùng
                                    src={image.url} // ✅ Truy cập đúng thuộc tính `url`
                                    alt={`Ảnh phụ ${index + 1}`}
                                    width={120}
                                    height={120}
                                    className="rounded-md object-cover shadow-sm"
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">Chưa có ảnh chi tiết</p>
                    )}
                </div>

                {/* Upload ảnh mới */}
                <div>
                    <Label className="font-semibold">Chọn ảnh mới (tuỳ chọn)</Label>
                    <Input type="file" accept="image/*" multiple onChange={handleImageChange} />

                    {/* Hiển thị ảnh mới trước khi upload */}
                    {newImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {newImages.map((file, index) => (
                                <Image
                                    key={index}
                                    src={URL.createObjectURL(file)}
                                    alt={`new-${index}`}
                                    width={120}
                                    height={120}
                                    className="rounded-md object-cover shadow-sm"
                                />
                            ))}
                        </div>
                    )}
                </div>

                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 w-full py-2" disabled={loading}>
                    {loading ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
                </Button>
            </form>
        </motion.div>
    );
}
