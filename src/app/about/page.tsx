'use client';
import React from 'react';
import WhyUs from "@/components/sections/home/WhyUs";
import CustomerTestimonials from "@/components/sections/home/CustomerTestimonials";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import Link from "next/link";
const AboutPage = () => {
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
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <h6 className="text-sm">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/about" className="hover:underline">About Us</Link>
                </h6>
            </div>
            <WhyUs />
            <WhyChooseUs />
            <CustomerTestimonials />

        </>
    );
};

export default AboutPage;
