import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const id = Number(url.pathname.split("/").pop());

        if (isNaN(id)) {
            return NextResponse.json({ error: "ID đơn hàng không hợp lệ." }, { status: 400 });
        }

        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: { name: true }
                        }
                    }
                }
            }
        });

        if (!order) {
            return NextResponse.json({ error: "Không tìm thấy đơn hàng." }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            order: {
                ...order,
                orderItems: order.orderItems.map((item) => ({
                    ...item,
                    productName: item.product?.name || "Không xác định",
                })),
            },
        });
    } catch (err) {
        console.error("Lỗi khi lấy đơn hàng:", err);
        return NextResponse.json({ error: "Lỗi khi lấy thông tin đơn hàng." }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const { id, ...updateFields } = data;

        if (!id) {
            return NextResponse.json({ error: "Thiếu ID đơn hàng." }, { status: 400 });
        }

        const orderId = parseInt(id, 10);
        if (isNaN(orderId)) {
            return NextResponse.json({ error: "ID đơn hàng không hợp lệ." }, { status: 400 });
        }

        const existingOrder = await prisma.order.findUnique({ where: { id: orderId } });
        if (!existingOrder) {
            return NextResponse.json({ error: "Không tìm thấy đơn hàng." }, { status: 404 });
        }

        // Trường cho phép cập nhật
        const allowedFields = ["status", "name", "email", "phone", "totalPrice", "address", "paymentMethod"];
        const validUpdateFields = Object.fromEntries(
            Object.entries(updateFields).filter(([key, value]) =>
                value !== undefined &&
                value !== null &&
                allowedFields.includes(key) &&
                existingOrder[key as keyof typeof existingOrder] !== value
            )
        );

        if (Object.keys(validUpdateFields).length === 0) {
            return NextResponse.json({ message: "Không có thay đổi nào." }, { status: 200 });
        }

        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: validUpdateFields,
        });

        return NextResponse.json({ success: true, order: updatedOrder }, { status: 200 });
    } catch (err) {
        console.error("Lỗi cập nhật đơn hàng:", err);
        return NextResponse.json({ error: "Lỗi khi cập nhật đơn hàng" }, { status: 500 });
    }
}
export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();
        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID đơn hàng' }, { status: 400 });
        }

        const orderId = parseInt(id, 10);
        if (isNaN(orderId)) {
            return NextResponse.json({ error: 'ID đơn hàng không hợp lệ' }, { status: 400 });
        }

        // Xoá các OrderItem trước (nếu ON DELETE CASCADE chưa được set trong db)
        await prisma.orderItem.deleteMany({ where: { orderId } });

        await prisma.order.delete({ where: { id: orderId } });

        return NextResponse.json({ message: 'Đã xóa đơn hàng thành công' }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi xóa đơn hàng:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}