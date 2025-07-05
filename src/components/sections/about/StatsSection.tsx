'use client'

import Image from 'next/image'

export default function StatsSection() {
    return (
        <section className="relative bg-[#f8f9fa] overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 px-6 py-20 gap-8 items-center">
                {/* Left Content */}
                <div className="bg-[#eef4fb] p-8 rounded-lg">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        A mystical world of <br /> peace & relaxation.
                    </h2>
                    <p className="text-gray-700 mb-10">
                        Napar Mountain National Park’s 215 square miles encompasses a spectacular range of mountain environments.
                        From meadows found in the montane life zone to glistening alpine lakes and up to the towering mountain peaks,
                        there is something for everyone to discover.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { value: '124', label: 'km of hiking trails' },
                            { value: '388', label: 'miles bike route' },
                            { value: '215', label: 'square miles' },
                            { value: '5m', label: 'visitors a year' },
                            { value: '9', label: 'mountain ranges' },
                            { value: '21', label: 'miles of coastline' },
                            { value: '6k', label: 'hectares of native woodland' },
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-md p-4 shadow-sm text-center">
                                <div className="text-2xl font-bold text-indigo-900">{item.value}</div>
                                <div className="text-sm text-gray-600">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Image */}
                <div className="hidden lg:block relative h-full">
                    <Image
                        src="/images/mountain-lake.jpg"
                        alt="Mountain Lake"
                        width={600}
                        height={600}
                        className="rounded-xl shadow-xl object-cover w-full h-full"
                    />
                </div>
            </div>
        </section>
    )
}
