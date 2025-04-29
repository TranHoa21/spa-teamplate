"use client";

import React from "react";
import Image from "next/image";

const stats = [
    { title: "Qualified Astrologers", number: 512 },
    { title: "Success Horoscope", number: 62 },
    { title: "Offices Worldwide", number: 94 },
    { title: "Trust by million clients", number: 452 },
    { title: "Year experience", number: 12 },
    { title: "Type of horoscopes", number: 652 },
];

const WhyChooseUs: React.FC = () => {
    return (
        <section className="py-20 bg-[#031d2e]">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="flex flex-col lg:flex-row items-center gap-10">

                    {/* Left Content */}
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Why Choose Us
                        </h1>
                        <div className="w-16 h-1 bg-orange-500 mb-6 mx-auto lg:mx-0" />
                        <p className="text-base text-gray-300 leading-relaxed">
                            Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut.
                        </p>
                    </div>

                    {/* Right Boxes */}
                    <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stats.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center space-y-4 group cursor-pointer"
                            >
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <Image
                                        src="/images/shape.svg"
                                        alt="Decoration Shape"
                                        fill
                                        className="object-contain"
                                    />
                                    <span className="text-white text-2xl font-bold z-10">{item.number}+</span>
                                </div>
                                <h4 className="text-lg font-semibold text-white group-hover:text-orange-500 transition-colors duration-300">
                                    {item.title}
                                </h4>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
