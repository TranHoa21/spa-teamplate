// app/api/products/[id]/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const product = await prisma.product.findUnique({
            where: { id: params.id },
        });

        if (!product) {
            return NextResponse.json({ error: 'Sản phẩm không tồn tại' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Lỗi khi lấy sản phẩm' }, { status: 500 });
    }
}

// ✅ API CẬP NHẬT SẢN PHẨM
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
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
            where: { id: params.id },
            data: {
                name,
                description,
                price: parseFloat(price),
                imageUrl: uploadedUrls[0] || undefined, // Nếu có ảnh mới thì cập nhật
            },
        });

        return NextResponse.json({ success: true, product: updatedProduct }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Lỗi khi cập nhật sản phẩm' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const productId = params.id;
        console.log("Xóa sản phẩm với ID:", productId); // ✅ Debug ID

        if (!productId) {
            console.error("Lỗi: Thiếu ID sản phẩm");
            return NextResponse.json({ error: 'Thiếu ID sản phẩm' }, { status: 400 });
        }

        const product = await prisma.product.findUnique({ where: { id: productId } });

        if (!product) {
            console.error("Lỗi: Sản phẩm không tồn tại");
            return NextResponse.json({ error: 'Sản phẩm không tồn tại' }, { status: 404 });
        }

        // ✅ Xóa tất cả ảnh của sản phẩm trong ProductImage trước
        await prisma.productImage.deleteMany({
            where: { productId: productId },
        });

        // ✅ Sau đó xóa sản phẩm
        await prisma.product.delete({ where: { id: productId } });

        return NextResponse.json({ success: true, message: 'Xóa sản phẩm thành công' }, { status: 200 });
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        return NextResponse.json({ error: 'Lỗi khi xóa sản phẩm' }, { status: 500 });
    }
}
