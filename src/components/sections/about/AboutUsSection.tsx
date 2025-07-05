'use client'

import Image from 'next/image'

export default function AboutUsSection() {
    return (
        <section className="relative w-full min-h-screen text-white">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/bg-banner.webp"
                    alt="About Us Background"
                    fill
                    className="object-cover brightness-[0.5]"
                    priority
                />
            </div>

            <div className="container mx-auto px-6 py-24">
                {/* Title and Description */}
                <div className="max-w-3xl">
                    <p className="uppercase tracking-widest text-sm mb-2">Who we are?</p>
                    <h2 className="text-5xl font-bold mb-6">About Us</h2>
                    <p className="text-lg leading-relaxed">
                        Napar serves as sanctuaries for wildlife and offer visitors the chance to experience the wonders of nature. Protected areas are crucial for conservation and scientific research, as well as for recreational activities such as hiking, camping, and wildlife watching.
                    </p>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                        <p className="uppercase text-sm font-semibold mb-3">Taking part was the best thing I have ever done.</p>
                        <div className="text-sm text-gray-300">Monica Wright<br /><span className="text-gray-400">Fuse Inc.</span></div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                        <p className="uppercase text-sm font-semibold mb-3">Beautiful, a great place to launch with no pressure. Very peaceful.</p>
                        <div className="text-sm text-gray-300">Lucas Drahl<br /><span className="text-gray-400">Engineer</span></div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                        <p className="uppercase text-sm font-semibold mb-3">Most demanded and great place to help.</p>
                        <div className="text-sm text-gray-300">John Doe<br /><span className="text-gray-400">Freelancer</span></div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                        <p className="uppercase text-sm font-semibold mb-3">There are dedicated professionals at Napar.</p>
                        <div className="text-sm text-gray-300">Francine Noess<br /><span className="text-gray-400">Desert Place Inc.</span></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
