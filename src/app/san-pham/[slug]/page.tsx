'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ProductExtras from '@/components/sections/product/ProductExtras';

const products = [
    {
        slug: 'op-lung-ve-chan-dung',
        name: 'Ốp lưng vẽ chân dung',
        image: '/images/1.WebP',
        price: 199000,
        originalPrice: 249000,
        extras: {
            type: 'testimonial',
            title: 'Khách hàng nói gì',
            items: [
                {
                    image: '/reviews/oplung1.jpg',
                    name: 'Trang Nguyễn',
                    message: 'Ốp lưng siêu dễ thương, tặng bạn mà bạn thích mê!',
                    rating: 5,
                },
                {
                    image: '/reviews/oplung2.jpg',
                    name: 'Phúc Trần',
                    message: 'Hình vẽ chân dung rất giống, chất lượng tốt.',
                    rating: 5,
                },
            ],
        },
    },
    {
        slug: 'tui-tote-ve-chan-dung',
        name: 'Túi tote vẽ chân dung',
        image: '/images/2.WebP',
        price: 249000,
        extras: {
            type: 'testimonial',
            title: 'Khách hàng nói gì',
            items: [
                {
                    image: '/reviews/coc1.jpg',
                    name: 'Mai Anh',
                    message: 'Cốc vẽ rất xinh, tặng sinh nhật cực ý nghĩa.',
                    rating: 5,
                },
                {
                    image: '/reviews/coc2.jpg',
                    name: 'Tuấn Kiệt',
                    message: 'Giao nhanh, đóng gói cẩn thận, rất hài lòng.',
                    rating: 5,
                },
            ],
        },
    },
    {
        slug: 'coc-su-ve-chan-dung',
        name: 'Cốc sứ vẽ chân dung',
        image: '/images/3.WebP',
        price: 179000,
        originalPrice: 229000,
        extras: {
            type: 'testimonial',
            title: 'Khách hàng nói gì',
            items: [
                {
                    image: '/reviews/coc1.jpg',
                    name: 'Mai Anh',
                    message: 'Cốc vẽ rất xinh, tặng sinh nhật cực ý nghĩa.',
                    rating: 5,
                },
                {
                    image: '/reviews/coc2.jpg',
                    name: 'Tuấn Kiệt',
                    message: 'Giao nhanh, đóng gói cẩn thận, rất hài lòng.',
                    rating: 5,
                },
            ],
        },
    },
];

export default function ProductDetailPage() {
    const { slug } = useParams();
    const router = useRouter();
    const product = products.find((p) => p.slug === slug);

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [drawStyle, setDrawStyle] = useState('Màu');
    const [font, setFont] = useState('');
    const [printName, setPrintName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [designType, setDesignType] = useState<'self' | 'request'>('request');

    const handleQuantityChange = (value: number) => {
        setQuantity(Math.max(1, value));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleOrderNow = () => {
        const orderData = {
            productId: product?.slug || '', // 👈 slug giả định là ID, nếu có ID thật thì sửa lại
            productName: product?.name || '',
            imageUrl: imagePreview ?? '',
            drawStyle: designType === 'request' ? drawStyle : '',
            font: designType === 'request' ? font : '',
            customText: designType === 'request' ? printName : '',
            quantity,
            price: product?.price || 0,
            designType,
        };
        localStorage.setItem('orderData', JSON.stringify(orderData));
        router.push('/checkout');
    };

    if (!product) {
        return <div className="text-center py-20 text-gray-500">Sản phẩm không tồn tại.</div>;
    }

    return (
        <>
            <section className="max-w-6xl mx-auto mt-[5%] px-4 py-12 grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Image src={product.image} alt={product.name} width={600} height={600} className="rounded-xl w-full object-cover" />
                </div>

                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-[#333]">{product.name}</h2>
                    <div className="text-lg text-[#FF6B6B] font-semibold">
                        {product.price.toLocaleString()}đ{' '}
                        {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                                {product.originalPrice.toLocaleString()}đ
                            </span>
                        )}
                    </div>

                    {/* Lựa chọn loại thiết kế */}
                    <div className="space-y-2">
                        <Label>Bạn muốn:</Label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="designType"
                                    value="self"
                                    checked={designType === 'self'}
                                    onChange={() => setDesignType('self')}
                                />
                                Tự thiết kế (chúng tôi in theo ảnh bạn gửi)
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="designType"
                                    value="request"
                                    checked={designType === 'request'}
                                    onChange={() => setDesignType('request')}
                                />
                                Nhờ chúng tôi thiết kế (vẽ tay theo ảnh)
                            </label>
                        </div>
                    </div>

                    {/* Upload ảnh */}
                    <div className="space-y-1">
                        <Label>Gửi ảnh chân dung *</Label>
                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                        {imagePreview && (
                            <Image src={imagePreview} alt="Preview" width={200} height={200} className="rounded-lg mt-2 border" />
                        )}
                    </div>

                    {/* Nếu chọn nhờ thiết kế thì hiện thêm các tùy chọn */}
                    {designType === 'request' && (
                        <>
                            <div className="space-y-2">
                                <Label>Chọn font chữ (nếu muốn in tên)</Label>
                                <select
                                    className="w-full border rounded px-3 py-2"
                                    value={font}
                                    onChange={(e) => setFont(e.target.value)}
                                >
                                    <option value="">Không in tên</option>
                                    <option value="Font viết tay">Font viết tay</option>
                                    <option value="Font dễ thương">Font dễ thương</option>
                                    <option value="Font hiện đại">Font hiện đại</option>
                                </select>

                                <Label className="mt-4 block">Chọn kiểu vẽ</Label>
                                <div className="flex gap-3">
                                    {['Màu', 'Trắng đen', 'Chibi'].map((style) => (
                                        <label key={style} className="flex items-center gap-1">
                                            <input
                                                type="radio"
                                                name="style"
                                                value={style}
                                                checked={drawStyle === style}
                                                onChange={() => setDrawStyle(style)}
                                            />
                                            {style}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label>Lời nhắn / tên in (nếu có)</Label>
                                <Input
                                    type="text"
                                    placeholder="VD: Tặng mẹ yêu"
                                    value={printName}
                                    onChange={(e) => setPrintName(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex items-center gap-3">
                        <Label>Số lượng</Label>
                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                            className="w-20 border px-2 py-1 rounded"
                        />
                    </div>

                    <Button className="bg-[#FF6B6B] text-white hover:bg-[#e95b5b] rounded-full px-6 py-2" onClick={handleOrderNow}>
                        Đặt hàng ngay
                    </Button>

                    <p className="text-sm text-gray-500">
                        🚚 Giao hàng toàn quốc – ⏳ Thời gian hoàn thành: 3–5 ngày – 🔄 Đổi trả nếu sản phẩm lỗi
                    </p>
                </div>
            </section>

            {product.extras && (
                <ProductExtras
                    title={product.extras.title}
                    items={product.extras.items}
                    type={product.extras.type as 'testimonial' | 'gallery'}
                />
            )}
        </>
    );
}