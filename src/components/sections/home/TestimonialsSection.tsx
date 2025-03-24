"use client";

import Image from "next/image";

const testimonials = [
    {
        name: "Ngọc Trâm",
        message:
            "Sản phẩm quá đẹp, mình rất hài lòng và sẽ đặt lại cho bạn bè.",
        image: "/images/testimonials/1.webp",
        video: null,
    },
    {
        name: "Minh Anh",
        message:
            "Mình nhận được cốc vẽ siêu xinh, đóng gói cức ấm áp, siêu hài lòng!",
        image: "/images/testimonials/2.webp",
        video: null,
    },
    {
        name: "Phương Linh",
        message: "Video review cho shop nè, 10/10 luôn á!",
        image: "/images/testimonials/3.webp",
        video: "/videos/testimonials/linh.mp4",
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="bg-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-[#333] mb-2">
                        Cảm nhận khách hàng
                    </h2>
                    <p className="text-[#7D7D7D]">
                        Chúng mình tự hào được đồng hành cùng hơn 1000+ khách hàng trong hành trình tặng quà ý nghĩa.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow hover:shadow-md transition p-4"
                        >
                            {item.video ? (
                                <video
                                    controls
                                    className="w-full h-56 object-cover rounded-md mb-3"
                                >
                                    <source src={item.video} type="video/mp4" />
                                    Trình duyệt của bạn không hỗ trợ video.
                                </video>
                            ) : (
                                <Image
                                    src={item.image}
                                    alt={`Feedback ${item.name}`}
                                    width={400}
                                    height={300}
                                    className="w-full h-56 object-cover rounded-md mb-3"
                                />
                            )}
                            <p className="text-sm italic text-gray-600">{item.message}</p>
                            <p className="text-sm font-semibold mt-2">- {item.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
