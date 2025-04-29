// components/VastuShastra.tsx
import Image from "next/image";

const VastuShastra = () => {
    const residentialItems = [
        "Bath Room (210)",
        "Bed Room (62)",
        "Study Room (521)",
        "Puja Room (415)",
        "Toilet (52)",
        "Guest Room (75)",
        "Dining Room (20)",
    ];

    const commercialItems = [
        "Offices (210)",
        "Shop/Showroom (62)",
        "Industry (521)",
        "Hotels (415)",
        "Institutions (52)",
        "Movie Halls (75)",
        "Factories (20)",
    ];

    return (
        <section className="py-20 bg-[#07273c] text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="p-6 shadow-lg rounded-lg">

                            {/* Main Image */}
                            <Image
                                src="/assets/images/service_single.jpg"
                                alt="Vastu Shastra"
                                width={800}
                                height={400}
                                className="w-full object-cover"
                            />

                            {/* Title */}
                            <h1 className="text-3xl font-bold mt-6">Vastu Shastra</h1>
                            <div className="w-20 h-1 bg-orange-500 mt-2 mb-4" />

                            {/* Content */}
                            <p className="mt-4">
                                Consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipisicing eliit, sed do eiusimod tempor incididunt eiiut labore et dolore magna aliqua...
                            </p>

                            <p className="mt-4">
                                sunt in culpa qui officia deserunt mollit anim id est laborum...
                            </p>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-3 gap-4 mt-6">
                                {["s1.jpg", "s2.jpg", "s3.jpg"].map((img, index) => (
                                    <Image
                                        key={index}
                                        src={`/assets/images/${img}`}
                                        alt={`Vastu Shastra ${index + 1}`}
                                        width={300}
                                        height={200}
                                        className="rounded-md"
                                    />
                                ))}
                            </div>

                            <p className="mt-6">
                                Consectetur adipiscing elit, sed do Lorem ipsum dolor sit amet, consectetur adipisicing eliit...
                            </p>

                            {/* Tips Section */}
                            <h4 className="text-2xl font-semibold mt-8">Tips for Home Vastu Shastra</h4>
                            <p className="mt-4">
                                Sunt in culpa qui officia deserunt mollit anim id est laborum...
                            </p>

                            {/* Tips List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                {[...Array(2)].map((_, col) => (
                                    <ul key={col} className="list-disc pl-6">
                                        <li>Sunt in culpa qui officia deserunt</li>
                                        <li>Mollit anim id est laborum. Sed ut perspiciatis</li>
                                        <li>Unde omnis iste natus error</li>
                                        <li>Voluptatem accusantium doloremque laudantium</li>
                                        <li>Totam rem aperiam eaque ipsa quae ab illo inventore</li>
                                        <li>Veritatis eset quasi architecto.</li>
                                    </ul>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* Residential Vastu */}
                        <div className="p-6 shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold mb-2">Residential Vastu</h3>
                            <div className="w-20 h-1 bg-orange-500 mb-4" />
                            <ul className="space-y-3">
                                {residentialItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="border-b py-2 hover:text-orange-500 cursor-pointer flex items-center gap-2"
                                    >
                                        <span>▸</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Commercial Vastu */}
                        <div className="p-6 shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold mb-2">Commercial Vastu</h3>
                            <div className="w-20 h-1 bg-orange-500 mb-4" />
                            <ul className="space-y-3">
                                {commercialItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`border-b py-2 hover:text-orange-500 cursor-pointer flex items-center gap-2 ${item.includes("Factories") ? "text-orange-500 font-semibold" : ""
                                            }`}
                                    >
                                        <span>▸</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* App Download Section */}
                        <div className="p-6 shadow-lg rounded-lg text-center">
                            <Image src="/assets/images/logo1.svg" alt="Logo" width={150} height={50} className="mx-auto" />
                            <h3 className="text-lg font-semibold mt-4">Download the app now!</h3>
                            <div className="flex justify-center space-x-4 mt-4">
                                <Image src="/assets/images/gplay.png" alt="Google Play" width={120} height={40} />
                                <Image src="/assets/images/appstore.png" alt="App Store" width={120} height={40} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default VastuShastra;
