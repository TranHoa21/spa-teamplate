// app/api/posts/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET bài viết theo ID
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const post = await prisma.post.findUnique({
            where: { id: params.id },
        });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

// PUT - Cập nhật bài viết
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const updatedPost = await prisma.post.update({
            where: { id: params.id },
            data,
        });
        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

// DELETE bài viết
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.post.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
