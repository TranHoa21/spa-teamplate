'use client';

import Link from 'next/link';

const blogs = [
    {
        slug: 'qua-tang-ve-tay-dip-sinh-nhat',
        title: '5 món quà vẽ tay ý nghĩa cho dịp sinh nhật',
        description: 'Cùng khám phá những món quà vẽ tay độc đáo, cá nhân hoá dành tặng người thân vào dịp sinh nhật.',
        thumbnail: '/images/blog1.webp',
        date: '20/03/2025',
    },
    {
        slug: 'y-tuong-qua-tang-cho-nguoi-yeu',
        title: 'Gợi ý quà tặng vẽ tay cho người yêu',
        description: 'Tìm kiếm món quà vừa lãng mạn vừa độc đáo? Những ý tưởng quà tặng vẽ tay này là lựa chọn tuyệt vời.',
        thumbnail: '/images/blog2.webp',
        date: '18/03/2025',
    },
];

export default function BlogPage() {
    return (
        <section className="max-w-6xl mx-auto px-4 py-12 mt-[5%]">
            <h1 className="text-3xl font-bold text-center mb-8">📝 Bài viết mới</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
                    >
                        <img
                            src={post.thumbnail}
                            alt={post.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h2 className="text-xl font-semibold text-[#333]">{post.title}</h2>
                            <p className="text-sm text-[#7D7D7D]">{post.description}</p>
                            <p className="text-xs text-gray-400">📅 {post.date}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
