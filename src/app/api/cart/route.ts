// app/api/cart/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // 👉 Tìm cart theo userId (có thể là null)
    const existingCart = await prisma.cart.findFirst({
        where: {
            userId: userId ?? null,
        },
        include: {
            items: {
                include: { product: true },
            },
        },
    });

    // Nếu đã có cart thì trả về
    if (existingCart) {
        return NextResponse.json(existingCart);
    }

    // 👉 Nếu chưa có, tạo mới cart cho user hoặc guest
    const newCart = await prisma.cart.create({
        data: {
            userId: userId ?? null,
        },
        include: {
            items: {
                include: { product: true },
            },
        },
    });

    return NextResponse.json(newCart);
}
export async function POST() {
    const cart = await prisma.cart.create({
        data: {
            userId: null // hoặc truyền userId nếu có
        }
    });

    return NextResponse.json(cart);
}
