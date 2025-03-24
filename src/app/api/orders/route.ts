// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                designRequest: true,
            },
        });
        return NextResponse.json(orders);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const {
            name,
            email,
            phone,
            address,
            paymentMethod,
            productId,
            quantity,
            totalPrice,
            imageUrl,
            drawStyle,
            font,
            customText,
            designType,
        } = data;

        // Kiểm tra các trường bắt buộc
        if (!name || !email || !phone || !address || !paymentMethod || !productId || !quantity || !totalPrice || !imageUrl || !designType) {
            return NextResponse.json(
                { error: "Thiếu thông tin bắt buộc của đơn hàng." },
                { status: 400 }
            );
        }

        const newOrder = await prisma.order.create({
            data: {
                name,
                phone,
                email,
                address,
                paymentMethod,
                productId,
                quantity,
                totalPrice,
                imageUrl,
                drawStyle: drawStyle || null,
                font: font || null,
                customText: customText || null,
                designType,
            },
        });

        return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
    } catch (err) {
        console.error("Lỗi tạo đơn hàng:", err);
        return NextResponse.json(
            { error: "Lỗi khi tạo đơn hàng" },
            { status: 500 }
        );
    }
}