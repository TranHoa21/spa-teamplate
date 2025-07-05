'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Zone = {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
};

export default function AdminZonesPage() {
    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchZones = async () => {
            try {
                const res = await fetch('/api/zone');
                const data = await res.json();
                setZones(data.zones || []);
            } catch (err) {
                console.error('Failed to load zones:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchZones();
    }, []);

    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Are you sure you want to delete this zone?');
        if (!confirm) return;

        try {
            const res = await fetch(`/api/zone/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
            setZones((prev) => prev.filter((zone) => zone.id !== id));
        } catch (err) {
            console.log("check err", err)
            alert('Error deleting zone.');
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Zones</h1>
                <button
                    onClick={() => router.push('/admin/zone/create')}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                >
                    + New Zone
                </button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : zones.length === 0 ? (
                <p className="text-gray-500">No zones found.</p>
            ) : (
                <div className="bg-white shadow rounded-xl overflow-hidden">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Slug</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Created At</th>
                                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zones.map((zone) => (
                                <tr key={zone.id} className="border-t">
                                    <td className="px-6 py-4">{zone.name}</td>
                                    <td className="px-6 py-4">{zone.slug}</td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(zone.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => router.push(`/admin/zone/${zone.slug}`)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(zone.id)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
