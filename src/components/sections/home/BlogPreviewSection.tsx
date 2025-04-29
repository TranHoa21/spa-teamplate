"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaUser, FaComment } from "react-icons/fa";

const blogPosts = [
    {
        title: "Consectetur Adipiscing Elit Sedeius Mod Tempor Incididunt Ut Labore.",
        description:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut labore et dolore magna aliquapspendisse and the gravida.",
        image: "/images/reading-lines-hand-man-s-hands-close-view.jpg",
        date: "July 29, 2020",
        author: "Admin",
        comments: 0,
        link: "/blog_detail",
    },
    {
        title: "Consectetur Adipiscing Elit Sedeius Mod Tempor Incididunt Ut Labore.",
        description:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut labore et dolore magna aliquapspendisse and the gravida.",
        image: "/images/high-angle-woman-reading-tarot_23-2150396503.jpg",
        date: "July 29, 2020",
        author: "Admin",
        comments: 0,
        link: "/blog_detail",
    },
    {
        title: "Consectetur Adipiscing Elit Sedeius Mod Tempor Incididunt Ut Labore.",
        description:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut labore et dolore magna aliquapspendisse and the gravida.",
        image: "/images/reading-lines-hand-man-s-hands.jpg",
        date: "July 29, 2020",
        author: "Admin",
        comments: 0,
        link: "/blog_detail",
    },
];

const BlogSection: React.FC = () => {
    return (
        <section className="py-20 bg-[#08273c]">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">Our Latest Blog</h1>
                    <p className="text-base text-white leading-relaxed">
                        Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut labore <br />
                        etesde dolore magna aliquapspendisse and the gravida.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <div
                            key={index}
                            className="group bg-[#07273c] rounded-xl overflow-hidden shadow-md transition duration-300"
                        >
                            <div className="relative w-full h-60">
                                <Link href={post.link}>
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                </Link>
                                <span className="absolute bottom-0 right-0 m-4 bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-tl-lg">
                                    {post.date}
                                </span>
                            </div>

                            <div className="p-6">
                                <ul className="flex items-center gap-4 mb-4 text-gray-400 text-sm">
                                    <li className="flex items-center gap-2">
                                        <FaUser className="w-4 h-4" />
                                        By - {post.author}
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaComment className="w-4 h-4" />
                                        {post.comments} comments
                                    </li>
                                </ul>

                                <h4 className="text-lg font-bold text-white mb-2 transition-colors duration-300 group-hover:text-orange-500 leading-snug">
                                    <Link href={post.link}>{post.title}</Link>
                                </h4>

                                <p className="text-gray-300 text-sm leading-relaxed">{post.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
