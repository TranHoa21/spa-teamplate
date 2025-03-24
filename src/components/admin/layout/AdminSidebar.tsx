'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Xoá token
        router.push('/'); // Chuyển về trang login
    };

    const navItems = [
        { label: 'Dashboard', href: '/admin' },
        { label: 'Đơn hàng', href: '/admin/orders' },
        { label: 'Sản phẩm', href: '/admin/products' },
        { label: 'Bài viết', href: '/admin/blogs' },
        { label: 'Thông báo', href: '/admin/notifications' },
    ];

    return (
        <aside className="bg-white shadow-md p-4 w-64 hidden md:block min-h-screen">
            <h2 className="text-2xl font-bold text-[#FF6B6B] mb-8">Admin</h2>

            <ul className="space-y-4 text-gray-700">
                {navItems.map((item) => (
                    <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                    </li>
                ))}
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

            {/* Mobile menu icon */}
            <div className="md:hidden block absolute top-4 right-4">
                <button onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden mt-4">
                    <ul className="space-y-3">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}
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
            )}
        </aside>
    );
}
