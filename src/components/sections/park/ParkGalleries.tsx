'use client';

import React from 'react';
import Image from 'next/image';

const ParkGalleries = () => {
    const images = [
        '/images/gallery1.jpg',
        '/images/gallery2.jpg',
        '/images/gallery3.jpg',
        '/images/gallery4.jpg',
        '/images/gallery5.jpg',
        '/images/gallery6.jpg',
        '/images/gallery7.jpg',
        '/images/gallery8.jpg',
        '/images/gallery9.jpg',
        '/images/gallery10.jpg',
        '/images/gallery11.jpg',
        '/images/gallery12.jpg',
        '/images/gallery13.jpg',
        '/images/gallery14.jpg',
        '/images/gallery15.jpg'
    ];

    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Park Galleries</h2>
                <p className="text-gray-700 mb-8">
                    In the early 20th century, a vast and rugged wilderness area in the heart of the fictional country of Napar captured the imagination of conservationists and nature enthusiasts alike...
                </p>

                <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                    {images.map((src, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg">
                            <Image
                                src={src}
                                alt={`Gallery Image ${index + 1}`}
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>

                <p className="text-gray-700 mt-8">
                    Visitors to the park can hike through pristine wilderness areas, go fishing in crystal-clear streams, camp in the shadow of towering peaks...
                </p>
            </div>
        </div>
    );
};

export default ParkGalleries;
