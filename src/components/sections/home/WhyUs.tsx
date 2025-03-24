import { Heart, Brush, Smile, ShieldCheck } from 'lucide-react';

const reasons = [
    {
        icon: <Brush size={28} className="text-[#FF6B6B]" />,
        title: 'Thiết kế cá nhân hóa',
        description: 'Mỗi sản phẩm đều được vẽ theo ảnh và phong cách riêng của bạn, không đụng hàng.',
    },
    {
        icon: <Smile size={28} className="text-[#FF6B6B]" />,
        title: 'Tặng quà ý nghĩa',
        description: 'Một món quà độc đáo & cảm xúc dành cho người thân, bạn bè, người yêu.',
    },
    {
        icon: <Heart size={28} className="text-[#FF6B6B]" />,
        title: 'Làm bằng cả trái tim',
        description: 'Từng nét vẽ đều được thực hiện thủ công tỉ mỉ, mang theo tình cảm thật sự.',
    },
    {
        icon: <ShieldCheck size={28} className="text-[#FF6B6B]" />,
        title: 'Chất lượng đảm bảo',
        description: 'In ấn sắc nét, sản phẩm bền đẹp theo thời gian, bảo hành nếu lỗi do in ấn.',
    },
];

export default function WhyUs() {
    return (
        <section id="why" className="bg-white py-16 px-4">
            <div className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left - Text */}
                <div>
                    <h2 className="text-3xl font-bold text-[#333333] mb-4">Hành trình từ những nét vẽ đầu tiên</h2>
                    <p className="text-[#7D7D7D] leading-relaxed">
                        Vẽ Chân Dung được thành lập từ tình yêu nghệ thuật và mong muốn lưu giữ khoảnh khắc ý nghĩa
                        qua từng nét vẽ. Khởi đầu từ những bức chân dung nhỏ tặng người thân, chúng mình đã đồng hành cùng
                        hơn <strong>1000+ khách hàng</strong> trên toàn quốc.
                        <br /><br />
                        Sự tin tưởng của bạn là động lực để tụi mình không ngừng cải thiện – từ chất lượng in ấn,
                        đóng gói, đến việc hỗ trợ và bảo hành sau khi nhận sản phẩm.
                    </p>
                </div>

                {/* Right - Video */}
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-md">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                        title="Giới thiệu sản phẩm"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>


            <div className="max-w-5xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-[#333333] mb-4">Tại sao chọn chúng mình?</h3>
                <p className="text-[#7D7D7D] mb-10">
                    Không chỉ là một món đồ, mỗi sản phẩm là một kỷ niệm, một cảm xúc được gửi gắm qua nét vẽ.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                    {reasons.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-4 bg-[#FFF1E6] rounded-xl p-5 hover:shadow-md transition"
                        >
                            <div className="mt-1">{item.icon}</div>
                            <div>
                                <h3 className="text-lg font-semibold text-[#333333] mb-1">{item.title}</h3>
                                <p className="text-[#7D7D7D] text-sm">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
