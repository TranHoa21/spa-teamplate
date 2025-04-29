// components/sections/home/Services.tsx

import Image from "next/image";
import Link from "next/link";

const services = [
  { title: "Vastu Shastra", icon: "/images/traditional.png" },
  { title: "Birth Journal", icon: "/images/feet.png" },
  { title: "Manglik Dosha", icon: "/images/wedding-rings.png" },
  { title: "Lal Kitab", icon: "/images/book.png" },
  { title: "Crystal Ball", icon: "/images/crystal-ball.png" },
  { title: "Kundli Dosh", icon: "/images/wind-rose.png" },
  { title: "Tarot Reading", icon: "/images/playing-card.png" },
  { title: "Palm Reading", icon: "/images/stop (1).png" },
];

export default function Services() {
  return (
    <section className="py-20 bg-[#031d2e]">
      <div className="container mx-auto px-4 text-white">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold capitalize mb-4">Our Services</h1>
          <p className="text-sm leading-relaxed">
            Consectetur adipiscing elit, sed do eiusmod tempor incididuesdeentiut labore <br />
            etesde dolore magna aliquapspendisse and the gravida.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center bg-[#07273c] text-white text-center shadow-md p-6 rounded-2xl hover:shadow-lg transition h-[450px]"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-6">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
                <p className="text-white mb-6">
                  Consectetur adipiscing elit sed do <br /> eiusmod tempor incididunt.
                </p>
                <Link
                  href="/serviceDetail"
                  className="text-orange-500 font-medium hover:underline mt-auto"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>



  );
}
