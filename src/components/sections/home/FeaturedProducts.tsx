'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

const products = [
    {
        id: 1,
        name: 'Ốp lưng vẽ chân dung',
        image: '/images/1.webp',
        price: '199.000đ',
        originalPrice: '249.000đ',
        sale: true,
        rating: 5,
        slug: 'op-lung-ve-chan-dung',
    },
    {
        id: 2,
        name: 'Túi tote vẽ chân dung',
        image: '/images/2.webp',
        price: '249.000đ',
        sale: false,
        rating: 4,
        slug: 'tui-tote-ve-chan-dung',
    },
    {
        id: 3,
        name: 'Cốc sứ vẽ chân dung',
        image: '/images/3.webp',
        price: '179.000đ',
        originalPrice: '229.000đ',
        sale: true,
        rating: 5,
        slug: 'coc-su-ve-chan-dung',
    },
];

export default function FeaturedProducts() {
    return (
        <section id="products" className="bg-[#FFF1E6] py-16 px-4">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Sản phẩm của chúng mình</h2>
                <p className="text-[#7D7D7D] mb-10">Tùy chỉnh theo phong cách và hình ảnh riêng của bạn</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <Link key={product.id} href={`/san-pham/${product.slug}`}>
                            <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer">
                                <div className="relative w-full h-64 overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {product.sale && (
                                        <span className="absolute top-2 left-2 bg-[#FF6B6B] text-white text-sm px-3 py-1 rounded-full shadow">
                                            Đang giảm
                                        </span>
                                    )}
                                </div>
                                <div className="p-4 text-left space-y-2">
                                    <h3 className="text-xl font-medium text-[#333333] group-hover:text-[#FF6B6B] transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center gap-1 text-[#FF6B6B]">
                                        {Array.from({ length: product.rating }, (_, i) => (
                                            <Star key={i} size={16} fill="#FF6B6B" stroke="#FF6B6B" />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-[#FF6B6B] font-semibold">{product.price}</p>
                                        {product.sale && product.originalPrice && (
                                            <p className="text-[#7D7D7D] line-through text-sm">{product.originalPrice}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
