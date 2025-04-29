import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';
import { BsCart2 } from 'react-icons/bs';
import { BiGitCompare } from 'react-icons/bi';
import { FaStar, FaRegStar } from 'react-icons/fa';

const products = [
    {
        id: 1,
        name: 'Gemstone',
        image: '/assets/images/prod1.jpg',
        price: 20,
        originalPrice: 80,
    },
    {
        id: 2,
        name: 'Gemstone',
        image: '/assets/images/prod2.jpg',
        price: 20,
        originalPrice: 80,
    },
    {
        id: 3,
        name: 'Gemstone',
        image: '/assets/images/prod3.jpg',
        price: 20,
        originalPrice: 80,
    },
    {
        id: 4,
        name: 'Gemstone',
        image: '/assets/images/prod4.jpg',
        price: 20,
        originalPrice: 80,
    },
    {
        id: 5,
        name: 'Gemstone',
        image: '/assets/images/prod1.jpg',
        price: 20,
        originalPrice: 80,
    },
    {
        id: 6,
        name: 'Gemstone',
        image: '/assets/images/prod2.jpg',
        price: 20,
        originalPrice: 80,
    },
    {
        id: 7,
        name: 'Gemstone',
        image: '/assets/images/prod3.jpg',
        price: 20,
        originalPrice: 80,
    },
    {
        id: 8,
        name: 'Gemstone',
        image: '/assets/images/prod4.jpg',
        price: 20,
        originalPrice: 80,
    },
];

export default function ProductsSlider() {
    return (
        <section className="py-20 bg-[#031d2e]">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold mb-4 text-white">Our Latest Products</h1>
                    <p className="text-white">
                        Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore<br />
                        et dolore magna aliqua suspendisse gravida.
                    </p>
                </div>

                <div className="relative">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={4}
                        slidesPerGroup={4}
                        speed={800} // 👉 chuyển mượt hơn (0.8s)
                        pagination={{
                            el: '.custom-pagination',
                            clickable: true,
                        }}
                        loop={false}
                        breakpoints={{
                            320: { slidesPerView: 1, slidesPerGroup: 1 },
                            640: { slidesPerView: 2, slidesPerGroup: 2 },
                            1024: { slidesPerView: 4, slidesPerGroup: 4 },
                        }}
                        className="pb-14"
                    >
                        {products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <div className="bg-[#10334a] rounded-2xl shadow-lg overflow-hidden p-4 group">
                                    <div className="relative mb-4">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={400}
                                            height={240}
                                            className="w-full h-60 object-contain mx-auto"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition">
                                            <div className="flex items-center justify-between bg-orange-500 p-2 rounded-lg">
                                                <Link href="/cart.html" className="text-white">
                                                    <FiHeart size={20} />
                                                </Link>
                                                <Link href="/cart.html" className="flex items-center gap-2 text-white px-4">
                                                    <BsCart2 size={20} />
                                                    <span className="text-sm font-semibold">Add To Cart</span>
                                                </Link>
                                                <Link href="/shop.html" className="text-white">
                                                    <BiGitCompare size={20} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mb-2 text-yellow-400">
                                        {[...Array(5)].map((_, index) => (
                                            index < 3 ? <FaStar key={index} /> : <FaRegStar key={index} />
                                        ))}
                                    </div>
                                    <h4 className="text-lg font-semibold text-white mb-1 text-center">{product.name}</h4>
                                    <div className="text-center">
                                        <span className="text-lg font-bold text-red-500">${product.price}</span>
                                        <del className="ml-2 text-sm text-gray-400">${product.originalPrice}</del>
                                        <span className="ml-2 text-sm text-orange-500">(60% off)</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Pagination */}
                    <div className="custom-pagination flex justify-center mt-8 gap-2"></div>
                </div>
            </div>

            {/* Custom Style cho dot */}
            <style jsx global>{`
          .custom-pagination .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #666;
            opacity: 1;
            transition: all 0.3s ease;
          }
          .custom-pagination .swiper-pagination-bullet-active {
            background: #f97316; /* Cam */
            width: 16px;
            height: 16px;
          }
        `}</style>
        </section>
    );
}
