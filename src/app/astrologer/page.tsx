'use client';
import React from 'react';
import CustomerTestimonials from "@/components/sections/home/CustomerTestimonials";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import TeamSection from "@/components/sections/home/TeamSection"
import Link from "next/link";
const AppointmentPage = () => {
    return (
        <>
            <div
                className="text-center text-white py-24"
                style={{
                    backgroundImage: `url(/images/bg1.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <h1 className="text-4xl font-bold mb-4">Astrologer</h1>
                <h6 className="text-sm">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/astrologer" className="hover:underline">Astrologer</Link>
                </h6>
            </div>
            <TeamSection />
            <WhyChooseUs />
            <CustomerTestimonials />

        </>
    );
};

export default AppointmentPage;
