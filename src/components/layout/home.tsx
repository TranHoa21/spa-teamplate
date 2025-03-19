'use client';
import BannerSection from "@/components/sections/home/BannerSection";
import FeaturedProducts from "@/components/sections/home/FeaturedProducts"
import React from 'react';
import WhyUs from "@/components/sections/home/WhyUs";
import HowToOrder from "@/components/sections/home/HowToOrder"
const HomePage = () => {
    return (
        <>
            <BannerSection />
            <FeaturedProducts />
            <WhyUs />
            <HowToOrder />
        </>
    );
};

export default HomePage;
