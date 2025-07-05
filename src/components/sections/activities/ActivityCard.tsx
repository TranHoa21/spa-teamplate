import Image from 'next/image';
import Link from 'next/link';

const ActivityCard = ({ image, title, description, tag }: { image: string; title: string; description: string; tag?: string }) => {
    return (
        <div className="rounded overflow-hidden shadow hover:shadow-lg transition bg-white">
            <Image src={image} alt={title} width={500} height={300} className="w-full object-cover h-52" />
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    {tag && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{tag}</span>}
                </div>
                <p className="text-sm text-gray-600">{description}</p>
                <Link href="#" className="text-indigo-700 text-sm mt-3 inline-block hover:underline">Read more →</Link>
            </div>
        </div>
    );
};

export default ActivityCard