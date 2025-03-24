import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        // 👉 Lấy params từ URL
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop(); // Lấy ID từ đường dẫn

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID đơn hàng' }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                designRequest: true,
            },
        });

        if (!order) {
            return NextResponse.json({ error: 'Không tìm thấy đơn hàng' }, { status: 404 });
        }

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi lấy đơn hàng:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        // 👉 Lấy params từ URL
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID đơn hàng' }, { status: 400 });
        }

        const data = await req.json();
        const updatedOrder = await prisma.order.update({
            where: { id },
            data,
        });

        return NextResponse.json(updatedOrder, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi cập nhật đơn hàng:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        // 👉 Lấy params từ URL
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID đơn hàng' }, { status: 400 });
        }

        await prisma.order.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Đã xóa đơn hàng thành công' }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi xóa đơn hàng:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}
