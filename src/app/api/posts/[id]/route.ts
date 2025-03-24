import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET bài viết theo ID
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop(); // Lấy ID từ URL

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID bài viết' }, { status: 400 });
        }

        const post = await prisma.post.findUnique({
            where: { id },
        });

        if (!post) {
            return NextResponse.json({ error: 'Không tìm thấy bài viết' }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi lấy bài viết:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

// PUT - Cập nhật bài viết
export async function PUT(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID bài viết' }, { status: 400 });
        }

        const data = await req.json();

        const updatedPost = await prisma.post.update({
            where: { id },
            data,
        });

        return NextResponse.json(updatedPost, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi cập nhật bài viết:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

// DELETE - Xóa bài viết
export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID bài viết' }, { status: 400 });
        }

        await prisma.post.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Đã xóa bài viết thành công' }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi xóa bài viết:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}
