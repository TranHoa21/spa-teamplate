'use client';
import React from 'react';
import CustomerTestimonials from "@/components/sections/home/CustomerTestimonials";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import Services from "@/components/sections/home/Services"
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
                <h1 className="text-4xl font-bold mb-4">Services</h1>
                <h6 className="text-sm">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/services" className="hover:underline">Services</Link>
                </h6>
            </div>
            <Services />
            <WhyChooseUs />
            <CustomerTestimonials />

        </>
    );
};

export default AboutPage;
