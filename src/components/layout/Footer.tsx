'use client';

import { Instagram, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#f4f7f3] text-[#37453b] px-6 py-12 text-sm">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-[#dce5db] pb-10">
                {/* Logo + Info */}
                <div className="flex flex-col items-start gap-4">
                    <h2 className="text-2xl font-light tracking-wide">VELVETY</h2>
                    <p className="italic text-sm">Facial & skincare</p>
                    <div>
                        <p className="mt-4">Opening hours</p>
                        <p>Monday to Saturday:<br />10:30 a.m. to 7 p.m.</p>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <Instagram className="w-5 h-5 cursor-pointer" />
                        <Twitter className="w-5 h-5 cursor-pointer" />
                        <Facebook className="w-5 h-5 cursor-pointer" />
                    </div>
                </div>

                {/* Shop */}
                <div>
                    <h3 className="font-medium mb-3">Shop</h3>
                    <ul className="space-y-2">
                        <li><Link href="#">Skincare</Link></li>
                        <li><Link href="#">Facial</Link></li>
                        <li><Link href="#">Soap</Link></li>
                        <li><Link href="#">Candles</Link></li>
                        <li><Link href="#">Auto Fragrances</Link></li>
                        <li><Link href="#">Gifts</Link></li>
                    </ul>
                </div>

                {/* Help Desk */}
                <div>
                    <h3 className="font-medium mb-3">Help Desk</h3>
                    <ul className="space-y-2">
                        <li><Link href="#">Chat</Link></li>
                        <li><Link href="#">FAQ</Link></li>
                        <li><Link href="#">Shipping & Returns</Link></li>
                        <li><Link href="#">Contact</Link></li>
                        <li><Link href="#">Policies</Link></li>
                        <li><Link href="#">Accessibility</Link></li>
                        <li><Link href="#">My Account</Link></li>
                    </ul>
                </div>

                {/* Stores */}
                <div>
                    <h3 className="font-medium mb-3">Stores</h3>
                    <ul className="space-y-2">
                        <li><Link href="#">Manhattan</Link></li>
                        <li><Link href="#">Brooklyn</Link></li>
                        <li><Link href="#">Tokyo</Link></li>
                        <li><Link href="#">Jakarta</Link></li>
                        <li><Link href="#">Paris</Link></li>
                        <li><Link href="#">Buenos Aires</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-6 text-xs text-[#6b7b6c] gap-2">
                <p>
                    © Designed by <span className="underline">DhuhaCreative</span>. Powered by <span className="font-medium">UI8</span>.
                </p>
                <div className="flex gap-4">
                    <Link href="#">Licenses</Link>
                    <Link href="#">Privacy</Link>
                    <Link href="#">Terms</Link>
                </div>
            </div>
        </footer>
    );
}
