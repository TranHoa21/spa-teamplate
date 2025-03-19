import {
    UploadCloud,
    Type,
    Layers3,
    UserCircle,
    CreditCard,
    CheckCircle,
} from 'lucide-react';

const steps = [
    {
        icon: <UploadCloud className="text-[#FF6B6B]" size={28} />,
        title: 'Tải hình lên',
        description: 'Chọn ảnh bạn muốn in lên sản phẩm (chân dung, cặp đôi, thú cưng...).',
    },
    {
        icon: <Type className="text-[#FF6B6B]" size={28} />,
        title: 'Chọn font chữ & kiểu vẽ',
        description: 'Tùy chỉnh tên hoặc lời nhắn, chọn phong cách hình vẽ yêu thích.',
    },
    {
        icon: <Layers3 className="text-[#FF6B6B]" size={28} />,
        title: 'Chọn số lượng',
        description: 'Chọn số lượng sản phẩm bạn muốn đặt.',
    },
    {
        icon: <UserCircle className="text-[#FF6B6B]" size={28} />,
        title: 'Điền thông tin nhận hàng',
        description: 'Nhập tên, số điện thoại, địa chỉ để giao hàng tận nơi.',
    },
    {
        icon: <CreditCard className="text-[#FF6B6B]" size={28} />,
        title: 'Bấm đặt hàng & thanh toán',
        description: 'Hoàn tất đơn hàng và chọn phương thức thanh toán phù hợp.',
    },
    {
        icon: <CheckCircle className="text-[#FF6B6B]" size={28} />,
        title: 'Thông báo đặt hàng thành công',
        description: 'Bạn sẽ nhận được xác nhận đơn hàng & thời gian giao dự kiến.',
    },
];

export default function HowToOrder() {
    return (
        <section id="order-guide" className="bg-[#FFF1E6] py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-[#333333] mb-4">Hướng dẫn đặt hàng</h2>
                <p className="text-[#7D7D7D] mb-10">Chỉ vài bước đơn giản là bạn đã có món quà xinh xắn, độc quyền!</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 hover:shadow-lg transition flex flex-col gap-4 relative"
                        >
                            {/* Số bước tròn tròn góc trái trên */}
                            <div className="absolute -top-3 -left-3 bg-[#FF6B6B] text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold shadow-md">
                                {index + 1}
                            </div>

                            {/* Icon trung tâm */}
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ffe2e2]">
                                {step.icon}
                            </div>

                            <h3 className="font-semibold text-[#333333]">{step.title}</h3>
                            <p className="text-sm text-[#7D7D7D]">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
