'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

type Park = {
    id: string
    name: string
    slug: string
    image: string
    description: string
    location: string
    zone: {
        name: string
    }
}

export default function ParkDetailPage() {
    const { slug } = useParams() as { slug: string }
    const [park, setPark] = useState<Park | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPark = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/park/${slug}`)
                if (!res.ok) {
                    setPark(null)
                    return
                }
                const data = await res.json()
                setPark(data.park) // ⚠️ lưu ý: phải là `data.park` chứ không phải `data`
            } catch (error) {
                console.log("Lỗi khi fetch công viên: ", error)
                setPark(null)
            } finally {
                setLoading(false)
            }
        }

        if (slug) fetchPark()
    }, [slug])

    if (loading) return <p className="p-6 text-center text-gray-500">Đang tải công viên...</p>
    if (!park) return <p className="p-6 text-center text-red-600">Không tìm thấy công viên.</p>

    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-extrabold text-gray-800">{park.name}</h1>
                    <p className="text-lg text-gray-500 italic">Nằm trong khu vực: {park.zone?.name}</p>
                </div>

                <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                    <Image
                        src={park.image}
                        alt={park.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 prose max-w-none">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Giới thiệu</h2>
                        <div dangerouslySetInnerHTML={{ __html: park.description }} />
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700">📍 Thông tin</h3>
                        <p><strong>Tên:</strong> {park.name}</p>
                        <p><strong>Khu vực:</strong> {park.zone?.name}</p>
                        <p><strong>Địa điểm:</strong> {park.location}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
