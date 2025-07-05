'use client';
import React from 'react';
import Image from 'next/image';

const ContactSection = () => {
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

            {/* Content */}
            <div className="relative pt-20 z-10 flex flex-col justify-center h-full px-6 max-w-7xl mx-auto">
                <p className="text-sm uppercase tracking-widest font-semibold">Make an impact</p>
                <h1 className="text-4xl md:text-6xl font-bold mt-2">Contact Us</h1>
                <p className="mt-4 max-w-xl text-lg">
                    We welcome your comments and questions. Let’s connect and explore how we can partner.
                </p>

                {/* Contact Info Grid */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/30 pt-8">
                    {/* Address */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest">Napar Nonprofit Park</h4>
                        <p className="mt-2">Presidio Officers’ Club<br />50 Moraga Ave, Boulder</p>
                    </div>

                    {/* Email */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest">hello@napar.org</h4>
                        <p className="mt-2">Don’t hesitate and write us. This is the general email address.</p>
                    </div>

                    {/* Phone */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest">(647) 395-6581</h4>
                        <p className="mt-2">Call us. This is the general phone line.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
