'use client';

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function BannerSection() {
    return (
        <section id="hero" className="bg-[#FFF1E6] text-[#333333] py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
                {/* Left content */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                        Biến Ảnh Của Bạn <br /> Thành Tác Phẩm Nghệ Thuật
                    </h1>
                    <p className="text-[#7D7D7D] text-base sm:text-lg mb-6">
                        Vẽ chân dung theo yêu cầu – độc đáo, tinh tế, hoàn toàn cá nhân hóa. Món quà ý nghĩa dành cho người bạn yêu thương.
                    </p>
                    <Link
                        href="#order"
                        className="inline-block bg-[#FF6B6B] text-white font-medium px-6 py-3 rounded-full hover:bg-[#e95b5b] transition"
                    >
                        Đặt ngay
                    </Link>
                </div>

                {/* Right slider with Swiper */}
                <div className="flex-1 w-full max-w-md mx-auto">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        className="rounded-xl shadow-md"
                    >
                        <SwiperSlide>
                            <Image
                                src="/images/1.WebP"
                                alt="Ảnh 1"
                                width={500}
                                height={500}
                                className="mx-auto object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src="/images/2.WebP"
                                alt="Ảnh 2"
                                width={500}
                                height={500}
                                className="mx-auto object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image
                                src="/images/3.WebP"
                                alt="Ảnh 3"
                                width={500}
                                height={500}
                                className="mx-auto object-cover"
                            />
                        </SwiperSlide>
                        {/* Thêm slide tại đây nếu cần */}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
