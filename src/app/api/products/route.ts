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
        const originalPrice = formData.get('originalPrice') as string | null;
        const sale = formData.get('sale') === 'true';
        const rating = formData.get('rating') as string | null;
        const slug = formData.get('slug') as string | null;

        if (!name || !price || !description || !originalPrice || !slug) {
            return NextResponse.json({ error: 'Thiếu thông tin sản phẩm' }, { status: 400 });
        }

        let imageUrl = null;
        const uploadedUrls: string[] = [];

        // ✅ Xử lý upload ảnh đại diện lên Cloudinary
        const mainImage = formData.get('imageUrl') as File | null;
        if (mainImage) {
            const arrayBuffer = await mainImage.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const upload = await cloudinary.uploader.upload(`data:${mainImage.type};base64,${buffer.toString('base64')}`, {
                folder: 'products',
            });
            imageUrl = upload.secure_url; // ✅ Lưu ảnh đại diện
        }

        // ✅ Xử lý upload ảnh phụ lên Cloudinary
        const imageFiles = formData.getAll('images') as File[];
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

        // ✅ Thêm sản phẩm vào database
        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                originalPrice: parseFloat(originalPrice),
                sale,
                rating: rating ? parseFloat(rating) : null,
                slug,
                imageUrl, // ✅ Lưu ảnh đại diện chính
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
