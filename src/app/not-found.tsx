// app/not-found.tsx
'use client';
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-white to-pink-100">
            {/* Hiệu ứng ánh sáng nền */}
            <div className="absolute w-[30rem] h-[30rem] bg-pink-300 rounded-full opacity-30 blur-[120px] animate-pulse -z-10 top-10 left-10" />
            <div className="absolute w-[30rem] h-[30rem] bg-blue-300 rounded-full opacity-30 blur-[120px] animate-pulse -z-10 bottom-10 right-10" />

            <motion.h1
                className="text-6xl font-extrabold text-gray-800 mb-4 drop-shadow-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                404
            </motion.h1>

            <motion.p
                className="text-2xl text-gray-600 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Trang bạn tìm không tồn tại 🐚
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Link
                    href="/"
                    className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-md"
                >
                    Quay lại trang chủ
                </Link>
            </motion.div>
        </div>
    );
}
