'use client';

import Image from 'next/image';

export default function ProductTestimonialsWithCTA() {
    return (
        <section className="bg-[#f2f6ef] text-[#35462a] py-20 px-6 md:px-20">
            {/* Testimonial */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-20">
                {/* Left column - product image */}
                <div className="w-full md:w-1/3 mb-10 md:mb-0 flex justify-center relative">
                    <div className="w-[380px] h-[380px] bg-[#e6ede2] rounded-full absolute z-0"></div>
                    <div className="relative z-10 flex justify-center items-center w-[300px] h-[300px]">
                        <Image
                            src="/images/product-5.png"
                            alt="HOLOCENA skincare"
                            width={200}
                            height={400}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Middle column - content */}
                <div className="w-full md:w-1/3 md:px-8 relative">
                    <p className="text-sm text-[#a5b0a5] mb-4">Product Testimonials</p>
                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-[#35462a] text-xl mr-1">★</span>
                        ))}
                    </div>
                    <p className="text-xl md:text-2xl leading-relaxed mb-6">
                        “I’ve been feeling pretty stressed with my skin lately, so I picked up a set of
                        <strong> HOLOCENA </strong>
                        skincare. Oh my goodness!. It was AMAZING. My skin felt so soft and moisturized”
                    </p>
                    <p className="text-sm italic text-[#a5b0a5]">- Customer Review</p>
                </div>

                {/* Right column - arrows */}
                <div className="w-full md:w-1/3 flex flex-row md:flex-col items-center justify-center self-center">
                    <button className="text-2xl">→</button>
                    <span className="text-xl">⋮</span>
                    <button className="text-2xl">←</button>
                </div>
            </div>

            {/* CTA boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-b border-[#c7d7bf] py-12">
                {/* Box 1 */}
                <div className="flex flex-col items-center text-center gap-4">
                    <Image src="/images/icon4.png" alt="Loyalty Program" width={48} height={48} />
                    <h3 className="text-sm">Loyalty Program</h3>
                    <p className="text-lg font-medium">For Happy Skin</p>
                    <button className="mt-2 border border-[#35462a] px-6 py-2 rounded-full flex items-center gap-2 text-sm">
                        Join the program →
                    </button>
                </div>

                {/* Box 2 */}
                <div className="flex flex-col items-center text-center gap-4 border-l border-r border-[#c7d7bf] md:border-none">
                    <Image src="/images/icon5.png" alt="Refer a Friend" width={48} height={48} />
                    <h3 className="text-sm">Organic beauty is shared,</h3>
                    <p className="text-lg font-medium">Sponsor those you love!</p>
                    <button className="mt-2 border border-[#35462a] px-6 py-2 rounded-full flex items-center gap-2 text-sm">
                        Refer a Friend →
                    </button>
                </div>

                {/* Box 3 */}
                <div className="flex flex-col items-center text-center gap-4">
                    <Image src="/images/icon6.png" alt="Treatments" width={52} height={52} />
                    <h3 className="text-sm">Treat yourself to good weather</h3>
                    <p className="text-lg font-medium">at Maison Absolution</p>
                    <button className="mt-2 border border-[#35462a] px-6 py-2 rounded-full flex items-center gap-2 text-sm">
                        Try Our Treatments →
                    </button>
                </div>
            </div>
        </section>
    );
}
