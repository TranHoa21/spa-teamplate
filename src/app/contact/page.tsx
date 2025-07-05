'use client';
import React from 'react';
import ContactSection from "@/components/sections/contact/ContactSection";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import TeamGrid from "@/components/sections/about/TeamGrid"
import HeroStatsSection from "@/components/sections/contact/HeroStatsSection";
import MissionSection from "@/components/sections/about/MissionSection"
const AppointmentPage = () => {
    return (
        <>
            <ContactSection />
            <ContactFormSection />
            <HeroStatsSection />
            <TeamGrid />
            <MissionSection />
        </>
    );
};

export default AppointmentPage;
