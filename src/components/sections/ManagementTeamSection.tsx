import Image from 'next/image';

export const ManagementTeamSection = () => {
    const team = [
        {
            name: 'Dr. John Mwakilema',
            role: 'Director General',
            image: '/images/people/director.jpg'
        },
        {
            name: 'Esther Kimaro',
            role: 'Chief Conservation Officer',
            image: '/images/people/conservation.jpg'
        },
        {
            name: 'Michael Ndulu',
            role: 'Head of Tourism Department',
            image: '/images/people/tourism.jpg'
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-10 text-center">Our Management Team</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {team.map((member) => (
                        <div key={member.name} className="text-center bg-white p-6 shadow rounded">
                            <Image src={member.image} alt={member.name} width={150} height={150} className="mx-auto rounded-full object-cover h-[150px] w-[150px]" />
                            <h3 className="mt-4 font-semibold text-lg">{member.name}</h3>
                            <p className="text-sm text-gray-600">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};