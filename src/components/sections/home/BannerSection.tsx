'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import "@/style/home/BannerSection.css";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BannerSection() {
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            router.push("/san-pham");
        }, 300); // Thời gian delay hiệu ứng trước khi chuyển trang
    };


    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            id="hero"
            className="text-white m-0 sm:m-auto py-4 sm:py-6 md:py-12 bg-[#0B2239] relative"
            style={{ backgroundImage: `url("/images/bg1.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <button className="hidden md:block absolute left-6 top-1/2 transform -translate-y-1/2 bg-[#102C47] text-white text-xs px-5 py-2 hover:bg-orange-500 transition-all z-20" style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)' }}>
                ◀ PREV
            </button>

            <button className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2 bg-[#102C47] text-white text-xs px-5 py-2 hover:bg-orange-500 transition-all z-20" style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)' }}>
                NEXT ▶
            </button>

            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">

                {/* Left Content */}
                <div className="flex-1 text-left sm:pl-8 sm:mt-0">
                    <p className="text-orange-500 text-sm sm:text-lg font-semibold mb-2">What is Your Sign ?</p>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                        Read Your Daily <br /> Horoscope Today
                    </h1>
                    <p className="text-gray-300 text-sm sm:text-base mb-6">
                        Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etesde dolore magna aliqua suspendisse and the gravida.
                    </p>
                    <button
                        onClick={handleClick}
                        className={`inline-block bg-orange-500 text-white font-medium px-4 py-3 rounded-full
          transition-all duration-300 ease-in-out transform 
          ${isClicked ? 'scale-90 opacity-80' : 'hover:scale-105 hover:shadow-lg'}`}
                        style={{
                            clipPath: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)'
                        }}
                    >
                        READ MORE
                    </button>
                </div>

                {/* Right Image */}
                <motion.div
                    className="flex justify-center md:justify-end w-full sm:w-auto"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="relative w-[400px] sm:w-[400px] md:w-[600px] max-w-full floating-image">
                        <Image
                            src="/images/snapedit_1745651487399.png"
                            alt="Horoscope Chart"
                            width={500}
                            height={500}
                            className="rounded-full w-full object-cover"
                            loading="lazy"
                        />

                    </div>
                </motion.div>

            </div>
        </motion.section>




    );
}
