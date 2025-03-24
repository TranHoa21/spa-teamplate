'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "@/style/home/BannerSection.css"
export default function BannerSection() {
    const [bgImage, setBgImage] = useState("/images/desktop.WebP");
    const router = useRouter();
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            router.push("/san-pham");
        }, 300); // Thời gian delay hiệu ứng trước khi chuyển trang
    };
    useEffect(() => {
        const updateBackground = () => {
            if (window.innerWidth < 768) {
                setBgImage("/images/Mobile.WebP");
            } else if (window.innerWidth < 1024) {
                setBgImage("/images/Tablet.webp");
            } else {
                setBgImage("/images/desktop.webp");
            }
        };

        updateBackground(); // Set ngay khi render
        window.addEventListener("resize", updateBackground);

        return () => window.removeEventListener("resize", updateBackground);
    }, []);

    return (
        <section
            id="hero"
            className="text-[#333333] py-8 sm:py-12 md:py-24 mt-[70px]"
            style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start gap-6 md:gap-10 ">
                {/* Nội dung bên trái */}
                <div className="flex-1 text-left max-w-[90%] sm:max-w-md pl-2 sm:pl-0 sm:mt-[7%]">
                    <h1 className="text-sm sm:text-2xl md:text-4xl font-bold leading-tight mb-2 sm:mb-4">
                        Biến Ảnh Của Bạn <br /> Thành Tác Phẩm Nghệ Thuật
                    </h1>
                    <p className="text-[#7D7D7D] text-xs sm:text-base mb-3 sm:mb-6">
                        Vẽ chân dung theo yêu cầu – độc đáo, tinh tế, hoàn toàn cá nhân hóa. Món quà ý nghĩa dành cho người bạn yêu thương.
                    </p>
                    <button
                        onClick={handleClick}
                        className={`inline-block bg-[#FF6B6B] text-white font-medium px-4 py-2 sm:px-6 sm:py-3 rounded-full
                transition-all duration-300 ease-in-out transform 
                ${isClicked ? "scale-90 opacity-80" : "hover:scale-105 hover:shadow-lg"}`}
                    >
                        Đặt ngay
                    </button>
                </div>
            </div>
        </section>



    );
}
