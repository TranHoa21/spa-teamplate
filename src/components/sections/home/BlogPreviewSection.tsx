"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    imageUrl: string;
    metaDescription: string;
}

export default function BlogPreviewSection() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/posts");
                const data = await res.json();
                console.log("check data", data)
                // Nếu API trả về object chứa mảng post
                const posts: BlogPost[] = Array.isArray(data)
                    ? data
                    : Array.isArray(data.posts)
                        ? data.posts
                        : [];



                setBlogPosts(posts.slice(0, 3));
            } catch (err) {
                console.error("Lỗi khi fetch bài viết:", err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white py-16 px-4">
            <div

                className="max-w-6xl mx-auto">
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
                    {blogPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group bg-[#FFF1E6] rounded-xl overflow-hidden shadow hover:shadow-md transition block"
                        >
                            <Image
                                src={post.imageUrl}
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
                                    {post.metaDescription}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
