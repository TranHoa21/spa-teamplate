'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export default function AdminAddProductPage() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [images, setImages] = useState<FileList | null>(null);
    const [previewImages, setPreviewImages] = useState<string[]>([]); // ✅ Xem ảnh trước khi upload
    const router = useRouter();

    // ✅ Xử lý xem trước ảnh
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

        if (images) {
            Array.from(images).forEach((file) => {
                formData.append('image', file);
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
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label>Tên sản phẩm</Label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div>
                    <Label>Mô tả</Label>
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
                </div>

                <div>
                    <Label>Giá</Label>
                    <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>

                <div>
                    <Label>Chọn ảnh sản phẩm (có thể chọn nhiều)</Label>
                    <Input type="file" accept="image/*" multiple onChange={handleImageChange} required />
                </div>

                {/* ✅ Hiển thị ảnh trước khi upload */}
                <div className="flex gap-3">
                    {previewImages.map((src, index) => (
                        <Image key={index} src={src} alt={`Ảnh ${index}`} width={100} height={100} className="rounded-md object-cover" />
                    ))}
                </div>

                <Button type="submit" className="bg-[#FF6B6B] text-white hover:bg-[#e95b5b]">
                    Thêm sản phẩm
                </Button>
            </form>
        </div>
    );
}
