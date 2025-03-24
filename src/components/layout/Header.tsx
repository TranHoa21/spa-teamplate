'use client';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Sản phẩm', href: '/san-pham' },
    { name: 'Quy trình', href: '/quy-trinh' },
    { name: 'Tại sao chọn', href: '/vi-sao-chon-chung-toi' },
    { name: 'Blog', href: '/blog' },

  ];

  return (
    <header className="bg-[#ffff] text-[#2A2A2A] shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide text-[#FF6B6B]">
          Vẽ Chân Dung
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-[#D97706] transition">
              {item.name}
            </Link>
          ))}
          <Link
            href="#order"
            className="bg-[#FF6B6B] text-white px-4 py-2 rounded-full hover:bg-[#D35400] transition"
          >
            Đặt hàng
          </Link>
        </nav>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="text-[#8B5E3C]" size={28} /> : <Menu className="text-[#8B5E3C]" size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu content */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-[#FCE4EC] text-[#2A2A2A]">
          <nav className="flex flex-col items-start gap-3 text-base">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="w-full py-2 border-b border-[#8B5E3C]/30 hover:text-[#D97706] transition"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#order"
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full text-center bg-[#D84315] text-white py-2 rounded-full hover:bg-[#B71C1C] transition"
            >
              Đặt hàng
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
