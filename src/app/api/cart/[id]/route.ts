// app/api/cart/[cartId]/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: {
        cartId: string;
    };
};

// 👉 GET /api/cart/[cartId]
export async function GET(_: NextRequest, { params }: Params) {
    const cart = await prisma.cart.findUnique({
        where: { id: params.cartId },
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
export async function PUT(req: NextRequest, { params }: Params) {
    const body = await req.json();

    const updatedCart = await prisma.cart.update({
        where: { id: params.cartId },
        data: {
            userId: body.userId ?? null,
        },
    });

    return NextResponse.json(updatedCart);
}

// 👉 DELETE /api/cart/[cartId]
export async function DELETE(_: NextRequest, { params }: Params) {
    try {
        await prisma.cart.delete({
            where: { id: params.cartId },
        });

        return NextResponse.json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.log("check err sever >>>", error)
        return NextResponse.json({ error: "Error deleting cart" }, { status: 500 });
    }
}
