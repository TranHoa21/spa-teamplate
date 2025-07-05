'use client';
import React from 'react';
import AboutUsSection from "@/components/sections/about/AboutUsSection";
import MissionSection from "@/components/sections/about/MissionSection"
import PlanVisitSection from "@/components/sections/home/SkinDiagnosisSection";
import NaparIntroSection from "@/components/sections/home/ProductTestimonial";
import HeroStatsSection from "@/components/sections/contact/HeroStatsSection";
import TeamGrid from "@/components/sections/about/TeamGrid"
const AboutPage = () => {
    return (
        <>
            <AboutUsSection />
            <MissionSection />
            <HeroStatsSection />
            <TeamGrid />
            <PlanVisitSection />
            <NaparIntroSection />
        </>
    );
};

export default AboutPage;
