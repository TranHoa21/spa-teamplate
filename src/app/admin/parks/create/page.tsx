"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import SunEditorCore from "suneditor/src/lib/core";

type ParkFormData = {
    name: string;
    description: string;
    location: string;
    zoneId: string;
    image: File | null;
};

type Zone = {
    id: string;
    name: string;
};

export default function CreatePark() {
    const [formData, setFormData] = useState<ParkFormData>({
        name: "",
        description: "",
        location: "",
        zoneId: "",
        image: null,
    });

    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const editorRef = useRef<SunEditorCore | null>(null);

    useEffect(() => {
        const fetchZones = async () => {
            try {
                const res = await fetch("/api/zone");
                const data = await res.json();
                setZones(data.zones || []);
            } catch (error) {
                console.error("Failed to fetch zones:", error);
            }
        };

        fetchZones();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleEditorChange = (content: string) => {
        setFormData((prev) => ({
            ...prev,
            description: content,
        }));
    };

    const handleImageUpload = (
        files: File[],
        info: object,
        uploadHandler: (data: { result: { url: string; name: string; alt: string }[] }) => void
    ): boolean => {
        if (!files.length) return false;

        const file = files[0];
        const altText = prompt("Nhập mô tả cho ảnh (alt text):", "") || "";

        const formData = new FormData();
        formData.append("file", file);
        formData.append("altText", altText);

        fetch("/api/parkImage", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success && data.images.length > 0) {
                    uploadHandler({
                        result: data.images.map((img: { url: string; alt: string }) => ({
                            url: img.url,
                            name: file.name,
                            alt: img.alt,
                        })),
                    });
                }
            })
            .catch((error) => {
                console.error("Lỗi khi tải ảnh lên:", error);
            });

        return false;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && key !== "image") {
                formDataToSend.append(key, value as string);
            }
        });

        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            const res = await fetch("/api/park", {
                method: "POST",
                body: formDataToSend,
            });

            if (res.ok) {
                alert("Tạo công viên thành công!");
                router.push("/admin/parks");
            } else {
                alert("Tạo công viên thất bại.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Đã xảy ra lỗi khi tạo công viên.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-gray-800">🌳 Tạo công viên mới</h1>
                <Link
                    href="/admin/parks"
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                    ↩️ Quay lại
                </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Tên công viên</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nhập tên công viên"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Vị trí</label>
                            <input
                                type="text"
                                name="location"
                                placeholder="Nhập vị trí"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Khu vực</label>
                            <select
                                name="zoneId"
                                value={formData.zoneId}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">-- Chọn khu vực --</option>
                                {zones.map((zone) => (
                                    <option key={zone.id} value={zone.id}>
                                        {zone.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Ảnh chính</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <SunEditor
                                getSunEditorInstance={(editor) => (editorRef.current = editor)}
                                setContents={formData.description}
                                onChange={handleEditorChange}
                                setOptions={{
                                    height: "300px",
                                    buttonList: [
                                        ["undo", "redo"],
                                        ["font", "fontSize"],
                                        ["bold", "underline", "italic", "strike"],
                                        ["fontColor", "hiliteColor"],
                                        ["align", "list"],
                                        ["link", "image"],
                                        ["fullScreen"],
                                    ],
                                    defaultStyle: "font-family: 'Inter', sans-serif; font-size: 14px;",
                                }}
                                onImageUploadBefore={handleImageUpload}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <Link
                            href="/admin/parks"
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            Hủy bỏ
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-4 py-2 rounded-lg text-white ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang xử lý...
                                </>
                            ) : (
                                "💾 Lưu công viên"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}