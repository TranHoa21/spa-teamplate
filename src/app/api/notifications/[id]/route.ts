// app/api/notifications/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET chi tiết thông báo theo ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const notification = await prisma.notification.findUnique({
            where: { id: params.id },
            include: { order: true },
        });

        if (!notification) {
            return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
        }

        return NextResponse.json(notification);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to get notification' }, { status: 500 });
    }
}

// PUT cập nhật (ví dụ: đánh dấu đã đọc)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const updatedNotification = await prisma.notification.update({
            where: { id: params.id },
            data,
        });
        return NextResponse.json(updatedNotification);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
    }
}

// DELETE thông báo
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.notification.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500 });
    }
}
