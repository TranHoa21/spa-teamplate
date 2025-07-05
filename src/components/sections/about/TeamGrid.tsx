'use client'

import Image from 'next/image'
import { FaFacebookF, FaTwitter, FaEnvelope, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

const team = [
    {
        name: 'Lawrence Petrie',
        role: 'A keen yachtsman and editor of a cruising guide, Lawrence is constantly reminded of the effects of pollution in.',
        image: '/images/team1.jpg',
    },
    {
        name: 'Lucas Aquilani',
        role: 'She is an avid beach-goer and commits to doing what she can to keep world beautiful, clean and healthy.',
        image: '/images/team2.jpg',
    },
    {
        name: 'Ruth Aquilani',
        role: 'She is an avid beach-goer and commits to doing what she can to keep world beautiful, clean and healthy.',
        image: '/images/team3.jpg',
    },
    {
        name: 'Jane Ansems',
        role: 'The appreciation and love that she has for wildlife and animals makes her especially concerned about environment',
        image: '/images/team4.jpg',
    },
    {
        name: 'Jack Peters',
        role: 'A keen yachtsman and editor of a cruising guide, Lawrence is constantly reminded of the effects of pollution in.',
        image: '/images/team5.jpg',
    },
    {
        name: 'Lora Portilla',
        role: 'She is an avid forest-goer and commits to doing what she can to keep world beautiful, clean and healthy.',
        image: '/images/team6.jpg',
    },
    {
        name: 'Anna Phillips',
        role: 'She is an avid beach-goer and commits to doing what she can to keep world beautiful, clean and healthy.',
        image: '/images/team7.jpg',
    },
    {
        name: 'Roland Walker',
        role: 'The appreciation and love that she has for wildlife and animals makes her especially concerned about environment',
        image: '/images/team8.jpg',
    },
]

export default function TeamGrid() {
    return (
        <section className="bg-[#f8f9fa] py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {team.map((member, index) => (
                        <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm">
                            <div className="relative">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    width={400}
                                    height={400}
                                    className="w-full h-72 object-cover"
                                />
                                <div className="absolute bottom-3 left-3 flex space-x-2">
                                    <button className="bg-green-700 text-white p-1.5 rounded">
                                        <FaFacebookF size={14} />
                                    </button>
                                    <button className="bg-green-700 text-white p-1.5 rounded">
                                        <FaTwitter size={14} />
                                    </button>
                                    <button className="bg-green-700 text-white p-1.5 rounded">
                                        <FaEnvelope size={14} />
                                    </button>
                                    <button className="bg-green-700 text-white p-1.5 rounded">
                                        <FaLinkedinIn size={14} />
                                    </button>
                                    <button className="bg-green-700 text-white p-1.5 rounded">
                                        <FaInstagram size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                <p className="text-sm text-gray-600 mt-2">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
