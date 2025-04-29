"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaCalendarAlt } from "react-icons/fa";

const overviewData = [
    {
        title: "Mercury in Aries square Mars in Capricorn",
        description:
            "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. It has survived not only five centuries, but also the leap into electronic typesetting.",
        date: "July 29, 2020",
    },
    {
        title: "Venus enters Gemini",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s.",
        date: "July 30, 2020",
    },
    {
        title: "Mars retrograde in Aquarius",
        description:
            "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.",
        date: "August 1, 2020",
    },
];

const DailyOverview: React.FC = () => {
    return (
        <section className="py-20 bg-[#08273c] relative overflow-hidden">
            <div className="container mx-auto max-w-5xl px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Daily Planetary Overview</h1>
                    <div className="h-1 w-16 bg-orange-400 mx-auto mb-4"></div>
                    <p className="text-base text-white leading-relaxed">
                        Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut labore <br />
                        etesde dolore magna aliquapspendisse and the gravida.
                    </p>
                </div>

                {/* Swiper Section */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                >
                    {overviewData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-[#0b3d5b] px-10 py-8 rounded-xl text-center text-white shadow-lg">
                                <h4 className="text-2xl font-semibold text-orange-400 mb-6">{item.title}</h4>
                                <p className="text-gray-300 text-sm mb-8 leading-relaxed max-w-3xl mx-auto">{item.description}</p>
                                <div className="flex justify-center">
                                    <span className="inline-flex items-center gap-2 bg-orange-500 px-6 py-2 rounded-full text-sm font-semibold">
                                        <FaCalendarAlt className="w-4 h-4" />
                                        {item.date}
                                    </span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Pagination Dots Style */}
                <style jsx global>{`
                    .swiper-pagination-bullet {
                        background: #f97316; /* Tailwind orange-500 hex */
                        opacity: 0.5;
                    }
                    .swiper-pagination-bullet-active {
                        background: #f97316; /* Orange-500 */
                        opacity: 1;
                    }
                `}</style>
            </div>
        </section>
    );
};

export default DailyOverview;
