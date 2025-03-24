'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();

                setName(data.name);
                setDescription(data.description);
                setPrice(data.price.toString());
                setImageUrl(data.imageUrl);
                setImages(data.images || []);
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm:', error);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);

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
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setNewImages(Array.from(files));
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Chỉnh sửa sản phẩm</h1>
            <form onSubmit={handleUpdate} className="space-y-6">
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
                    <Label>Ảnh đại diện</Label>
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt="Ảnh chính"
                            width={150}
                            height={150}
                            className="rounded object-cover mt-2"
                        />
                    )}
                </div>

                <div>
                    <Label>Ảnh chi tiết</Label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {images.map((url, index) => (
                            <Image
                                key={index}
                                src={url}
                                alt={`Ảnh phụ ${index}`}
                                width={120}
                                height={120}
                                className="rounded-md object-cover"
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <Label>Chọn ảnh mới (tuỳ chọn)</Label>
                    <Input type="file" accept="image/*" multiple onChange={handleImageChange} />
                    {newImages.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {newImages.map((file, index) => (
                                <Image
                                    key={index}
                                    src={URL.createObjectURL(file)}
                                    alt={`new-${index}`}
                                    width={120}
                                    height={120}
                                    className="rounded object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>

                <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
                    Cập nhật sản phẩm
                </Button>
            </form>
        </div>
    );
}
