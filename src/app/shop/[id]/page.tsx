"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductsSlider from "@/components/sections/home/ProductsSlider";
import CustomerTestimonials from "@/components/sections/home/CustomerTestimonials"

const productImages = [
    "/assets/images/prod1.jpg",
    "/assets/images/prod2.jpg",
    "/assets/images/prod3.jpg",
    "/assets/images/prod4.jpg",
];

const ShopSinglePage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState(productImages[0]);
    const [quantity, setQuantity] = useState(1);
    const [tab, setTab] = useState<"description" | "review">("description");

    const handleQuantity = (type: "inc" | "dec") => {
        if (type === "inc") setQuantity((prev) => prev + 1);
        else if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
    };

    return (
        <>
            <div
                className="text-center text-white py-24"
                style={{
                    backgroundImage: `url(/images/bg1.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <h1 className="text-4xl font-bold mb-4">ProductDetail</h1>
                <h6 className="text-sm">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/shop" className="hover:underline">Shop / ProductDetail</Link>
                </h6>
            </div>
            <section className="py-20 bg-[#08273c] text-white">
                <div className="container mx-auto max-w-7xl px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Product Images */}
                        <div>
                            <div className="mb-4">
                                <Image
                                    src={selectedImage}
                                    alt="Product"
                                    width={400}
                                    height={400}
                                    className="rounded-xl object-cover mx-auto"
                                />
                            </div>
                            <div className="flex gap-4 justify-center">
                                {productImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-16 h-16 cursor-pointer border-2 rounded-md overflow-hidden ${selectedImage === img ? "border-blue-500" : "border-transparent"
                                            }`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <Image src={img} alt={`Thumb ${idx}`} width={60} height={60} className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="md:col-span-2">
                            <h3 className="text-3xl font-bold mb-2">Navgraha Yantra</h3>
                            <h2 className="text-2xl text-orange-400 mb-4">
                                $200 <del className="text-gray-400 text-base ml-2">$300</del>
                            </h2>

                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-sm">Ref No. 1456328</span>
                                <Image src="/assets/images/rating.png" alt="Rating" width={100} height={20} />
                            </div>

                            <p className="text-gray-300 mb-4 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>

                            <div className="mb-6">
                                <span className="bg-green-600 px-4 py-2 rounded-full text-xs">8 In Stock</span>
                            </div>

                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-lg font-semibold">Quantity:</span>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleQuantity("dec")} className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg">-</button>
                                    <input
                                        type="text"
                                        value={quantity}
                                        readOnly
                                        className="w-12 text-center rounded-lg bg-gray-800 border border-gray-600 text-white"
                                    />
                                    <button onClick={() => handleQuantity("inc")} className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg">+</button>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <Link href="/shop" className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-lg font-semibold">
                                    Buy Now
                                </Link>
                                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                                    <i className="fa fa-heart-o" aria-hidden="true"></i> Add to Wishlist
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mt-20">
                        <div className="flex justify-center gap-6 border-b border-gray-600 mb-8">
                            <button
                                className={`px-4 py-2 font-semibold ${tab === "description" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                                onClick={() => setTab("description")}
                            >
                                Description
                            </button>
                            <button
                                className={`px-4 py-2 font-semibold ${tab === "review" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
                                onClick={() => setTab("review")}
                            >
                                Review
                            </button>
                        </div>

                        {/* Tab Contents */}
                        {tab === "description" ? (
                            <div className="text-gray-300 space-y-6">
                                <div>
                                    <h3 className="text-2xl text-orange-400 mb-2">Description</h3>
                                    <p>Consectetur adipisicing elit, sed do eiusmod tempor incididunt labore dolore magna aliqua. Excepteur sint occaecat cupidatat non proident.</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl text-orange-400 mb-2">Features</h3>
                                    <p>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-300 space-y-6">
                                <div>
                                    <h3 className="text-2xl text-orange-400 mb-2">Review</h3>
                                    <p>There are no reviews yet.</p>
                                </div>

                                <div>
                                    <h3 className="text-2xl text-orange-400 mb-2">Add a Review</h3>
                                    <p>Your email address will not be published.</p>
                                    <form className="space-y-6 mt-6">
                                        <textarea
                                            placeholder="Your Review"
                                            className="w-full p-4 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 h-32 resize-none focus:outline-none focus:border-blue-400"
                                        ></textarea>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <input
                                                type="text"
                                                placeholder="Your Name"
                                                className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                            />
                                            <input
                                                type="email"
                                                placeholder="Your Email"
                                                className="w-full p-3 rounded-lg bg-transparent border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="bg-orange-500 hover:bg-blue-700 transition px-10 py-4 rounded-lg font-semibold text-white"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <ProductsSlider />
            <CustomerTestimonials />

        </>
    );
};

export default ShopSinglePage;
