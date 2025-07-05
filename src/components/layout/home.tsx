'use client';
import BannerSection from "@/components/sections/home/BannerSection";
import FeaturedProducts from "@/components/sections/home/FeaturedProducts"
import React from 'react';
import RelaxationSection from "@/components/sections/home/RelaxationSection";
import ProductListing from "@/components/sections/home/ProductListing"
import AboutSection from "@/components/sections/home/AboutSection";
import SkinDiagnosisSection from "@/components/sections/home/SkinDiagnosisSection";
import ProductTestimonial from "@/components/sections/home/ProductTestimonial";
import SubscribeSection from "@/components/sections/home/SubscribeSection"
const HomePage = () => {
    return (
        <>
            <BannerSection />
            <RelaxationSection />
            <FeaturedProducts />
            <AboutSection />
            <ProductListing />
            <SkinDiagnosisSection />
            <ProductTestimonial />
            <SubscribeSection />
        </>
    );
};

export default HomePage;
