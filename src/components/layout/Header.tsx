'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, User, ShoppingBag, Mail, Phone, Search } from 'lucide-react'
import Cart from '@/components/cart/Cart'
import Image from 'next/image'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<{ id: string; name: string } | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()
  const [activeMenuItem, setActiveMenuItem] = useState('')

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn')
    const storedUser = localStorage.getItem('user')
    if (storedLogin === 'true') {
      setIsLoggedIn(true)
      if (storedUser) setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    fetchCartCount()
  }, [])

  const fetchCartCount = async () => {
    const storedUser = localStorage.getItem('user')
    const u = storedUser ? JSON.parse(storedUser) : null
    if (u?.id) {
      const res = await fetch(`/api/cart?userId=${u.id}`)
      const cart = await res.json()
      setCartCount(cart.items?.length || 0)
    } else {
      const localCart = localStorage.getItem('localCart')
      const items = localCart ? JSON.parse(localCart) : []
      setCartCount(items.length)
    }
  }

  const handleUserClick = () => {
    if (!isLoggedIn) router.push('/login')
    else setShowUserMenu(prev => !prev)
  }

  const handleViewAccount = () => {
    router.push(`/chi-tiet-tai-khoan/${user?.id}`)
    setShowUserMenu(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUser(null)
    setShowUserMenu(false)
    router.push('/')
  }

  const handleMenuToggle = () => setMenuOpen(prev => !prev)

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'Appointment', href: '/appointment' },
    { name: 'Shop', href: '/shop' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="w-full bg-[#07273c] text-white sticky top-0 z-50">
      <div className="flex flex-col md:flex-row w-full">
        {/* Logo */}
        <div className="w-full md:w-[250px] flex items-center justify-between md:justify-center py-4 px-4 md:px-0 border-b md:border-b-0 md:border-r border-white/30">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={140}
              height={200}
              className="w-auto h-14 object-contain"
            />
          </Link>
          <button onClick={handleMenuToggle} className="md:hidden text-white">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1">
          {/* Topbar */}
          <div className="hidden md:flex justify-evenly items-center text-sm h-[50%] relative border-b border-white/30">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 p-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#17384e]">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <span>
                  <span className="text-white font-medium">Talk to our Astrogrers - </span>
                  <span className="text-[#ef6a03] font-semibold">+1800 326 3264</span>
                </span>
              </div>
              <div className="flex items-center gap-2 p-2">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#17384e]">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span>
                  <span className="text-white font-medium">Talk to our Astrogrers - </span>
                  <span className="text-[#ef6a03] font-semibold">support@website.com</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 cursor-pointer p-2" onClick={handleUserClick}>
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#17384e]">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span>{isLoggedIn ? user?.name : 'Log in / Register'}</span>
                {isLoggedIn && showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-50 text-black">
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
              <div className="relative">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#17384e] shadow-md hover:bg-[#1f4e6a] transition-colors duration-200 cursor-pointer"
                  onClick={() => setCartOpen(!cartOpen)}
                >
                  <ShoppingBag className="w-4 h-4 text-white" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center shadow">
                      {cartCount}
                    </span>
                  )}
                  <span className="text-white text-sm font-semibold">$512</span>
                </div>

                {cartOpen && (
                  <div className="absolute right-0 mt-4 w-80 bg-[#10334a] rounded-2xl shadow-lg z-50 p-6">
                    <Cart setCartOpen={setCartOpen} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navbar */}
          <div className="hidden md:flex justify-end items-center h-[50%] px-4">
            <ul className="flex space-x-8 font-medium items-center text-[15px] h-full">
              {menuItems.map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-orange-500 relative group">
                    <span className="group-hover:text-orange-500">{item.name}</span>
                    <div className="absolute -top-[2px] left-0 w-full h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-20"></div>
                  </Link>
                </li>
              ))}
            </ul>
            <Search className="hidden md:block w-5 h-5 cursor-pointer text-[#ef6a03] ml-6" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-4 pt-4">
            {menuItems.map(item => (
              <li
                key={item.name}
                className={`cursor-pointer hover:text-orange-500 ${activeMenuItem === item.href ? 'text-orange-500' : 'text-white'
                  }`}
                onClick={() => {
                  setActiveMenuItem(item.href)
                  setMenuOpen(false)
                }}
              >
                <Link href={item.href}>{item.name}</Link>
              </li>
            ))}
            <li className="pt-4 border-t border-gray-600">
              <div className="flex items-center gap-2" onClick={handleUserClick}>
                <User className="w-5 h-5" />
                <span>{isLoggedIn ? user?.name : 'Log in / Register'}</span>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2" onClick={() => setCartOpen(!cartOpen)}>
                <ShoppingBag className="w-5 h-5" />
                <span>Giỏ hàng ({cartCount})</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Header
