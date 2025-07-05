'use client';

import { useState } from 'react';
import ActivitiesHero from '@/components/sections/activities/ActivitiesHero';
import ActivitiesFilter from '@/components/sections/activities/ActivitiesFilter';
import ActivityCard from '@/components/sections/activities/ActivityCard';
import { ActivitiesCTA } from '@/components/sections/activities/ActivitiesCTA';
import { ActivitiesFAQ } from '@/components/sections/activities/ActivitiesFAQ';

const sampleActivities = [
    {
        image: '/images/activities/safari.jpg',
        title: 'Safari Adventure',
        description: 'Experience breathtaking wildlife up close in their natural habitat.',
        tag: 'Wildlife'
    },
    {
        image: '/images/activities/mountain.jpg',
        title: 'Mount Kilimanjaro Hike',
        description: 'Challenge yourself with a hike to Africa’s highest peak.',
        tag: 'Hiking'
    },
    {
        image: '/images/activities/boat.jpg',
        title: 'Boat Safari',
        description: 'Explore the waterways and encounter hippos and crocodiles.',
        tag: 'Water-based'
    },
    {
        image: '/images/activities/family.jpg',
        title: 'Family Nature Walks',
        description: 'Educational and fun experiences for the whole family.',
        tag: 'Family'
    },
    {
        image: '/images/activities/culture.jpg',
        title: 'Cultural Village Visit',
        description: 'Immerse yourself in the traditions of local tribes.',
        tag: 'Cultural'
    }
];

export default function TourismActivitiesPage() {
    const [selectedTag, setSelectedTag] = useState('All');

    const filteredActivities = selectedTag === 'All'
        ? sampleActivities
        : sampleActivities.filter((activity) => activity.tag === selectedTag);

    return (
        <main>
            <ActivitiesHero />
            <ActivitiesFilter selected={selectedTag} onSelect={setSelectedTag} />
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto pb-12">
                {filteredActivities.map((activity, idx) => (
                    <ActivityCard
                        key={idx}
                        image={activity.image}
                        title={activity.title}
                        description={activity.description}
                        tag={activity.tag}
                    />
                ))}
            </section>
            <ActivitiesCTA />
            <ActivitiesFAQ />
        </main>
    );
}