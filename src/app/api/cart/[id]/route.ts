// app/api/cart/[cartId]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 👉 GET /api/cart/[cartId]
export async function GET(req: NextRequest) {
    const cartId = req.nextUrl.pathname.split("/").pop(); // Lấy cartId từ URL

    const cart = await prisma.cart.findUnique({
        where: { id: cartId },
        include: {
            items: {
                include: { product: true },
            },
        },
    });

    if (!cart) {
        return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(cart);
}

// 👉 PUT /api/cart/[cartId]
export async function PUT(req: NextRequest) {
    const cartId = req.nextUrl.pathname.split("/").pop();
    const body = await req.json();

    const updatedCart = await prisma.cart.update({
        where: { id: cartId },
        data: {
            userId: body.userId ?? null,
        },
    });

    return NextResponse.json(updatedCart);
}

// 👉 DELETE /api/cart/[cartId]
export async function DELETE(req: NextRequest) {
    const cartId = req.nextUrl.pathname.split("/").pop();

    try {
        await prisma.cart.delete({
            where: { id: cartId },
        });

        return NextResponse.json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.log("check err server >>>", error);
        return NextResponse.json({ error: "Error deleting cart" }, { status: 500 });
    }
}
