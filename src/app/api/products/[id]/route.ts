import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// ✅ Lấy sản phẩm theo ID
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop(); // Lấy ID từ URL

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID sản phẩm' }, { status: 400 });
        }

        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            return NextResponse.json({ error: 'Sản phẩm không tồn tại' }, { status: 404 });
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

// ✅ Cập nhật sản phẩm
export async function PUT(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID sản phẩm' }, { status: 400 });
        }

        const formData = await req.formData();

        const name = formData.get('name') as string | null;
        const description = formData.get('description') as string | null;
        const price = formData.get('price') as string | null;

        if (!name || !price || !description) {
            return NextResponse.json({ error: 'Thiếu thông tin sản phẩm' }, { status: 400 });
        }

        const uploadedUrls: string[] = [];

        // ✅ Xử lý upload ảnh mới lên Cloudinary
        const imageFiles = formData.getAll('image') as File[];
        for (const file of imageFiles) {
            if (file) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const upload = await cloudinary.uploader.upload(`data:${file.type};base64,${buffer.toString('base64')}`, {
                    folder: 'products',
                });

                uploadedUrls.push(upload.secure_url);
            }
        }

        // ✅ Cập nhật dữ liệu sản phẩm
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price: parseFloat(price),
                imageUrl: uploadedUrls[0] || undefined, // Nếu có ảnh mới thì cập nhật
            },
        });

        return NextResponse.json({ success: true, product: updatedProduct }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}

// ✅ Xóa sản phẩm
export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID sản phẩm' }, { status: 400 });
        }

        const product = await prisma.product.findUnique({ where: { id } });

        if (!product) {
            return NextResponse.json({ error: 'Sản phẩm không tồn tại' }, { status: 404 });
        }

        // ✅ Xóa tất cả ảnh của sản phẩm trong ProductImage trước
        await prisma.productImage.deleteMany({ where: { productId: id } });

        // ✅ Sau đó xóa sản phẩm
        await prisma.product.delete({ where: { id } });

        return NextResponse.json({ success: true, message: 'Xóa sản phẩm thành công' }, { status: 200 });
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
    }
}
