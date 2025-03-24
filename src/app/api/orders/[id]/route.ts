// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const order = await prisma.order.findUnique({
            where: { id: params.id },
            include: {
                user: true,
                designRequest: true,
            },
        });

        if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

        return NextResponse.json(order);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const updatedOrder = await prisma.order.update({
            where: { id: params.id },
            data,
        });
        return NextResponse.json(updatedOrder);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.order.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Order deleted' });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
}
