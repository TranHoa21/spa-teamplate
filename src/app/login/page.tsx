'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Đăng nhập thất bại');
                return;
            }

            localStorage.setItem('token', data.token);
            router.push('/admin'); // điều hướng về admin
        } catch (err) {
            console.log("check lỗi ", err)
            setError('Lỗi kết nối máy chủ');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-[#FFF1E6] px-4">
            <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center text-[#FF6B6B] mb-6">Đăng nhập Admin</h2>

                {error && <p className="text-red-600 mb-3 text-sm">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border px-4 py-2 mb-4 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="w-full border px-4 py-2 mb-4 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-[#FF6B6B] text-white py-2 rounded hover:bg-[#e95b5b] transition"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}
