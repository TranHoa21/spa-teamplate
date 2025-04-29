import { motion } from "framer-motion";
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
export default function WhyUs() {
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [
        "/images/review-coc.jpg",
        "/images/review-tui.jpg",
        "/images/Ốp lưng độc đáo – Biến ảnh thành tranh vẽ!.png",
        "/images/review-coc.jpg",
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            id="why"
            className="bg-[#07273c] py-16 px-4"
        >
            <div className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
                {/* Left - Wrapper */}
                <div className="relative w-full max-w-xs sm:max-w-md md:w-[465px] md:h-[505px] h-[400px] mx-auto">
                    {/* Dots */}
                    <div className="absolute -left-6 sm:-left-10 md:-left-20 top-2/3 -translate-y-1/2 flex flex-col gap-4">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`w-2 h-2 rounded-full ${activeIndex === idx ? 'bg-orange-500' : 'bg-white opacity-50'} transition-all`}
                            ></button>
                        ))}
                    </div>

                    {/* Lớp nền */}
                    <div className="absolute top-10 right-8 md:top-20  sm:-bottom-16 sm:-left-6 md:right-20 w-[90%] sm:h-[400px]  md:w-[423px] h-full md:h-[463px] bg-[#17384e] z-0 mx-auto md:mx-0"></div>

                    {/* Góc trái dưới */}
                    <div className="absolute -bottom-4 sm:-bottom-16 md:-bottom-10 -left-6 sm:-left-6 md:-left-10 w-[60px] sm:w-[70px] md:w-[90px] h-[60px] sm:h-[70px] md:h-[90px] bg-transparent border-l-2 border-b-2 border-orange-500 z-20"></div>

                    {/* Ảnh chính với hiệu ứng chuyển động */}
                    <motion.div
                        key={activeIndex}
                        initial={{ x: '50%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '0%' }}
                        transition={{ duration: 0.9 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[activeIndex]}
                            alt="Zodiac"
                            fill
                            className="object-cover z-10 relative rounded-md"
                        />
                    </motion.div>
                </div>

                <div className="w-full text-white px-2 sm:px-4 md:px-0 text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold capitalize mb-5 relative">
                        know about Astrology
                    </h1>
                    <p className="mb-6 text-sm sm:text-base">
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                    </p>
                    <p className="mb-6 text-sm sm:text-base">
                        As opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many websites still in their web page editors infancy.
                    </p>
                    <Link href="/" className="bg-orange-500 text-white py-2 px-6 rounded-full inline-block mb-6" style={{
                        clipPath: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)'
                    }}>
                        Read more
                    </Link>

                    <div className="flex flex-col sm:flex-row items-center bg-[#17384e] rounded-xl p-4 sm:p-6 mt-6 sm:mt-10 max-w-full sm:max-w-[470px] mx-auto md:mx-0">
                        <span className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full flex items-center justify-center sm:mr-6 mb-4 sm:mb-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                <path
                                    fill="#fff"
                                    fillRule="evenodd"
                                    d="M19.797,10.487 C19.668,10.616 19.493,10.689 19.310,10.689 C18.929,10.689 18.620,10.380 18.620,9.999 C18.615,5.241 14.759,1.385 10.000,1.379 C9.619,1.379 9.310,1.070 9.310,0.689 C9.310,0.308 9.619,-0.000 10.000,-0.000 C15.520,0.006 19.993,4.478 19.999,9.999 C19.999,10.183 19.927,10.358 19.797,10.487 ZM15.172,9.999 C15.169,7.144 12.855,4.830 10.000,4.827 C9.619,4.827 9.310,4.518 9.310,4.138 C9.310,3.757 9.619,3.448 10.000,3.448 C13.617,3.452 16.547,6.383 16.551,9.999 C16.551,10.380 16.243,10.689 15.862,10.689 C15.481,10.689 15.172,10.380 15.172,9.999 ZM12.864,14.155 C13.076,14.182 13.288,14.109 13.438,13.957 L14.982,12.413 C15.209,12.186 15.563,12.146 15.835,12.317 L19.655,14.775 C19.955,14.965 20.063,15.350 19.905,15.668 L18.045,19.616 C17.918,19.873 17.645,20.024 17.360,19.995 C15.394,19.789 10.563,18.932 5.815,14.183 C1.067,9.435 0.210,4.604 0.003,2.638 C-0.026,2.352 0.125,2.079 0.382,1.952 L4.331,0.093 C4.649,-0.067 5.036,0.043 5.224,0.344 L7.684,4.164 C7.854,4.436 7.814,4.790 7.586,5.017 L6.042,6.560 C5.890,6.711 5.818,6.924 5.845,7.135 C5.942,7.900 6.373,9.809 8.282,11.718 C10.191,13.627 12.099,14.057 12.864,14.155 Z"
                                />
                            </svg>
                        </span>
                        <div className="text-center sm:text-left">
                            <h5 className="text-white text-sm sm:text-base">Contact Our Expert Astrologers</h5>
                            <h1 className="text-orange-500 text-lg sm:text-2xl">+ (91) 1800-124-105</h1>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
