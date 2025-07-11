'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Cormorant_Garamond } from 'next/font/google'

const products = [
    '/images/product1.png',
    '/images/product2.png',
    '/images/product3.png',
]

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
})

export default function HeroSection() {
    const [current, setCurrent] = useState(0)
    const [hasMounted, setHasMounted] = useState(false)

    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % products.length)
    }

    const handlePrev = () => {
        setCurrent((prev) => (prev - 1 + products.length) % products.length)
    }

    useEffect(() => {
        setHasMounted(true)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext()
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    if (!hasMounted) return null // ✅ Ngăn lỗi hydration

    return (
        <section className="relative w-full min-h-[110vh] overflow-visible flex items-center justify-center">
            {/* Background split layout for desktop */}
            <div className="absolute inset-0 z-0 hidden md:flex">
                <div className="w-1/2 bg-[#899f87]" />
                <div
                    className="w-1/2 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/background-banner.png')" }}
                />
            </div>

            {/* Full background for mobile */}
            <div
                className="absolute inset-0 z-0 md:hidden bg-cover bg-center"
                style={{ backgroundImage: "url('/images/background-banner.png')" }}
            />

            {/* Text and button – Desktop */}
            <div className="hidden md:flex absolute inset-0 z-10 items-center justify-center">
                <div className="text-white text-center px-6">
                    <h1 className={`${cormorant.className} text-7xl leading-tight mb-6`}>
                        Let nature take <br />
                        care of your body <br />
                        and soul
                    </h1>
                    <button className="bg-white text-black px-8 py-3 font-medium hover:bg-gray-200 transition">
                        Shop now →
                    </button>
                </div>
            </div>

            {/* Text and button – Mobile */}
            <div className="md:hidden absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center text-white">
                <h1 className={`${cormorant.className} text-3xl leading-snug mb-4`}>
                    Let nature take <br />
                    care of your <br />
                    body and soul
                </h1>
                <button className="bg-white text-black px-6 py-2 font-medium rounded hover:bg-gray-200 transition">
                    Shop now →
                </button>
            </div>

            {/* Product image – responsive position */}
            <div
                className={clsx(
                    'absolute z-20',
                    'bottom-[-80px] md:left-[20%] md:-translate-x-1/2',
                    'left-1/2 -translate-x-1/2' // Mobile center
                )}
            >
                <div className="relative w-[160px] h-[280px] md:w-[340px] md:h-[620px]">
                    <Image
                        src={products[current]}
                        alt="product"
                        fill
                        className="object-contain transition duration-500 ease-in-out"
                    />
                </div>

                {/* Slider controls – Mobile */}
                <div className="flex md:hidden mt-4 items-center justify-center gap-4 text-white z-30">
                    <button onClick={handlePrev} className="text-xl">←</button>
                    <div className="flex gap-1">
                        {products.map((_, index) => (
                            <div
                                key={index}
                                className={clsx(
                                    'w-2 h-2 rounded-full',
                                    index === current ? 'bg-white' : 'bg-white/50'
                                )}
                            />
                        ))}
                    </div>
                    <button onClick={handleNext} className="text-xl">→</button>
                </div>
            </div>

            {/* Slider controls – Desktop */}
            <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6 text-white">
                <button onClick={handlePrev} className="text-2xl">←</button>
                <div className="flex flex-col gap-2">
                    {products.map((_, index) => (
                        <div
                            key={index}
                            className={clsx(
                                'w-2 h-2 rounded-full',
                                index === current ? 'bg-white' : 'bg-white/50'
                            )}
                        />
                    ))}
                </div>
                <button onClick={handleNext} className="text-2xl">→</button>
            </div>
        </section>
    )
}
