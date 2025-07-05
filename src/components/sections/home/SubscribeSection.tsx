'use client';

import { ArrowRight } from 'lucide-react';

export default function SubscribeSection() {
    return (
        <section className="bg-[#879c82] px-6 py-10 md:py-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Text */}
                <h2 className="text-white text-3xl md:text-4xl font-light text-center md:text-left leading-snug">
                    Subscribe to get 10% off<br className="hidden md:block" /> your first order
                </h2>

                {/* Email input */}
                <form className="flex w-full md:w-auto max-w-md">
                    <input
                        type="email"
                        placeholder="Drop your email here"
                        className="flex-1 px-5 py-3 border border-gray-300 rounded-l-full focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-white border border-gray-300 rounded-r-full px-4 flex items-center justify-center"
                    >
                        <ArrowRight className="w-5 h-5 text-gray-700" />
                    </button>
                </form>
            </div>
        </section>
    );
}
