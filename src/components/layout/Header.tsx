'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [cartCount] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      {/* Navbar - Top bar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-transparent border-b border-gray-300">
        {/* Left: Logo */}
        <div className="text-2xl font-light tracking-wider text-green-900">VELVETY</div>

        {/* Middle: Shop + Cart (mobile only) */}
        <div className="flex items-center space-x-6 text-green-900 text-sm md:hidden">
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart ({cartCount})</Link>
        </div>

        {/* Middle: Desktop Nav */}
        <div className="hidden md:flex space-x-8 text-green-900 text-lg">
          <Link href="/">Home</Link>
          <Link href="/product">Product</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Right: Search + Cart + Login (desktop only) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-1.5 rounded-full border border-gray-400 text-sm placeholder-gray-500 focus:outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-600 text-sm" />
          </div>

          {/* Cart and Login */}
          <Link href="/cart" className="text-green-900 text-lg">
            Cart ({cartCount})
          </Link>
          <Link href="/login" className="text-green-900 text-lg">
            Login
          </Link>
        </div>

        {/* Right: Hamburger (mobile only) */}
        <div className="md:hidden">
          <button
            className="bg-white text-black p-2 rounded-full"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#f4f7f3] text-[#37453b] z-50 p-6 flex flex-col w-[100vw] max-w-full overflow-x-hidden">
          {/* Top Row */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="text-2xl font-light tracking-wider">VELVETY</div>
              <p className="text-xs italic">Facial & skincare</p>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#708470] bg-[#dde7d7] p-2 rounded-full"
            >
              <FaTimes />
            </button>
          </div>

          {/* Search box inside mobile menu */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-full border border-gray-400 text-sm placeholder-gray-500 focus:outline-none"
              autoComplete="off"
              spellCheck={false}
            />
            <FaSearch className="absolute right-4 top-3 text-gray-600 text-sm" />
          </div>

          {/* Mobile Nav Items */}
          <ul className="flex flex-col gap-6 text-xl font-light">
            <li>
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
