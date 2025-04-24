'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
//import "@/style/home/BannerSection.css";
import Image from "next/image";
import { motion } from "framer-motion";


export default function BannerSectionBlog() {
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
            id="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative text-[#333333] py-4 sm:py-6 mt-[20px] overflow-hidden"
        >
            {/* Ảnh nền */}
            <Image
                src="/images/Mobile.WebP"
                alt="Background"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto absolute inset-0 -z-10"
            />

            {/* Nội dung căn giữa */}
            <div className="max-w-md mx-auto px-4 text-left">
                <h1 className="text-[10px] sm:text-sm md:text-base font-semibold leading-snug mb-1 sm:mb-2">
                    Biến Ảnh Của Bạn <br /> Thành Tác Phẩm Nghệ Thuật
                </h1>
                <p className="text-[#7D7D7D] text-[6px] w-[60%] sm:text-xs leading-snug mb-2 sm:mb-3">
                    Vẽ chân dung theo yêu cầu – độc đáo, tinh tế, hoàn toàn cá nhân hóa. Món quà ý nghĩa dành cho người bạn yêu thương.
                </p>
                <button
                    onClick={handleClick}
                    className={`inline-block bg-[#FF6B6B] text-white font-medium px-3 py-1.5 sm:px-5 sm:py-2 rounded-full
      text-xs sm:text-sm
      transition-all duration-300 ease-in-out transform 
      ${isClicked ? "scale-90 opacity-80" : "hover:scale-105 hover:shadow-lg"}`}
                >
                    Đặt ngay
                </button>
            </div>
        </motion.section>




    );
}
