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
        <>
            {/* Sidebar cho màn hình lớn */}
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
            </aside>

            {/* Mobile menu */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button onClick={toggleMenu} className="text-gray-700">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40 md:hidden`}
            >
                <div className="p-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-[#FF6B6B]">Admin</h2>
                    <button onClick={toggleMenu} className="text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <ul className="space-y-4 text-gray-700 p-4">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} onClick={toggleMenu}>{item.label}</Link>
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
        </>
    );
}
