'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SignupPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Đăng ký thất bại');
                return;
            }

            setSuccess('Đăng ký thành công!');
            router.push('/login');
        } catch (err) {
            console.error(err);
            setError('Lỗi kết nối máy chủ');
        }
    };

    return (
        <div className="relative w-full h-screen flex items-center justify-center bg-[#15394c] bg-opacity-70">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#07273c] text-white rounded-lg p-8 w-full max-w-md shadow-lg relative"
            >
                <button className="absolute top-4 right-4 text-white" onClick={() => router.push('/')}>
                    ✕
                </button>

                <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

                <form onSubmit={handleSignup} className="flex flex-col space-y-4">
                    {error && <p className="text-red-400 text-center">{error}</p>}
                    {success && <p className="text-green-400 text-center">{success}</p>}

                    <input
                        type="email"
                        placeholder="Enter email"
                        className="w-full px-4 py-2 rounded bg-transparent border border-gray-400 placeholder-gray-400 focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="w-full px-4 py-2 rounded bg-transparent border border-gray-400 placeholder-gray-400 focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full px-4 py-2 rounded bg-transparent border border-gray-400 placeholder-gray-400 focus:outline-none"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded transition"
                    >
                        SIGN UP
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    Already have an account?{' '}
                    <button
                        type="button"
                        onClick={() => router.push('/login')}
                        className="text-orange-400 hover:underline"
                    >
                        Login
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
