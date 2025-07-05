'use client';

import Image from 'next/image';

export default function SkinDiagnosisSection() {
    return (
        <section className="bg-[#f2f6ef] py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between border-y border-[#c7d7bf]">
            {/* Left image */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0 flex justify-center">
                <Image
                    src="/images/vecter.png"
                    alt="Skin Diagnosis Illustration"
                    width={400}
                    height={400}
                    className="object-contain"
                />
            </div>

            {/* Right content */}
            <div className="w-full md:w-1/2 md:pl-16">
                <p className="text-sm text-[#a5b0a5] mb-4">Try Our Service</p>
                <h2 className="text-4xl md:text-5xl font-medium mb-6 text-[#294231]">
                    Your skin diagnosis in<br />3 minutes
                </h2>
                <p className="text-[#5e6e5f] mb-8">
                    Say hello to a more radiant, healthier you with personalized
                    skincare that’s as unique as you are.
                </p>
                <button className="border border-[#294231] px-6 py-2 rounded-full flex items-center gap-2 text-sm text-[#294231]">
                    Start my diagnosis →
                </button>
            </div>
        </section>
    );
}
