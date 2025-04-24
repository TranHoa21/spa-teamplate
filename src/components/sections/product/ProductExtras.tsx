'use client';

import Image from 'next/image';
import { motion } from "framer-motion";

interface ExtraItem {
    image: string;
    name?: string;
    message?: string;
    rating?: number; // 👈 Thêm trường rating
}

interface ProductExtrasProps {
    title: string;
    items: ExtraItem[];
    type: 'gallery' | 'testimonial';
}

export default function ProductExtras({ title, items, type }: ProductExtrasProps) {
    const renderStars = (rating: number = 5) => {
        return (
            <div className="flex text-yellow-500 text-sm">
                {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>{i < rating ? '⭐' : '☆'}</span>
                ))}
            </div>
        );
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mx-auto px-4 py-16">
            <h3 className="text-2xl font-bold text-center mb-8">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow hover:shadow-md transition p-4 space-y-2"
                    >
                        <Image
                            src={item.image}
                            alt={item.name || `item-${index}`}
                            width={400}
                            height={300}
                            className="w-full h-60 object-cover rounded-md"
                        />
                        {type === 'testimonial' && (
                            <div>
                                <p className="text-sm italic text-gray-600">{item.message}</p>
                                {item.name && <p className="text-sm font-semibold mt-2">– {item.name}</p>}
                                {item.rating && <div className="mt-1">{renderStars(item.rating)}</div>}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
