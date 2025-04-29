'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#15394c] text-white px-4 text-center">
            <motion.h1
                className="text-[120px] font-bold leading-none"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                404
            </motion.h1>

            <motion.h2
                className="text-2xl tracking-widest uppercase mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Page Not Found
            </motion.h2>

            <motion.p
                className="text-gray-300 mt-6 text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Sorry. We ca not seem to find the page you are looking for.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-10"
            >
                <Link
                    href="/"
                    className="relative inline-block px-10 py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition-all"
                >
                    <span className="absolute inset-0 transform rotate-3 scale-105 rounded-md bg-orange-500 opacity-20"></span>
                    BACK TO HOME
                </Link>
            </motion.div>
        </div>
    );
}
