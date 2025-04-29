"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaYoutube, FaAngleRight, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#031d2e] text-[#aabed8] pt-20 text-sm">
            <div className="container mx-auto max-w-7xl px-4">
                {/* Newsletter */}
                <div className="pb-12 border-b border-[#22445e] mb-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h1 className="text-3xl font-serif mb-4 text-white">Our Newsletter</h1>
                            <p>
                                Get Your Daily Horoscope, Daily Lovescope and Daily<br />
                                Tarot Directly In Your Inbox
                            </p>
                        </div>
                        <div className="flex w-full lg:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your Email Here..."
                                className="bg-[#07273c] text-[#aabed8] px-6 py-4 w-full lg:w-96 focus:outline-none"
                            />
                            <button className="bg-[#ff7b00] hover:bg-[#e96d00] text-white font-semibold px-6 py-4">
                                SUBSCRIBE NOW
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
                    {/* Logo & About */}
                    <div>
                        <Link href="/" className="inline-block mb-4">
                            <Image src="/images/logo.png" alt="Logo" width={160} height={50} />
                        </Link>
                        <p className="mb-6">
                            Consectetur adipiscing elited doesde eiusmod tempor incididunt ust labore et dolore magna aliqua.
                        </p>
                        <p className="mb-3 font-semibold text-white">Follow Us</p>
                        <div className="flex gap-3">
                            {[FaFacebookF, FaTwitter, FaGooglePlusG, FaYoutube].map((Icon, idx) => (
                                <Link href="#" key={idx}>
                                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#07273c] hover:bg-[#07273c]">
                                        <Icon size={16} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Our Services */}
                    <div>
                        <h3 className="text-xl font-serif text-white mb-4">Our Services</h3>
                        <ul className="space-y-4">
                            {["Horoscopes", "Gemstones", "Numerology", "Tarot Cards", "Birth Journal"].map((item, idx) => (
                                <li key={idx}>
                                    <Link href="/serviceDetail" className="flex items-center gap-2 hover:text-white transition">
                                        <FaAngleRight /> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-serif text-white mb-4">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { title: "About Us", link: "/about" },
                                { title: "Blog", link: "/blog" },
                                { title: "Astrologers", link: "/astrologer" },
                                { title: "Appointment", link: "/appointment" },
                                { title: "Contact Us", link: "/contact" },
                            ].map((item, idx) => (
                                <li key={idx}>
                                    <Link href={item.link} className="flex items-center gap-2 hover:text-white transition">
                                        <FaAngleRight /> {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-serif text-white mb-4">Contact Us</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1" />
                                <p>Gotham Hall, 1356 Brodway Square, NY 10018, California, USA</p>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaEnvelope className="mt-1" />
                                <div className="flex flex-col">
                                    <Link href="mailto:astrology@example.com">astrology@example.com</Link>
                                    <Link href="mailto:astro@example.com">astro@example.com</Link>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaPhone className="mt-1" />
                                <div className="flex flex-col">
                                    <Link href="tel:+911800124105">+ (91) 1800-124-105</Link>
                                    <Link href="tel:+911800326324">+ (91) 1800-326-324</Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center py-6 border-t border-[#22445e] text-xs">
                    Copyright © 2025 Tran Hoa. All Right Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
