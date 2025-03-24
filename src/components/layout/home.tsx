'use client';
import BannerSection from "@/components/sections/home/BannerSection";
import FeaturedProducts from "@/components/sections/home/FeaturedProducts"
import React from 'react';
import WhyUs from "@/components/sections/home/WhyUs";
import HowToOrder from "@/components/sections/home/HowToOrder"
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";
import BlogPreviewSection from "@/components/sections/home/BlogPreviewSection"
const HomePage = () => {
    return (
        <>
            <BannerSection />
            <WhyUs />
            <FeaturedProducts />
            <TestimonialsSection />
            <HowToOrder />
            <BlogPreviewSection />
        </>
    );
};

export default HomePage;
