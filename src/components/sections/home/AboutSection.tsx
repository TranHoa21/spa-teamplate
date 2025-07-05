'use client';


export default function AboutSection() {
    return (
        <section className="bg-[#f2f6ef] text-[#a5b0a5] px-6 md:px-20 py-16">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row md:justify-between gap-10 mb-12">
                {/* Left */}
                <div className="md:w-1/2">
                    <p className="text-sm mb-2">About us</p>
                    <h2 className="text-4xl md:text-5xl font-medium text-[#294231] leading-snug">
                        Velvety facial and <br /> skincare company
                    </h2>
                </div>

                {/* Right */}
                <div className="md:w-1/2 text-[#6f866f] space-y-6 text-sm md:text-base">
                    <p>
                        Velvety is an indigenous company that specializes in the manufacture and development of facial and skincare
                        products using the medicinal properties of the traditional First Nations pharmacopoeia, with a concern for
                        sustainable development.
                    </p>
                    <p>
                        The products offered, whose benefits have been scientifically confirmed, are 100% natural and allow you to
                        take care of your body and mind: calming teas, energizing infusions, anti-inflammatory essential oils,
                        anti-age soaps and creams, etc.
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#a5b0a5] my-12" />

            {/* Logos Section */}
            <div className="text-center ">
                <p className="mb-8 text-[#c7d7bf]">As seen in</p>
                <div className="flex flex-wrap justify-center items-center gap-10 text-[#c7d7bf] text-2xl md:text-3xl font-semibold">
                    <span className="font-serif tracking-widest">VOGUE</span>
                    <span className="font-serif">Forbes</span>
                    <span className="font-sans font-bold">THOUGHT<br />CATALOG</span>
                    <span className="font-serif">Women’sHealth</span>
                    <span className="font-sans font-extrabold text-3xl">WWD</span>
                </div>
            </div>
        </section>
    );
}
