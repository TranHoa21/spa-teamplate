'use client';
import React from 'react';
import KnowZodiacSection from "@/components/sections/home/KnowZodiacSection";
import VastuShastra from "@/components/sections/home/VastuShastra"
import Link from "next/link";
import CustomerTestimonials from "@/components/sections/home/CustomerTestimonials";

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
                <h1 className="text-4xl font-bold mb-4">Service Detail</h1>
                <h6 className="text-sm">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/serviceDetail" className="hover:underline">Service Detail</Link>
                </h6>
            </div>
            <VastuShastra />
            <KnowZodiacSection />
            <CustomerTestimonials />

        </>
    );
};

export default AppointmentPage;
