import { prisma } from "@/lib/prisma"; // Đảm bảo Prisma được kết nối
import { OrderStatus } from "@prisma/client";

export async function saveOrderToDatabase(orderData: {
    orderId: string;
    productId: string;
    productName: string;
    imageUrl: string;
    quantity: number;
    totalPrice: number;
    status: OrderStatus;
    transactionNo: string | null;
    paymentTime?: string;
    designType: string;
    drawStyle?: string | null;
    font?: string | null;
    customText?: string | null;
    selectedOption?: string | null;
    name: string;
    phone: string;
    email: string;
    address: string;
    paymentMethod: string;
}) {
    try {
        return await prisma.order.create({
            data: {
                id: orderData.orderId,
                productId: orderData.productId,
                productName: orderData.productName,
                imageUrl: orderData.imageUrl,
                quantity: orderData.quantity,
                totalPrice: orderData.totalPrice,
                status: orderData.status,
                transactionNo: orderData.transactionNo,
                paymentTime: orderData.paymentTime ? new Date(orderData.paymentTime) : null, // Chỉ lưu nếu có
                designType: orderData.designType,
                drawStyle: orderData.drawStyle,
                font: orderData.font,
                customText: orderData.customText,
                selectedOption: orderData.selectedOption, // ✅ Lưu kích thước túi/cốc hoặc dòng điện thoại
                name: orderData.name,
                phone: orderData.phone,
                email: orderData.email,
                address: orderData.address,
                paymentMethod: orderData.paymentMethod,
            },
        });
    } catch (error) {
        console.error("Lỗi khi lưu đơn hàng vào database:", error);
        throw new Error("Không thể lưu đơn hàng.");
    }
}
