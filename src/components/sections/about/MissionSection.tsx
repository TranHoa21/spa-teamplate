'use client'

import Image from 'next/image'

export default function MissionSection() {
    return (
        <section className="bg-[#f8f9fa] py-20 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Content */}
                <div>
                    <p className="text-green-800 uppercase text-sm tracking-wider mb-2">This is our mission...</p>
                    <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                        We believe in <br /> Bright Future
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 border rounded-lg shadow-sm">
                        {/* Card 1 */}
                        <div>
                            <div className="mb-2">
                                <Image src="/icons/authority.svg" alt="Authority Icon" width={40} height={40} />
                            </div>
                            <h3 className="uppercase text-green-800 font-semibold text-sm mb-1">The Authority</h3>
                            <p className="text-gray-600 text-sm">
                                The concept is based on the premise that differences in species composition between areas are correlated with differences in environmental conditions.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div>
                            <div className="mb-2">
                                <Image src="/icons/sustainability.svg" alt="Sustainability Icon" width={40} height={40} />
                            </div>
                            <h3 className="uppercase text-green-800 font-semibold text-sm mb-1">Sustainability</h3>
                            <p className="text-gray-600 text-sm">
                                Responsible interaction with the environment to avoid depletion or degradation of natural resources and allow for long-term environmental quality.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div>
                            <div className="mb-2">
                                <Image src="/icons/ethics.svg" alt="Ethics Icon" width={40} height={40} />
                            </div>
                            <h3 className="uppercase text-green-800 font-semibold text-sm mb-1">Ethics & Value</h3>
                            <p className="text-gray-600 text-sm">
                                The concept is based on the premise that differences in species composition between areas are correlated with differences in environmental conditions.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div>
                            <div className="mb-2">
                                <Image src="/icons/volunteering.svg" alt="Volunteering Icon" width={40} height={40} />
                            </div>
                            <h3 className="uppercase text-green-800 font-semibold text-sm mb-1">Volunteering</h3>
                            <p className="text-gray-600 text-sm">
                                Our project concerns human beings’ ethical relationship with the natural environment. A serious problem exists with respect to the status and meaning of ‘environmental values’.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="grid grid-cols-2 gap-4 items-start relative">
                    <Image src="/images/mountain1.jpg" alt="Mountain 1" width={500} height={300} className="rounded-lg shadow-lg" />
                    <Image src="/images/mountain2.jpg" alt="Mountain 2" width={500} height={300} className="rounded-lg shadow-lg row-span-2" />
                    <Image src="/images/lake.jpg" alt="Lake" width={500} height={300} className="rounded-lg shadow-lg" />
                    {/* Optional decoration */}
                    <Image src="/images/leaf-decor.png" alt="Leaf Decoration" width={120} height={120} className="absolute bottom-0 right-0 hidden lg:block" />
                </div>
            </div>
        </section>
    )
}
