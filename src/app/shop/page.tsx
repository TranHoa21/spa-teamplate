'use client';
import ProductsSlider from "@/components/sections/home/ProductsSlider"
import Link from "next/link";

export default function ProductDetailPage() {


    return (
        <>
            <div
                className="text-center text-white py-24"
                style={{
                    backgroundImage: `url(/images/bg1.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <h1 className="text-4xl font-bold mb-4">Appointment</h1>
                <h6 className="text-sm">
                    <Link href="/" className="hover:underline">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/shop" className="hover:underline">Shop</Link>
                </h6>
            </div>
            <ProductsSlider />
        </>
    );
}
