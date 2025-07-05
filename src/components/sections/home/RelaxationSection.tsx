'use client';

import Image from 'next/image';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
});

export default function TraditionalSkincare() {
    return (
        <section className="flex flex-col md:flex-row">
            {/* Left side - White background */}
            <div className="bg-[#f2f6ef] md:w-1/2 py-12 px-6 md:px-20 text-center md:text-left flex flex-col items-center md:items-start justify-center">
                <h2 className={`${cormorant.className} text-5xl font-semibold text-[#314631] leading-snug mb-6 text-center `}>
                    Inspired by traditional <br /> knowledge and nature
                </h2>
                <div className="relative w-[300px] h-[200px] md:w-[577px] md:h-[350px]">
                    <Image
                        src="/images/green-powder.png"
                        alt="Green Powder"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            </div>

            {/* Right side - Green background */}
            <div className="bg-[#f1f6ec] md:w-1/2 py-12 px-6 md:px-20 flex flex-col justify-center">
                <div className="space-y-10 text-gray-700">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 relative">
                            <Image src="/images/icon1.png" alt="Organic Icon" layout="fill" objectFit="contain" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#798977]">100% Organic</h3>
                            <p className="text-[#798977]">We craft skincare using the most exquisite ingredients from the plant, earth and mineral realms.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 relative">
                            <Image src="/images/icon2.png" alt="Skin Icon" layout="fill" objectFit="contain" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#798977]">Fits your skin</h3>
                            <p className="text-[#798977]">It’s all natural and processed based on traditional knowledge with modern technology.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 relative">
                            <Image src="/images/icon3.png" alt="Easy Icon" layout="fill" objectFit="contain" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#798977]">Easy to use</h3>
                            <p className="text-[#798977]">Packed with a unique design as well as useful that can help you perform routine skin care.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
