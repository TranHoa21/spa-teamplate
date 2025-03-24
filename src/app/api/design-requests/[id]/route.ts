// app/api/design-requests/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET chi tiết
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const request = await prisma.designRequest.findUnique({
            where: { id: params.id },
            include: { order: true },
        });

        if (!request) {
            return NextResponse.json({ error: 'Design request not found' }, { status: 404 });
        }

        return NextResponse.json(request);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch design request' }, { status: 500 });
    }
}

// PUT cập nhật
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const updated = await prisma.designRequest.update({
            where: { id: params.id },
            data,
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update design request' }, { status: 500 });
    }
}

// DELETE
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.designRequest.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Design request deleted successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete design request' }, { status: 500 });
    }
}
