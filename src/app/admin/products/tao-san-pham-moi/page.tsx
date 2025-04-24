'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { motion } from "framer-motion";

export default function AdminAddProductPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [sale, setSale] = useState(false);
    const [rating, setRating] = useState('');
    const [slug, setSlug] = useState('');

    const [imageUrl, setImageUrl] = useState<File | null>(null);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    const [images, setImages] = useState<FileList | null>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const router = useRouter();

    // ✅ Xử lý chọn ảnh đại diện (imageUrl)
    const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageUrl(file);
            setPreviewImageUrl(URL.createObjectURL(file));
        }
    };

    // ✅ Xử lý chọn nhiều ảnh phụ (images)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setImages(files);
            const previews = Array.from(files).map((file) => URL.createObjectURL(file));
            setPreviewImages(previews);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('originalPrice', originalPrice);
        formData.append('sale', String(sale));
        formData.append('rating', rating);
        formData.append('slug', slug);

        if (imageUrl) {
            formData.append('imageUrl', imageUrl);
        }

        if (images) {
            Array.from(images).forEach((file) => {
                formData.append('images', file);
            });
        }

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                alert('Thêm sản phẩm thành công!');
                router.push('/admin/products');
            } else {
                alert(result.error || 'Thêm sản phẩm thất bại.');
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi khi gửi dữ liệu');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <Label>Tên sản phẩm</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />

                <Label>Mô tả</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />

                <Label>Giá</Label>
                <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />

                <Label>Giá gốc</Label>
                <Input type="number" step="0.01" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} required />

                <Label>Giảm giá</Label>
                <input type="checkbox" checked={sale} onChange={(e) => setSale(e.target.checked)} />

                <Label>Đánh giá</Label>
                <Input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />

                <Label>Slug</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />

                {/* ✅ Chọn ảnh đại diện */}
                <Label>Ảnh đại diện</Label>
                <Input type="file" accept="image/*" onChange={handleMainImageChange} required />
                {previewImageUrl && (
                    <Image src={previewImageUrl} alt="Ảnh đại diện" width={100} height={100} className="rounded-md object-cover" />
                )}

                {/* ✅ Chọn nhiều ảnh phụ */}
                <Label>Ảnh sản phẩm (có thể chọn nhiều)</Label>
                <Input type="file" accept="image/*" multiple onChange={handleImageChange} required />
                <div className="flex gap-3">
                    {previewImages.map((src, index) => (
                        <Image key={index} src={src} alt={`Ảnh ${index}`} width={100} height={100} className="rounded-md object-cover" />
                    ))}
                </div>

                <Button type="submit">Thêm sản phẩm</Button>
            </form>
        </motion.div>
    );
}
