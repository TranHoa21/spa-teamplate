'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import * as yup from 'yup';
import moment from 'moment';
import { ValidationError } from 'yup';
import Image from 'next/image';
import { motion } from "framer-motion";

interface User {
    id: string;
    name: string;
    email: string;
    phonenumber: string;
    address?: string;
    avatar?: string;
}

interface OrderItem {
    id: string;
    quantity: number;
    variation: {
        product: {
            name: string;
        };
    };
}

interface Order {
    id: string;
    total_amount: number;
    status: string;
    created_at: string;
    orderItems: OrderItem[];
}

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string()
        .matches(
            /^[\w.%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|protonmail\.com|mail\.ru|web\.de|usa\.com)$/,
            'Invalid email'
        )
        .required('Email is required'),
    phonenumber: yup.string()
        .matches(/^\d{7,11}$/, 'Invalid phone number')
        .required('Phone number is required'),
});

export default function UserViewPage() {
    const params = useParams();
    const userId = params.id as string;
    const [user, setUser] = useState<User | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const [form, setForm] = useState({
        name: '',
        email: '',
        phonenumber: '',
        address: '',
    });


    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`/api/user/${userId}`);
            const data: User = await res.json();
            setUser(data);
            setForm({
                name: data.name || '',
                email: data.email || '',
                phonenumber: data.phonenumber || '',
                address: data.address || '',
            });
        };
        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetch(`/api/order/users/${userId}`);
            const data: Order[] = await res.json();
            const detailedOrders = await Promise.all(
                data.map(async (order) => {
                    const res = await fetch(`/api/orderItem/order/${order.id}`);
                    const items: OrderItem[] = await res.json();
                    return { ...order, orderItems: items };
                })
            );
            setOrders(detailedOrders);
        };
        fetchOrders();
    }, [userId]);

    const handleImageClick = () => {
        inputFileRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await validationSchema.validate(form, { abortEarly: false });

            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value);
            });
            if (avatarFile) {
                formData.append('file', avatarFile);
            }

            const res = await fetch(`/api/user/${userId}`, {
                method: 'PUT',
                body: formData,
            });

            if (res.ok) {
                setMessage('Cập nhật thành công!');
            } else {
                setMessage('Lỗi cập nhật.');
            }
        } catch (err) {
            if (err instanceof ValidationError) {
                setMessage(err.inner.map((e) => e.message).join(', '));
            } else {
                setMessage('Lỗi không xác định.');
            }
        }
    };

    const formatPrice = (price: number) =>
        price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-4 py-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="relative w-24 h-24">
                        <Image
                            src={avatarPreview || user?.avatar || '/default-avatar.png'}
                            alt="avatar"
                            width={96}
                            height={96}
                            className="w-24 h-24 rounded-full object-cover border"
                            style={{ width: '96px', height: '96px' }} // để chắc chắn không bị layout shift
                            unoptimized={!!avatarPreview}
                        />
                        <button
                            type="button"
                            onClick={handleImageClick}
                            className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded"
                        >
                            Sửa
                        </button>
                        <input
                            ref={inputFileRef}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="text-xl font-bold border px-2 py-1 w-full"
                        placeholder="Họ tên"
                    />
                </div>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border px-2 py-1"
                    placeholder="Email"
                />
                <input
                    name="phonenumber"
                    value={form.phonenumber}
                    onChange={handleChange}
                    className="w-full border px-2 py-1"
                    placeholder="Số điện thoại"
                />
                <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full border px-2 py-1"
                    placeholder="Địa chỉ"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Lưu
                </button>
                {message && <p className="text-sm text-red-500 mt-2">{message}</p>}
            </form>

            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Lịch sử mua hàng</h2>
                {orders.length > 0 ? (
                    <table className="w-full table-auto border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-2">Mã đơn</th>
                                <th className="p-2">Tổng</th>
                                <th className="p-2">Trạng thái</th>
                                <th className="p-2">Ngày đặt</th>
                                <th className="p-2">Sản phẩm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-t">
                                    <td className="p-2">{order.id}</td>
                                    <td className="p-2">{formatPrice(order.total_amount)}</td>
                                    <td className="p-2">{order.status}</td>
                                    <td className="p-2">{moment(order.created_at).format('DD-MM-YYYY HH:mm')}</td>
                                    <td className="p-2">
                                        {order.orderItems.map((item: OrderItem) => (
                                            <div key={item.id} className="text-sm">
                                                {item.variation.product.name} (x{item.quantity})
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Không có đơn hàng nào.</p>
                )}
            </div>
        </motion.div>
    );
}
