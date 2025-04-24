// page.tsx hoặc layout.tsx
import AdminNotificationPanel from "@/components/admin/notifications/AdminNotificationPanel";

export default function AdminDashboard() {
    return (
        <div className="p-6">
            <AdminNotificationPanel />
        </div>
    );
}
