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
            include: {
                images: true, // ✅ Lấy danh sách ảnh phụ của sản phẩm
            },
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
export async function PUT(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop(); // Lấy ID từ URL

        if (!id) {
            return NextResponse.json({ error: 'Thiếu ID sản phẩm' }, { status: 400 });
        }

        const formData = await req.formData();

        // ✅ Lấy dữ liệu từ form
        const name = formData.get('name') as string | null;
        const description = formData.get('description') as string | null;
        const price = formData.get('price') as string | null;
        const originalPrice = formData.get('originalPrice') as string | null;
        const rating = formData.get('rating') as string | null;

        if (!name || !price || !description) {
            return NextResponse.json({ error: 'Thiếu thông tin sản phẩm' }, { status: 400 });
        }

        // ✅ Xử lý ảnh đại diện (nếu có)
        let newImageUrl = null;
        const mainImage = formData.get('image') as File | null;
        if (mainImage && mainImage.type.startsWith('image/')) {
            const arrayBuffer = await mainImage.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const upload = await cloudinary.uploader.upload(`data:${mainImage.type};base64,${buffer.toString('base64')}`, {
                folder: 'products',
            });
            newImageUrl = upload.secure_url;
        }

        // ✅ Xử lý ảnh phụ (nếu có)
        const uploadedUrls: string[] = [];
        const newImages = formData.getAll('image') as File[];
        for (const file of newImages) {
            if (file && file.type.startsWith('image/')) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const upload = await cloudinary.uploader.upload(`data:${file.type};base64,${buffer.toString('base64')}`, {
                    folder: 'products',
                });
                uploadedUrls.push(upload.secure_url);
            }
        }

        // ✅ Cập nhật sản phẩm trong database
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price: parseFloat(price),
                originalPrice: originalPrice ? parseFloat(originalPrice) : null,
                rating: rating ? parseFloat(rating) : null,
                imageUrl: newImageUrl || undefined, // Giữ ảnh cũ nếu không có ảnh mới
            },
        });

        // ✅ Xóa ảnh phụ cũ & thêm ảnh mới nếu có
        if (uploadedUrls.length > 0) {
            await prisma.productImage.deleteMany({ where: { productId: id } });

            await Promise.all(
                uploadedUrls.map((url) =>
                    prisma.productImage.create({
                        data: {
                            url,
                            productId: id,
                        },
                    })
                )
            );
        }

        return NextResponse.json({ success: true, product: updatedProduct }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Lỗi khi cập nhật sản phẩm' }, { status: 500 });
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
