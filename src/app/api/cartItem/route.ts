// app/api/cart-item/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const cartId = searchParams.get("cartId");

    const items = await prisma.cartItem.findMany({
        where: cartId ? { cartId } : undefined,
        include: { product: true },
    });

    return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {
        cartId,
        productId,
        quantity,
        drawStyle,
        font,
        customText,
        selectedOption,
    } = body;

    const cartItem = await prisma.cartItem.create({
        data: {
            cartId,
            productId,
            quantity,
            drawStyle,
            font,
            customText,
            selectedOption,
        },
    });

    return NextResponse.json(cartItem);
}
