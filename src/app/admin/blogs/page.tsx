'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Post {
    id: string;
    title: string;
    slug: string;
    createdAt: string;
}

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        // Gọi API để lấy danh sách bài viết
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/posts');
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error('Lỗi khi lấy bài viết:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (slug: string) => {
        const confirm = window.confirm('Bạn có chắc muốn xoá bài viết này?');
        if (!confirm) return;
        try {
            await fetch(`/api/posts/${slug}`, {
                method: 'DELETE',
            });
            setPosts((prev) => prev.filter((post) => post.slug !== slug));
        } catch (error) {
            console.error('Lỗi khi xoá bài viết:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-[#333]">Quản lý bài viết</h1>
                <Link href="/admin/blogs/tao-bai-viet-moi">
                    <Button className="flex items-center gap-2">
                        <Plus size={18} /> Thêm bài viết
                    </Button>
                </Link>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full table-auto">
                    <thead className="bg-[#FFF1E6]">
                        <tr>
                            <th className="text-left px-6 py-3">Tiêu đề</th>
                            <th className="text-left px-6 py-3">Slug</th>
                            <th className="text-left px-6 py-3">Ngày tạo</th>
                            <th className="px-6 py-3 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-[#333]">{post.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{post.slug}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link href={`/admin/blogs/${post.slug}`}>
                                        <Button variant="secondary" size="sm">
                                            <Pencil size={16} />
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(post.slug)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="text-center px-6 py-10 text-gray-500">
                                    Không có bài viết nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
