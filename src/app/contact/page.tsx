'use client';
import React from 'react';
import ContactSection from "@/components/sections/home/ContactSection";
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
                <h1 className="text-4xl font-bold mb-4">Contact</h1>
                <h6 className="text-sm">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/contact" className="hover:underline">Contact</Link>
                </h6>
            </div>
            <ContactSection />

        </>
    );
};

export default AppointmentPage;
