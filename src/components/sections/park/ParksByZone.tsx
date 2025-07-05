'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Park = {
    id: string
    name: string
    slug: string
    image: string
    description: string
    zone: {
        name: string
    }
}

export default function ParksByZone() {
    const [groupedParks, setGroupedParks] = useState<Record<string, Park[]>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchParks() {
            try {
                const res = await fetch('/api/park')
                const data: Park[] = await res.json()

                const grouped: Record<string, Park[]> = {}
                data.forEach(park => {
                    const zoneName = park.zone?.name || 'Unknown Zone'
                    if (!grouped[zoneName]) grouped[zoneName] = []
                    grouped[zoneName].push(park)
                })

                setGroupedParks(grouped)
                setLoading(false)
            } catch (err) {
                console.error('Failed to fetch parks:', err)
                setLoading(false)
            }
        }

        fetchParks()
    }, [])

    if (loading) return <p className="text-center py-20">Loading parks...</p>

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 space-y-16">
                {Object.entries(groupedParks).map(([zone, parks]) => (
                    <div key={zone}>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">{zone}</h2>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {parks.map((park) => (
                                <div key={park.id} className="bg-white shadow rounded-xl overflow-hidden">
                                    <div className="relative w-full h-48">
                                        <Image
                                            src={park.image}
                                            alt={park.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{park.name}</h3>
                                        <p
                                            className="text-sm text-gray-600 mb-4 line-clamp-3"
                                            dangerouslySetInnerHTML={{
                                                __html: park.description.replace(/<[^>]+>/g, '').slice(0, 100) + '...',
                                            }}
                                        />
                                        <Link
                                            href={`/parks/${park.slug}`}
                                            className="text-green-700 font-semibold text-sm hover:underline"
                                        >
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
