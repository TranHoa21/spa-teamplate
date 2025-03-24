// app/api/posts/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { parseForm } from '@/lib/parseForm';
import { IncomingMessage } from 'http';
import slugify from 'slugify';
// GET tất cả bài viết
export async function GET() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(posts);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

// POST bài viết mới
export async function POST(req: NextRequest) {
    try {
        const nodeReq: IncomingMessage | undefined = (req as unknown as { node?: { req?: IncomingMessage } }).node?.req;
        if (!nodeReq) {
            throw new Error('Không thể lấy request gốc từ node');
        }

        const { fields, files } = await parseForm(nodeReq);

        if (!fields.title || !fields.content) {
            return NextResponse.json({ error: 'Tiêu đề và nội dung không được để trống' }, { status: 400 });
        }

        const title = Array.isArray(fields.title) ? fields.title[0] : fields.title ?? '';
        const slug = slugify(title, { lower: true, strict: true });
        const uploadedUrls: string[] = [];

        if (files.image) {
            const fileArray = Array.isArray(files.image) ? files.image : [files.image];
            for (const file of fileArray) {
                if (!file?.filepath) continue;
                const upload = await cloudinary.uploader.upload(file.filepath, { folder: 'posts' });
                uploadedUrls.push(upload.secure_url);
            }
        }

        const newPost = await prisma.post.create({
            data: {
                title: Array.isArray(fields.title) ? fields.title[0] : fields.title ?? "",
                slug: slug,
                content: Array.isArray(fields.content) ? fields.content[0] : fields.content ?? "",
                imageUrl: uploadedUrls[0] || null,
                contentImages: uploadedUrls,
                metaTitle: String(Array.isArray(fields.metaTitle) ? fields.metaTitle[0] : fields.metaTitle || fields.title || ''),
                metaDescription: Array.isArray(fields.metaDescription)
                    ? fields.metaDescription[0] || ''
                    : fields.metaDescription ?? '',

                keywords: Array.isArray(fields.keywords)
                    ? fields.keywords[0] || ''
                    : fields.keywords ?? '',
                published: Array.isArray(fields.published)
                    ? fields.published[0] === 'true'
                    : fields.published === 'true',

                publishedAt: Array.isArray(fields.published)
                    ? (fields.published[0] === 'true' ? new Date() : null)
                    : (fields.published === 'true' ? new Date() : null),

                views: 0,
            },
        });

        return NextResponse.json({ success: true, post: newPost }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Lỗi khi tạo bài viết' }, { status: 500 });
    }
}

