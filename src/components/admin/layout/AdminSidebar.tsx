'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

interface Notification {
    id: string;
    title: string;
    content: string;
    seen: boolean;
    createdAt: string;
    orderId: number;
}
export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const router = useRouter();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    const fetchUnreadCount = async () => {
        try {
            const res = await fetch('/api/notification');
            const data = await res.json();
            setUnreadCount(data.filter((n: Notification) => !n.seen).length);
        } catch (err) {
            console.error('Lỗi khi lấy số thông báo chưa đọc:', err);
        }
    };

    useEffect(() => {
        fetchUnreadCount();

        const interval = setInterval(fetchUnreadCount, 30000); // refresh mỗi 30s
        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { label: 'Dashboard', href: '/admin' },
        { label: 'Đơn hàng', href: '/admin/orders' },
        { label: 'Sản phẩm', href: '/admin/products' },
        { label: 'Bài viết', href: '/admin/blogs' },
        {
            label: 'Thông báo',
            href: '/admin/notifications',
            badgeCount: unreadCount,
        },
    ];

    const renderNavLink = (item: (typeof navItems)[number]) => (
        <motion.li
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            key={item.href} className="relative">
            <Link href={item.href} onClick={() => setIsOpen(false)}>
                <span className="relative inline-flex items-center gap-2">
                    {item.label}
                    {item.badgeCount && item.badgeCount > 0 && (
                        <span className="ml-1 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                            {item.badgeCount}
                        </span>
                    )}
                </span>
            </Link>
        </motion.li>
    );

    return (
        <>
            {/* Sidebar cho màn hình lớn */}
            <aside className="bg-white shadow-md p-4 w-64 hidden md:block min-h-screen">
                <h2 className="text-2xl font-bold text-[#FF6B6B] mb-8">Admin</h2>
                <ul className="space-y-4 text-gray-700">
                    {navItems.map(renderNavLink)}
                </ul>
                <div className="mt-10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-500 hover:text-red-600 transition text-sm"
                    >
                        <LogOut size={18} />
                        Đăng xuất
                    </button>
                </div>
            </aside>

            {/* Mobile menu toggle */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button onClick={toggleMenu} className="text-gray-700">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } transition-transform duration-300 ease-in-out z-40 md:hidden`}
            >
                <div className="p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#FF6B6B]">Admin</h2>

                </div>
                <ul className="space-y-4 text-gray-700 p-4">
                    {navItems.map(renderNavLink)}
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition text-sm"
                        >
                            <LogOut size={18} />
                            Đăng xuất
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
}
