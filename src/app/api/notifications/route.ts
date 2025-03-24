// app/api/notifications/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET tất cả thông báo
export async function GET() {
    try {
        const notifications = await prisma.notification.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                order: true, // nếu bạn muốn kèm thông tin đơn hàng liên quan
            },
        });
        return NextResponse.json(notifications);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
    }
}

// POST tạo thông báo mới
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const newNotification = await prisma.notification.create({
            data,
        });
        return NextResponse.json(newNotification, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
    }
}
