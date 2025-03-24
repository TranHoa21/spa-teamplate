import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// ✅ API GET: Lấy tất cả sản phẩm
export async function GET() {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json(products);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Lỗi khi lấy danh sách sản phẩm' }, { status: 500 });
    }
}

// ✅ API POST: Thêm sản phẩm mới
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        // ✅ Lấy dữ liệu từ form
        const name = formData.get('name') as string | null;
        const description = formData.get('description') as string | null;
        const price = formData.get('price') as string | null;

        if (!name || !price || !description) {
            return NextResponse.json({ error: 'Thiếu thông tin sản phẩm' }, { status: 400 });
        }

        const uploadedUrls: string[] = [];

        // ✅ Xử lý upload ảnh lên Cloudinary
        const imageFiles = formData.getAll('image') as File[];
        for (const file of imageFiles) {
            if (file) {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Upload ảnh lên Cloudinary
                const upload = await cloudinary.uploader.upload(`data:${file.type};base64,${buffer.toString('base64')}`, {
                    folder: 'products',
                });
                uploadedUrls.push(upload.secure_url);
            }
        }

        // ✅ Thêm sản phẩm vào database
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                imageUrl: uploadedUrls[0] || null, // Ảnh đại diện chính
            },
        });

        // ✅ Lưu các ảnh phụ vào bảng productImage
        await Promise.all(
            uploadedUrls.map((url) =>
                prisma.productImage.create({
                    data: {
                        url,
                        productId: newProduct.id,
                    },
                })
            )
        );

        return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Lỗi khi tạo sản phẩm' }, { status: 500 });
    }
}
