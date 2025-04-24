'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, User, ShoppingBag } from 'lucide-react'
import Cart from '@/components/cart/Cart';
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
}
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState('')
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string; image_url: string; href: string; type: 'product' | 'post' }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const handleMenuToggle = () => setMenuOpen(!menuOpen)
  const handleCartToggle = () => setCartOpen(!cartOpen)

  useEffect(() => {
    setActiveMenuItem(window.location.pathname)
  }, [router])
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    const storedUser = localStorage.getItem('user');

    if (storedLogin === 'true') {
      setIsLoggedIn(true);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);
  useEffect(() => {
    if (cartOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [cartOpen]);
  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (user?.id) {
      const res = await fetch(`/api/cart?userId=${user.id}`);
      const cart = await res.json();
      setCartCount(cart.items?.length || 0);
    } else {
      const localCart = localStorage.getItem("localCart");
      const items = localCart ? JSON.parse(localCart) : [];
      setCartCount(items.length);
    }
  };
  const handleUserClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setShowUserMenu((prev) => !prev);
    }
  };
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setShowSuggestions(false);
      setSuggestions([]);
      return;
    }

    setShowSuggestions(true);

    try {
      const [productRes, postRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/posts'),
      ]);

      const productData = await productRes.json();
      const postData = await postRes.json();

      const products: Product[] = productData || [];
      const posts: Post[] = postData || [];

      const lowerKeyword = value.toLowerCase();

      const matchedProducts = products
        .filter((p) => p.name.toLowerCase().includes(lowerKeyword))
        .map((p) => ({
          id: p.id,
          name: p.name,
          image_url: p.imageUrl,
          href: `/san-pham/${p.slug}`,
          type: 'product' as const,
        }));

      const matchedPosts = posts
        .filter((p) => p.title.toLowerCase().includes(lowerKeyword))
        .map((p) => ({
          id: p.id,
          name: p.title,
          image_url: p.imageUrl,
          href: `/blog/${p.slug}`,
          type: 'post' as const,
        }));

      setSuggestions([...matchedProducts, ...matchedPosts]);
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
      setSuggestions([]);
    }
  };


  const handleViewAccount = () => {
    router.push(`/chi-tiet-tai-khoan/${user?.id}`);
    setShowUserMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setShowUserMenu(false);
    router.push('/');
  };
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">


      {/* Navbar chính */}
      <nav className="flex items-center justify-between w-full px-2 sm:px-6 py-4 relative">
        {/* Logo & nút menu */}
        <div className="flex items-center gap-4">
          <button onClick={handleMenuToggle} className="md:hidden text-gray-700">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo desktop */}
          <Link href="/" className="text-2xl font-bold tracking-wide text-[#FF6B6B] hidden md:block">
            Vẽ Chân Dung
          </Link>
        </div>

        {/* Menu chính */}
        <div
          className={`${menuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 md:flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 text-gray-700 bg-white absolute md:static top-16 left-0 w-full md:w-auto shadow-md md:shadow-none p-6 md:p-0`}
        >

          <ul className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {[
              { name: 'Trang chủ', href: '/' },
              { name: 'Sản phẩm', href: '/san-pham' },
              { name: 'Quy trình', href: '/quy-trinh' },
              { name: 'Tại sao chọn', href: '/vi-sao-chon-chung-toi' },
              { name: 'Blog', href: '/blog' },
            ].map((item) => (
              <li
                key={item.name}
                className={`list-none font-semibold ${activeMenuItem === item.href ? 'text-black' : ''}`}
                onClick={() => {
                  setActiveMenuItem(item.href)
                  setMenuOpen(false)
                }}
              >
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>


        </div>

        {/* Icon chức năng */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="block md:hidden relative w-40">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 px-3 py-1 rounded-md text-sm w-full focus:outline-none focus:ring-1 focus:ring-black"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 bg-white border shadow-lg w-full rounded-md z-50 max-h-64 overflow-y-auto mt-1">
                {suggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchTerm('');
                      router.push(item.href);
                    }}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="object-cover rounded"
                    />                    <span>{item.name}</span>
                    <span className="ml-auto text-gray-400 text-xs">{item.type === 'product' ? 'SP' : 'Blog'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <User
              className="w-5 h-5 cursor-pointer hover:text-black"
              onClick={handleUserClick}
            />
            {isLoggedIn && showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50">
                <div className="px-4 py-2 border-b font-semibold">{user?.name || 'User'}</div>
                <button
                  onClick={handleViewAccount}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Xem tài khoản
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
          <div className="relative cursor-pointer">
            <ShoppingBag className="w-5 h-5 hover:text-black" onClick={handleCartToggle} />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </div>
        </div>
      </nav>

      {/* Cart overlay & panel */}
      {cartOpen && (
        <>
          {/* Overlay (mờ nhẹ) */}
          <div
            className={`fixed inset-0 z-40 transition-opacity duration-300 ${cartOpen ? "bg-opacity-20 visible" : "bg-opacity-0 invisible"}`}
            onClick={handleCartToggle}
          />

          {/* Cart panel trượt mượt */}
          <div
            className={`fixed right-0 top-0 z-50 h-full w-full max-w-[400px] bg-white shadow-lg transform transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"
              } flex flex-col`}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">🛒 Giỏ hàng</h2>
              <button
                onClick={handleCartToggle}
                className="text-gray-500 hover:text-red-500 transition"
                aria-label="Đóng giỏ hàng"
              >
                <X size={20} />
              </button>
            </div>
            <Cart setCartOpen={setCartOpen} />
          </div>

        </>
      )}
    </header>
  )
}

export default Header
