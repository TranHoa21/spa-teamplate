'use client';
import Image from 'next/image';
import CountUp from 'react-countup';

const stats = [
    { value: 124, label: 'km of hiking trails' },
    { value: 388, label: 'miles bike route' },
    { value: 215, label: 'square miles' },
    { value: 5_000_000, label: 'visitors a year', suffix: 'm' },
    { value: 9, label: 'mountain ranges' },
    { value: 21, label: 'miles of coastline' },
    { value: 6_000, label: 'hectares of native woodland', suffix: 'k' },
];

export default function HeroStatsSection() {
    return (
        <section className="bg-[#f5f8fc] w-full">
            <div className="grid md:grid-cols-2">
                {/* Content */}
                <div className="px-6 py-16 md:p-20 flex flex-col justify-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                        A mystical world of<br />
                        peace & relaxation.
                    </h2>
                    <hr className="w-12 border-t-2 border-gray-500 my-4" />
                    <p className="text-gray-700 mb-10 max-w-xl">
                        Napar Mountain National Park’s 215 square miles encompasses a spectacular range of mountain environments. From meadows found in the montane life zone to glistening alpine lakes and up to the towering mountain peaks, there is something for everyone to discover.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-lg shadow-sm px-6 py-4 text-center"
                            >
                                <div className="text-3xl font-bold text-blue-900">
                                    <CountUp
                                        start={0}
                                        end={stat.value}
                                        duration={2}
                                        suffix={stat.suffix ? stat.suffix : ''}
                                        separator=","
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Image */}
                <div className="h-[400px] md:h-auto relative">
                    <Image
                        src="/hero-mountain.jpg" // mẹ Sứa nhớ thay hình này đúng đường dẫn
                        alt="Mountain"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
