'use client';

import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import AdminSidebar from "@/components/admin/layout/AdminSidebar"
interface DecodedToken {
    userId: string;
    role: 'ADMIN' | 'CUSTOMER';
    exp?: number;
    iat?: number;
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const decoded = jwt.decode(token) as DecodedToken;
            if (decoded?.role !== 'ADMIN') {
                router.push('/login');
                return;
            }

            setAuthorized(true);
        } catch (err) {
            console.error('Token lỗi:', err);
            router.push('/');
        }
    }, []);

    if (!authorized) return null;

    return (
        <html lang="en">
            <body>
                {/* Layout riêng cho admin */}
                <div className="flex min-h-screen bg-[#f9f9f9]">
                    <AdminSidebar />
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </body>
        </html>
    );
}
