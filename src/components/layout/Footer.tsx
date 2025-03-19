import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#F5F5DC] text-[#2A2A2A] text-sm py-6 mt-16">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    © 2025 Vẽ Ảnh Chân Dung • All rights reserved
                </div>
                <div className="flex gap-4">
                    <Link href="#" className="hover:text-[#E67E22] transition">Chính sách</Link>
                    <Link href="#" className="hover:text-[#E67E22] transition">Facebook</Link>
                    <Link href="#" className="hover:text-[#E67E22] transition">Hotline</Link>
                </div>
            </div>
        </footer>
    );
}
