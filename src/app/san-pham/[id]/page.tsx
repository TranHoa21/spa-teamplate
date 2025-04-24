'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ProductExtras from '@/components/sections/product/ProductExtras';
import SimilarProducts from '@/components/sections/product/SimilarProducts';
import { motion } from "framer-motion";

interface Product {
    id: string;
    name: string;
    imageUrl: string;
    images: { id: string; url: string }[];
    price: number;
    description: string;
    originalPrice?: number;
    extras?: {
        type: 'testimonial' | 'gallery';
        title: string;
        items: { image: string; name: string; message: string; rating: number }[];
    };
}
const reviewsData: Record<string, { name: string; rating: number; message: string }[]> = {
    "Ốp lưng vẽ chân dung": [
        { name: "Huyền Trân", rating: 5, message: "Sản phẩm rất đẹp, giống hệt hình vẽ!" },
        { name: "Minh Tuấn", rating: 4, message: "Ốp đẹp, nhưng thời gian giao hàng hơi lâu." },
        { name: "Lan Anh", rating: 5, message: "Chất lượng tuyệt vời, rất đáng tiền." }
    ],
    "Ốp lưng chibi": [
        { name: "Thành Đạt", rating: 5, message: "Hình chibi dễ thương, rất hài lòng." },
        { name: "Ngọc Mai", rating: 4, message: "Ốp đẹp nhưng hơi dày một chút." }
    ],
    "Túi tote vẽ chân dung": [
        { name: "Hoàng My", rating: 5, message: "Túi xinh quá, hình vẽ cực kỳ chi tiết!" },
        { name: "Văn Quân", rating: 5, message: "Dịch vụ tốt, vẽ đúng yêu cầu của mình." }
    ],
    "Cốc in ảnh": [
        { name: "Duy Khánh", rating: 4, message: "In đẹp, màu sắc khá chuẩn." },
        { name: "Thu Thảo", rating: 5, message: "Cốc dễ thương, sẽ mua thêm làm quà." }
    ]
};

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string; // Ép kiểu id về string
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [drawStyle, setDrawStyle] = useState('Màu');
    const [font, setFont] = useState('');
    const [printName, setPrintName] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [designType, setDesignType] = useState<'self' | 'request'>('request');
    const phoneModels = ["iPhone 14", "iPhone 13", "Samsung S23", "Oppo Reno8"];
    const bagSizes = ["Nhỏ", "Vừa", "Lớn"];
    const cupSizes = ["250ml", "350ml", "500ml"];
    const productReviews = product ? reviewsData[product.name] || [] : [];

    const getProductType = (name: string) => {
        if (name.includes("Ốp lưng")) return "case";
        if (name.includes("Túi") || name.includes("Cốc")) return "size";
        return null;
    };
    const productType = product ? getProductType(product.name) : null;
    const [selectedOption, setSelectedOption] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedProductImage, setSelectedProductImage] = useState<string>(product?.imageUrl || "");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [selectedUserImage, setSelectedUserImage] = useState<File | null>(null);
    const [activeTab, setActiveTab] = useState("details");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        async function fetchProduct() {
            if (!id) return; // Kiểm tra id hợp lệ trước khi fetch
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) throw new Error('Sản phẩm không tồn tại');
                const data: Product = await response.json();
                setProduct(data);
                setCurrentImageIndex(0);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (value: number) => {
        setQuantity(Math.max(1, value));
    };
    const handleNextImage = () => {
        if (!product?.images?.length) return;
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const handlePrevImage = () => {
        if (!product?.images?.length) return;
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Hiển thị preview ảnh
            setSelectedUserImage(file); // Lưu file vào state để gửi lên server

            const reader = new FileReader();
            reader.readAsDataURL(file); // ✅ Chỉ đọc file nếu file tồn tại
            reader.onloadend = () => {
                if (reader.result) {
                    localStorage.setItem("selectedUserImage", reader.result as string);
                }
            };
        }
    };
    const getOrCreateCart = async (userId: string) => {
        const res = await fetch(`/api/cart?userId=${userId}`);
        if (!res.ok) throw new Error('Không thể tạo hoặc lấy giỏ hàng');
        const cart = await res.json();
        return cart.id;
    };
    const handleAddToCart = async () => {
        if (!product) return;

        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        // 👇 Thêm đoạn này: Lấy ảnh base64 từ localStorage
        const storedImageBase64 = localStorage.getItem("selectedUserImage");

        const orderData = {
            productId: product.id,
            productName: product.name,
            selectedOption,
            imageUrl: storedImageBase64 || imagePreview || '', // ✅ Ưu tiên ảnh base64 nếu có
            drawStyle: designType === 'request' ? drawStyle : '',
            font: designType === 'request' ? font : '',
            customText: designType === 'request' ? printName : '',
            quantity,
            price: product.price,
            designType,
        };

        // -------------- KHÔNG ĐĂNG NHẬP -------------------
        if (!user?.id) {
            const localItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
            let updatedItems = [...localItems];
            let found = false;

            updatedItems = updatedItems.map(item => {
                if (
                    item.productId === orderData.productId &&
                    item.selectedOption === orderData.selectedOption &&
                    item.designType === orderData.designType &&
                    item.drawStyle === orderData.drawStyle &&
                    item.customText === orderData.customText &&
                    item.font === orderData.font
                ) {
                    found = true;
                    return { ...item, quantity: item.quantity + orderData.quantity };
                }
                return item;
            });

            if (!found) {
                updatedItems.push(orderData);
            }

            localStorage.setItem('cartItems', JSON.stringify(updatedItems));
            localStorage.setItem('orderData', JSON.stringify(updatedItems)); // ✅ Lưu thêm cho trang Checkout
            localStorage.setItem('cartCount', JSON.stringify(
                updatedItems.reduce((sum, item) => sum + item.quantity, 0)
            ));

            alert("Đã thêm vào giỏ hàng tạm thời 🎉");
            return;
        }

        // -------------- CÓ ĐĂNG NHẬP -------------------
        try {
            const cartId = await getOrCreateCart(user.id);
            const res = await fetch('/api/cartItem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...orderData,
                    cartId,
                }),
            });

            if (!res.ok) throw new Error('Không thể thêm vào giỏ hàng');

            const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
            localStorage.setItem('cartCount', JSON.stringify(currentCount + orderData.quantity));

            alert('Đã thêm vào giỏ hàng 🎉');
        } catch (err) {
            console.error('Lỗi thêm vào giỏ hàng:', err);
            alert('Có lỗi xảy ra, vui lòng thử lại.');
        }
    };






    if (loading) {
        return <div className="text-center py-20 text-gray-500">Đang tải sản phẩm...</div>;
    }

    if (!product) {
        return <div className="text-center py-20 text-gray-500">Sản phẩm không tồn tại.</div>;
    }

    return (
        <>
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <Image
                        src={product.images?.[currentImageIndex]?.url || product.imageUrl}
                        alt={product.name}
                        width={600}
                        height={600}
                        className="rounded-xl w-full object-cover"
                        priority
                    />
                    <div className="flex justify-between items-center mt-2">
                        <Button onClick={handlePrevImage}>← Trước</Button>
                        <span>{currentImageIndex + 1} / {product.images.length}</span>
                        <Button onClick={handleNextImage}>Tiếp →</Button>
                    </div>
                    <div className="flex gap-2 mt-4">
                        {product.images.map((img, index) => (
                            <button key={index} onClick={() => setSelectedProductImage(img.url)}>
                                <Image
                                    key={img.id}
                                    src={img.url}
                                    alt={`Thumbnail ${index + 1}`}
                                    width={80}
                                    height={80}
                                    className="rounded-lg border cursor-pointer hover:opacity-80"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-[#333]">{product.name}</h2>
                    <div className="text-lg text-[#FF6B6B] font-semibold">
                        {product.price.toLocaleString()}đ{' '}
                        {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                                {product.originalPrice.toLocaleString()}đ
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        {productType === "case" && (
                            <>
                                <Label>Chọn dòng điện thoại</Label>
                                <select className="w-full border rounded px-3 py-2" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                    <option value="">Chọn dòng</option>
                                    {phoneModels.map((model) => (
                                        <option key={model} value={model}>{model}</option>
                                    ))}
                                </select>
                            </>
                        )}

                        {productType === "size" && (
                            <>
                                <Label>Chọn kích thước</Label>
                                <select className="w-full border rounded px-3 py-2" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                    <option value="">Chọn kích thước</option>
                                    {(product.name.includes("Túi") ? bagSizes : cupSizes).map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Bạn muốn:</Label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="designType"
                                    value="self"
                                    checked={designType === 'self'}
                                    onChange={() => setDesignType('self')}
                                />
                                Tự thiết kế (chúng tôi in theo ảnh bạn gửi)
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="designType"
                                    value="request"
                                    checked={designType === 'request'}
                                    onChange={() => setDesignType('request')}
                                />
                                Nhờ chúng tôi thiết kế (vẽ tay theo ảnh)
                            </label>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <Label>Gửi ảnh chân dung *</Label>
                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                        {imagePreview && (
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                width={200}
                                height={200}
                                className="rounded-lg mt-2 border"
                            />
                        )}
                    </div>

                    {designType === 'request' && (
                        <>
                            <div className="space-y-2">
                                <Label>Chọn font chữ (nếu muốn in tên)</Label>
                                <select className="w-full border rounded px-3 py-2" value={font} onChange={(e) => setFont(e.target.value)}>
                                    <option value="">Không in tên</option>
                                    <option value="Font viết tay">Font viết tay</option>
                                    <option value="Font dễ thương">Font dễ thương</option>
                                    <option value="Font hiện đại">Font hiện đại</option>
                                </select>
                            </div>
                            <Label className="mt-4 block">Chọn kiểu vẽ</Label>
                            <div className="flex gap-3">
                                {['Màu', 'Trắng đen', 'Chibi'].map((style) => (
                                    <label key={style} className="flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="style"
                                            value={style}
                                            checked={drawStyle === style}
                                            onChange={() => setDrawStyle(style)}
                                        />
                                        {style}
                                    </label>
                                ))}
                            </div>
                            <div className="space-y-1">
                                <Label>Lời nhắn / tên in (nếu có)</Label>
                                <Input
                                    type="text"
                                    placeholder="VD: Tặng mẹ yêu"
                                    value={printName}
                                    onChange={(e) => setPrintName(e.target.value)}
                                />
                            </div>
                        </>
                    )}

                    <div className="flex items-center gap-3">
                        <Label>Số lượng</Label>
                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                            className="w-20 border px-2 py-1 rounded"
                        />
                    </div>

                    <div className="flex gap-4">

                        <Button
                            variant="outline"
                            onClick={handleAddToCart}
                        >
                            🛒 Thêm vào giỏ hàng
                        </Button>
                    </div>
                </div>
            </motion.section>

            {product.extras && <ProductExtras title={product.extras.title} items={product.extras.items} type={product.extras.type} />}
            <div className="mt-12 max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        className={`w-1/2 py-3 text-lg font-semibold ${activeTab === "details"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("details")}
                    >
                        📋 Chi tiết sản phẩm
                    </button>
                    <button
                        className={`w-1/2 py-3 text-lg font-semibold ${activeTab === "reviews"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("reviews")}
                    >
                        ⭐ Đánh giá ({productReviews.length})
                    </button>
                </div>

                {/* Nội dung tab */}
                <div className="mt-6">
                    {activeTab === "details" ? (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
                            <p className="text-lg text-gray-600 mt-2">{product.description}</p>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 border-b pb-3">💬 Đánh giá từ khách hàng</h3>
                            {productReviews.length > 0 ? (
                                <ul className="mt-6 space-y-6">
                                    {productReviews.map((review, index) => (
                                        <li key={index} className="border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                                    {review.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{review.name}</p>
                                                    <p className="text-yellow-500 text-lg">{"⭐".repeat(review.rating)}</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-700 mt-2">{review.message}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-center mt-6">📭 Chưa có đánh giá nào cho sản phẩm này.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <SimilarProducts />
        </>
    );
}
