'use client';
import React from 'react';
import ParksByZone from "@/components/sections/park/ParksByZone";
import MissionSection from "@/components/sections/about/MissionSection"
import PlanVisitSection from "@/components/sections/home/SkinDiagnosisSection";
import NaparIntroSection from "@/components/sections/home/ProductTestimonial";
const ParkPage = () => {
    return (
        <>
            <ParksByZone />
            <MissionSection />
            <PlanVisitSection />
            <NaparIntroSection />
        </>
    );
};

export default ParkPage;
