"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
type Park = {
    id: string;
    name: string;
    location: string;
    description: string;
    image: string;
    slug: string;
    zone: {
        name: string;
    };
};

export default function ParkListPage() {
    const [parks, setParks] = useState<Park[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParks = async () => {
            try {
                const res = await fetch("/api/park");
                const data = await res.json();
                setParks(data);
            } catch (error) {
                console.error("Error fetching parks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchParks();
    }, []);

    if (loading) return <p className="text-center mt-10">Đang tải dữ liệu công viên...</p>;

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">📋 Danh sách Công viên</h1>
                <Link href="/admin/parks/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    ➕ Tạo mới
                </Link>
            </div>

            {parks.length === 0 ? (
                <p className="text-gray-500">Chưa có công viên nào được tạo.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {parks.map((park) => (
                        <div key={park.id} className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                            {park.image && (
                                <Image
                                    src={park.image}
                                    alt={park.name}
                                    width={400} // hoặc kích thước tùy chọn
                                    height={192} // tỷ lệ 16:9 cho h-48 (48 * 4 = 192px)
                                    className="w-full h-48 object-cover"
                                    unoptimized // 👈 nếu là ảnh từ external URL, chưa được config trong next.config.js
                                />)}
                            <div className="p-4 space-y-2">
                                <h2 className="text-xl font-bold text-gray-900">{park.name}</h2>
                                <p className="text-gray-600">📍 {park.location}</p>
                                <p className="text-sm text-gray-500">Zone: {park.zone?.name || "Không có"}</p>
                                <Link
                                    href={`/admin/parks/${park.slug}`}
                                    className="inline-block mt-2 text-blue-600 hover:underline font-medium"
                                >
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
