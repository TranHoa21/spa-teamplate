'use client';
import BannerSection from "@/components/sections/home/BannerSection";
import Services from "@/components/sections/home/Services"
import React from 'react';
import WhyUs from "@/components/sections/home/WhyUs";
import KnowZodiacSection from "@/components/sections/home/KnowZodiacSection"
import ZodiacSection from "@/components/sections/home/ZodiacSection";
import BlogPreviewSection from "@/components/sections/home/BlogPreviewSection";
import CustomerTestimonials from "@/components/sections/home/CustomerTestimonials";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import ProductsSlider from "@/components/sections/home/ProductsSlider";
import DailyOverview from "@/components/sections/home/DailyOverview"
const HomePage = () => {
    return (
        <>
            <BannerSection />
            <WhyUs />
            <Services />
            <ZodiacSection />
            <KnowZodiacSection />
            <CustomerTestimonials />
            <WhyChooseUs />
            <BlogPreviewSection />
            <ProductsSlider />
            <DailyOverview />
        </>
    );
};

export default HomePage;
