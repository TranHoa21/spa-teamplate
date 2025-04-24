'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import BannerSectionBlog from "@/components/sections/home/BannerSectionBlog";
import { Star } from 'lucide-react';
import { motion } from "framer-motion";

interface BlogPost {
    title: string;
    slug: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    category?: {
        name: string;
        slug: string;
    };
}
interface Product {
    id: number;
    name: string;
    imageUrl: string;
    price: string;
    originalPrice?: string;
    sale: boolean;
    rating: number;
    slug: string;
}

interface Comment {
    id: number;
    content: string;
    author: string;
    createdAt: string;
}


export default function BlogDetailPage() {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState<{ name: string; id: string } | null>(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // { id, name, role }
        }
        const fetchPost = async () => {
            const res = await fetch(`/api/posts/${slug}`);
            const data = await res.json();
            setPost(data.post);
            const commentsRes = await fetch(`/api/comment?postId=${slug}`);
            const commentsData = await commentsRes.json();
            setComments(commentsData);
            // fetch related posts if needed
            const related = await fetch('/api/posts');
            const relatedData = await related.json();
            setRelatedPosts(relatedData.filter((p: BlogPost) => p.slug !== slug).slice(0, 3));
            const product = await fetch('/api/products');
            const productData = await product.json();
            setProducts(productData);
        };

        if (slug) fetchPost();
    }, [slug]);

    const handleAddComment = async () => {
        if (newComment.trim() === '') return;

        const commentData = {
            content: newComment,
            postSlug: slug,
            author: user?.name || 'Anonymous', // Hoặc có thể dùng tên người dùng từ state
        };

        const res = await fetch(`/api/posts/${slug}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        });

        if (res.ok) {
            const addedComment = await res.json();
            setComments([addedComment, ...comments]);
            setNewComment(''); // Reset input
        }
    };

    const formatPrice = (price: string | number) => {
        return new Intl.NumberFormat('vi-VN').format(Number(price)) + ' đ';
    };
    if (!post) return <div className="text-center py-20">Đang tải bài viết...</div>;

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto py-12 px-4">
            <nav className="text-sm text-gray-500 mb-4">
                <Link href="/" className="hover:underline">Trang chủ</Link> / <Link href="/blog" className="hover:underline">Blog</Link> / <span className="text-[#FF6B6B]">{post.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* LEFT: Bài viết chính */}
                <div className="flex-1">
                    <h1 className="text-4xl font-extrabold text-[#FF6B6B] mb-4 leading-tight">{post.title}</h1>

                    <div className="text-sm text-gray-400 mb-6">
                        <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                    </div>

                    {post.imageUrl && (
                        <div className="w-full mb-8 rounded-xl overflow-hidden shadow-md">
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                width={1200}
                                height={600}
                                className="w-full h-auto max-h-[400px] object-cover transition-transform duration-300 hover:scale-[1.01]"
                            />
                        </div>
                    )}

                    <article
                        className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></article>

                    {/* Bài viết nổi bật và các sản phẩm */}
                    <div className="mt-[5%]">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6 ">Bình luận</h2>
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="bg-[#F9F9F9] p-4 rounded-lg shadow-sm">
                                    <p className="font-medium">{comment.author}</p>
                                    <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString('vi-VN')}</p>
                                    <p className="mt-2">{comment.content}</p>
                                </div>
                            ))}
                        </div>

                        {/* Nếu người dùng đã đăng nhập, hiển thị ô nhập bình luận */}
                        {user && (
                            <div className="mt-6">
                                <textarea
                                    className="w-full p-3 border rounded-lg"
                                    placeholder="Nhập bình luận của bạn..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                />
                                <button
                                    onClick={handleAddComment}
                                    className="mt-2 bg-[#FF6B6B] text-white py-2 px-4 rounded-lg hover:bg-[#FF4B4B]"
                                >
                                    Gửi bình luận
                                </button>
                            </div>
                        )}
                    </div>
                </div>




                {/* RIGHT: Sidebar - Bài viết liên quan */}
                <aside className="w-full lg:w-[35%] lg:pl-8 lg:border-l lg:border-gray-200">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bài viết nổi bật</h2>
                    <div className="space-y-6">
                        {relatedPosts.slice(0, 4).map((rp) => (
                            <Link
                                key={rp.slug}
                                href={`/blog/${rp.slug}`}
                                className="block bg-[#FFF7F0] p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                            >
                                {rp.imageUrl && (
                                    <Image
                                        src={rp.imageUrl}
                                        alt={rp.title}
                                        width={400}
                                        height={250}
                                        className="w-full h-40 object-cover rounded-md mb-3"
                                    />
                                )}
                                <h3 className="text-lg font-semibold text-[#333] hover:text-[#FF6B6B] transition line-clamp-2">
                                    {rp.title}
                                </h3>
                            </Link>
                        ))}
                    </div>

                    <div className="w-full my-[15%]">
                        <BannerSectionBlog />
                    </div>
                    <div className="w-full my-[5%]">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Sản phẩm của chúng tôi </h1>
                        <div className="grid grid-cols-1 gap-6">
                            {products.map((product) => (
                                <Link key={product.id} href={`/san-pham/${product.id}`}>
                                    <div className="group my-[3%] bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer">
                                        <div className="relative w-full h-64 overflow-hidden">
                                            <Image
                                                src={product.imageUrl}
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
                                                <p className="text-[#FF6B6B] font-semibold">{formatPrice(product.price)}</p>
                                                {product.sale && product.originalPrice && (
                                                    <p className="text-[#7D7D7D] line-through text-sm">{formatPrice(product.originalPrice)}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>


            <div className="w-full mt-[6%] border-t border-gray-200">
                <h1 className="text-4xl font-semibold text-gray-900 mb-4 pt-[3%]">Có thể bạn sẽ thích</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedPosts.slice(0, 4).map((rp) => (
                        <Link key={rp.slug} href={`/blog/${rp.slug}`} className="block bg-[#FFF1E6] p-4 rounded-lg shadow hover:shadow-md transition">
                            {rp.imageUrl && (
                                <Image src={rp.imageUrl} alt={rp.title} width={400} height={250} className="w-full h-40 object-cover rounded-md mb-3" />
                            )}
                            <h3 className="text-lg font-semibold text-[#333] hover:text-[#FF6B6B] line-clamp-2">{rp.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </motion.section>
    );

}
