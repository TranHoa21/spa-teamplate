import React from "react";
import Image from "next/image";
import "@/style/home/ZodiacSection.css";

const zodiacSigns = [
    { name: "Aries", date: "Mar 21 - Apr 19", icon: "/images/aries.png" },
    { name: "Taurus", date: "Apr 20 - May 20", icon: "/images/taurus.png" },
    { name: "Gemini", date: "May 21 - Jun 20", icon: "/images/gemini.png" },
    { name: "Cancer", date: "Jun 21 - Jul 22", icon: "/images/cancer.png" },
    { name: "Leo", date: "Jul 23 - Aug 22", icon: "/images/gemini.png" },
    { name: "Virgo", date: "Aug 23 - Sep 22", icon: "/images/gemini.png" },
    { name: "Libra", date: "Sep 23 - Oct 22", icon: "/images/leo.png" },
    { name: "Scorpio", date: "Oct 23 - Nov 21", icon: "/images/scorpio.png" },
    { name: "Sagittarius", date: "Nov 22 - Dec 21", icon: "/images/sagittarius.png" },
    { name: "Capricorn", date: "Dec 22 - Jan 19", icon: "/images/capricorn.png" },
    { name: "Aquarius", date: "Jan 20 - Feb 18", icon: "/images/aquarius.png" },
    { name: "Pisces", date: "Feb 19 - Mar 20", icon: "/images/pisces.png" },
];

const ZodiacSection: React.FC = () => {
    // Xác định kích thước dựa theo kích thước màn hình
    const [size, setSize] = React.useState<"mobile" | "tablet" | "desktop">("desktop");

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setSize("mobile");
            } else if (window.innerWidth < 1024) {
                setSize("tablet");
            } else {
                setSize("desktop");
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const dimensions = {
        desktop: { size: 700, radius: 320, center: 350, imageSize: 450 },
        tablet: { size: 500, radius: 230, center: 250, imageSize: 320 },
        mobile: { size: 360, radius: 160, center: 180, imageSize: 250 },
    };

    const { size: wrapperSize, radius, center, imageSize } = dimensions[size];

    return (
        <div
            className="relative bg-[#0B1D30] py-32 flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: `url(/images/bg3.jpg)`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <div className="relative" style={{ width: wrapperSize, height: wrapperSize }}>
                {/* Vòng tròn trung tâm */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                        src="/images/zodiac.png"
                        alt="Zodiac Circle"
                        width={imageSize}
                        height={imageSize}
                        className="z-10 floating-image"
                    />
                </div>

                {/* Các cung hoàng đạo */}
                {zodiacSigns.map((sign, index) => {
                    const angle = (index / 12) * 360;
                    const x = center + radius * Math.cos((angle - 90) * (Math.PI / 180));
                    const y = center + radius * Math.sin((angle - 90) * (Math.PI / 180));

                    // Kích thước icon theo size màn hình
                    const iconSize = size === "mobile" ? 28 : size === "tablet" ? 34 : 40;

                    return (
                        <div
                            key={index}
                            className="absolute flex flex-col items-center text-center w-auto"
                            style={{
                                left: `${x}px`,
                                top: `${y}px`,
                                transform: "translate(-50%, -50%)",
                                zIndex: 20,
                            }}
                        >
                            <Image src={sign.icon} alt={sign.name} width={iconSize} height={iconSize} className="mb-1" />
                            <h5 className="text-white text-sm font-semibold">{sign.name}</h5>
                            <p className="text-gray-400 text-xs">{sign.date}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ZodiacSection;
