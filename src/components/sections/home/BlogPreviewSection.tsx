"use client";

import Link from "next/link";
import Image from "next/image";

const blogPosts = [
    {
        title: "5 món quà sinh nhật handmade ý nghĩa tặng người yêu",
        slug: "qua-sinh-nhat-handmade",
        image: "/images/blog/1.webp",
        excerpt: "Tìm hiểu những món quà handmade vừa đẹp, vừa chứa đựng tình cảm để tạo bất ngờ cho người yêu trong ngày sinh nhật...",
    },
    {
        title: "Cách bảo quản sản phẩm in vẽ để giữ màu bền lâu",
        slug: "bao-quan-san-pham-ve",
        image: "/images/blog/2.webp",
        excerpt: "Hướng dẫn chi tiết cách sử dụng và bảo quản các sản phẩm in/vẽ chân dung như cốc, túi, ốp điện thoại...",
    },
    {
        title: "Khách hàng review chân thực về dịch vụ vẽ của shop",
        slug: "review-dich-vu-ve-chan-dung",
        image: "/images/blog/3.webp",
        excerpt: "Cùng xem cảm nhận thật của khách hàng sau khi nhận được sản phẩm được vẽ riêng theo yêu cầu...",
    },
];

export default function BlogPreviewSection() {
    return (
        <section className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-[#333]">Bài viết nổi bật</h2>
                    <Link
                        href="/blog"
                        className="text-[#FF6B6B] font-medium hover:underline"
                    >
                        Xem thêm →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {blogPosts.map((post, index) => (
                        <Link
                            key={index}
                            href={`/blog/${post.slug}`}
                            className="group bg-[#FFF1E6] rounded-xl overflow-hidden shadow hover:shadow-md transition block"
                        >
                            <Image
                                src={post.image}
                                alt={post.title}
                                width={400}
                                height={250}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-[#333] group-hover:text-[#FF6B6B]">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-[#7D7D7D] mt-1 line-clamp-3">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
