// components/Blog.js
"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from "framer-motion";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    metaDescription: string;
    category: Category;
    createdAt: string;

}

interface Category {
    name: string;
    slug: string;
}
const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts');
            const data = await res.json();
            setPosts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };
    const filteredPosts = posts?.filter(post =>
        selectedCategory === 'Tất cả' || post.category?.name === selectedCategory
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="container mx-auto py-12">
            {/* Hero Section */}
            <section className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900">Blog / Câu chuyện thương hiệu / Góc sáng tạo</h1>
                <p className="text-lg text-gray-600 mt-4">Khám phá những bài viết sáng tạo và câu chuyện thú vị về thương hiệu của chúng tôi.</p>
            </section>

            {/* Filter / Category Tabs */}
            <div className="mb-8">
                <div className="flex justify-center gap-6">
                    {['Tất cả', ...categories].map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategoryChange(category)}
                            className={`text-lg font-semibold ${selectedCategory === category ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-400`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Grid/List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                    <p>Đang tải...</p>
                ) : (
                    filteredPosts?.map((post) => (
                        <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="relative w-full h-48">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                                <p className="text-gray-600 mt-2">{post.metaDescription}</p>
                                <p className="text-gray-500 text-sm mt-4">{new Date(post.createdAt).toLocaleDateString()}</p>
                                <a href={`/blog/${post.slug}`} className="inline-block mt-4 text-blue-600 hover:underline">Đọc thêm</a>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination / Load More */}
            <div className="text-center mt-8">
                <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700">
                    Xem thêm
                </button>
            </div>

            {/* Sidebar */}
            <div className="md:flex md:space-x-8 mt-12">

                {/* Bài viết nổi bật */}
                <div className="md:w-1/4">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Bài viết nổi bật</h3>
                        <ul>
                            {posts?.slice(0, 5).map((post) => (
                                <li key={post.id} className="mb-4">
                                    <a href={`/post/${post.id}`} className="text-blue-600 hover:underline">
                                        {post.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Đăng ký nhận bài mới */}
                    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Đăng ký nhận bài mới</h3>
                        <form className="flex flex-col">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                className="px-4 py-2 mb-4 border border-gray-300 rounded-lg"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                Đăng ký
                            </button>
                        </form>
                    </div>
                </div>
                <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Chủ đề được quan tâm */}
                    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Chủ đề được quan tâm</h3>
                        <div className="flex flex-wrap gap-2">
                            {['Quà tặng', 'Handmade', 'Thiết kế', 'Chăm sóc sản phẩm'].map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-white border text-sm rounded-full text-gray-700 hover:bg-blue-100 cursor-pointer"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Câu nói truyền cảm hứng */}
                    <div className="mt-8 bg-blue-50 p-6 rounded-lg shadow-md text-center">
                        <p className="italic text-gray-700">
                            “Sự sáng tạo là trí thông minh đang vui chơi.” – Albert Einstein
                        </p>
                    </div>

                    {/* Banner theo dõi fanpage */}
                    <div className="mt-8 bg-pink-100 p-6 rounded-lg shadow-md text-center">
                        <p className="text-lg font-semibold text-pink-800 mb-2">
                            Bạn đã theo dõi chúng tôi chưa?
                        </p>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            className="text-pink-600 underline hover:text-pink-800"
                        >
                            Theo dõi fanpage ngay →
                        </a>
                    </div>

                    {/* Được xem nhiều nhất */}
                    <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Được xem nhiều nhất</h3>
                        <ul className="list-disc ml-4 text-gray-700 space-y-2">
                            <li>
                                <a href="#" className="hover:underline">
                                    Tại sao quà handmade lại “đắt giá”?
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Gợi ý món quà theo cung hoàng đạo
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    5 kiểu bao bì hút mắt người nhận
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


        </motion.div>
    );
};

export default Blog;
