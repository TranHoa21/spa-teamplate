// app/api/cart-item/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 👉 GET /api/cart-item?id=xyz
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Missing cart item id" }, { status: 400 });
    }

    const item = await prisma.cartItem.findUnique({
        where: { id },
        include: { product: true },
    });

    if (!item) {
        return NextResponse.json({ error: "CartItem not found" }, { status: 404 });
    }

    return NextResponse.json(item);
}

// 👉 PUT /api/cart-item  (body: { id, ...fields })
export async function PUT(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'ID không hợp lệ' }, { status: 400 });
        }

        const body = await req.json();

        const updatedCartItem = await prisma.cartItem.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(updatedCartItem);
    } catch (error) {
        console.error("Lỗi cập nhật cart item >>>", error);
        return NextResponse.json({ error: 'Lỗi cập nhật cart item' }, { status: 500 });
    }
}


// 👉 DELETE /api/cart-item?id=xyz
export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.pathname.split("/").pop();

        if (!id) {
            return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
        }

        await prisma.cartItem.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Xoá cart item thành công" });
    } catch (error) {
        console.error("Lỗi xoá cart item >>>", error);
        return NextResponse.json({ error: "Lỗi xoá cart item" }, { status: 500 });
    }
}
