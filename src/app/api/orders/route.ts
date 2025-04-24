// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import cloudinary from '@/lib/cloudinary';
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        const whereClause = userId ? { userId } : undefined;

        const orders = await prisma.order.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: { name: true },
                        },
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            orders: orders.map((order) => ({
                ...order,
                orderItems: order.orderItems.map((item) => ({
                    ...item,
                    productName: item.product?.name || "Không xác định",
                })),
            })),
        });
    } catch (err) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", err);
        return NextResponse.json(
            { error: "Lỗi khi lấy danh sách đơn hàng." },
            { status: 500 }
        );
    }
}


export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const address = formData.get("address") as string;
        const paymentMethod = formData.get("paymentMethod") as string;
        const totalPrice = formData.get("totalPrice") as string;
        const itemsJson = formData.get("items") as string;

        if (!name || !email || !phone || !address || !paymentMethod || !totalPrice || !itemsJson) {
            return NextResponse.json({ error: "Thiếu thông tin bắt buộc của đơn hàng." }, { status: 400 });
        }

        const items = JSON.parse(itemsJson);

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: "Danh sách sản phẩm không hợp lệ." }, { status: 400 });
        }

        // Tạo đơn hàng trước
        const newOrder = await prisma.order.create({
            data: {
                name,
                phone,
                email,
                address,
                paymentMethod,
                totalPrice: parseFloat(totalPrice),
            },
        });

        // Upload ảnh từng sản phẩm và tạo order items
        for (const item of items) {
            const {
                productId,
                quantity,
                productName,
                designType,
                drawStyle,
                font,
                customText,
                selectedOption,
            } = item;

            let imageUrl = "";
            const imageFile = formData.get(item.imageFieldName) as File | null;

            if (imageFile) {
                const arrayBuffer = await imageFile.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const upload = await cloudinary.uploader.upload(
                    `data:${imageFile.type};base64,${buffer.toString("base64")}`,
                    { folder: "orders" }
                );
                imageUrl = upload.secure_url;
            }

            await prisma.orderItem.create({
                data: {
                    orderId: newOrder.id,
                    productId,
                    quantity: parseInt(quantity),
                    productName,
                    designType,
                    drawStyle,
                    font,
                    customText,
                    imageUrl,
                    selectedOption,
                },
            });
        }

        // Gửi thông báo
        await prisma.notification.create({
            data: {
                title: "🛒 Đơn hàng mới!",
                content: `Khách hàng ${name} vừa đặt hàng.`,
                userId: "a60284ea-625e-45a8-b6c8-40e851273581",
                orderId: newOrder.id,
            },
        });


        return NextResponse.json({ success: true, order: newOrder }, { status: 201 });
    } catch (err) {
        console.error("Lỗi tạo đơn hàng:", err);
        return NextResponse.json({ error: "Lỗi khi tạo đơn hàng" }, { status: 500 });
    }
}

