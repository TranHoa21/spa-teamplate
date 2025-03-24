import Chart from "@/components/admin/home/Chart";
import OrderAnalyticsCard from "@/components/admin/home/OrderAnalyticsCard";
import ReviewAnalyticsCard from "@/components/admin/home/ReviewAnalyticsCard";
import RevenueAnalyticsCard from "@/components/admin/home/RevenueAnalyticsCard";
import Transactions from "@/components/admin/home/Transactions"
export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#333]">Chào mừng đến với trang quản trị 🎉</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RevenueAnalyticsCard />
                <OrderAnalyticsCard />
                <ReviewAnalyticsCard />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-[#FF6B6B] mb-4">Hoạt động gần đây</h2>
                <Transactions />
            </div>
            <Chart />
        </div>
    );
}
