"use client";

import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
    {
        name: "David Parker",
        role: "Astrologer",
        image: "/images/7a7868d0a50534f9759244b98d3f6535.jpg",
        content:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida commodo viverra maecenas accumsan lacus vel facilisis.",
    },
    {
        name: "John Parker",
        role: "Astrologer",
        image: "/images/3085df706af8e720904648b1e83335d0.jpg",
        content:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida commodo viverra maecenas accumsan lacus vel facilisis.",
    },
    {
        name: "Anna Nguyen",
        role: "Astrologer",
        image: "/images/d3829de1490f5f25d881ac6c26035408.jpg",
        content:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida commodo viverra maecenas accumsan lacus vel facilisis.",
    },
    {
        name: "Trang Pham",
        role: "Astrologer",
        image: "/images/ab01a86f52375429e633d7b3b066f2b5.jpg",
        content:
            "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida commodo viverra maecenas accumsan lacus vel facilisis.",
    },
];

const CustomerTestimonials: React.FC = () => {
    return (
        <section className="py-20 bg-[#08273c]">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-white mb-6">What Our Customers Say</h1>
                    <p className="text-base text-white leading-relaxed">
                        Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut labore <br />
                        etesde dolore magna aliquapspendisse and the gravida.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-[#10334a] p-8 rounded-xl text-center flex flex-col items-center gap-4 shadow-lg"
                        >
                            <div className="relative">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-24 h-24 object-cover rounded-full border-4 border-white"
                                />
                                <div className="absolute -bottom-2 -right-2 bg-orange-500 p-2 rounded-full">
                                    <FaQuoteLeft className="w-5 h-5 text-white" />
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{testimonial.content}</p>
                            <h3 className="text-lg font-bold text-white mt-4">{testimonial.name}</h3>
                            <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomerTestimonials;
