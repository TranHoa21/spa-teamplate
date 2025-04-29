'use client';

import Image from 'next/image';
import {
    FaFacebookF,
    FaTwitter,
    FaGoogle,
} from 'react-icons/fa';

const teamMembers = [
    { name: 'John Doe', img: 'team1.jpg' },
    { name: 'Marie J. Vela', img: 'team2.jpg' },
    { name: 'Judith Travis', img: 'team3.jpg' },
    { name: 'Mary Freeman', img: 'team4.jpg' },
    { name: 'Julio McDaniel', img: 'team5.jpg' },
    { name: 'Lawrence Soto', img: 'team6.jpg' },
    { name: 'Clarence Kissel', img: 'team7.jpg' },
    { name: 'Doris Tierney', img: 'team8.jpg' },
];

const socialIcons = [
    { icon: <FaFacebookF />, link: '/facebook' },
    { icon: <FaTwitter />, link: '/twitter' },
    { icon: <FaGoogle />, link: '/google' },
];

const TeamSection = () => {
    return (
        <section className="py-20 bg-[#07273c] text-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap -mx-4">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"
                        >
                            <div className="text-center">
                                <div className="overflow-hidden transition-all duration-300 ease-in-out group">
                                    <Image
                                        src={`/assets/images/${member.img}`}
                                        alt={member.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-auto object-cover transition-all duration-300 group-hover:rounded-full"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
                                <p className="text-gray-300">Astrologer</p>
                                <div className="flex justify-center space-x-4 mt-3 text-white text-lg">
                                    {socialIcons.map((item, i) => (
                                        <a
                                            key={i}
                                            href={item.link}
                                            className="hover:text-orange-400 transition"
                                        >
                                            {item.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
