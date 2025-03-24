// app/api/design-requests/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// GET tất cả yêu cầu thiết kế
export async function GET() {
    try {
        const requests = await prisma.designRequest.findMany({
            orderBy: { createdAt: 'desc' },
            include: { order: true },
        });
        return NextResponse.json(requests);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch design requests' }, { status: 500 });
    }
}

// POST tạo yêu cầu mới
export async function POST(req: Request) {
    try {
        const data = await req.json();
        const newRequest = await prisma.designRequest.create({
            data,
        });
        return NextResponse.json(newRequest, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create design request' }, { status: 500 });
    }
}
