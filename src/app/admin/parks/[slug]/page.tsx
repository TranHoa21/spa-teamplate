"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css";
import Image from "next/image";
const SunEditor = dynamic(() => import("suneditor-react"), {
    ssr: false,
    loading: () => <p>Đang tải trình soạn thảo...</p>,
});

type Zone = {
    id: string;
    name: string;
};

type ParkData = {
    name: string;
    location: string;
    description: string;
    image: string | File;
    zoneId: string;
    additionalImages: File[];
    existingAdditionalImages: string[];
};

export default function EditParkPage() {
    const { slug } = useParams();
    const router = useRouter();
    const editorRef = useRef<SunEditorCore | null>(null);

    const [park, setPark] = useState<ParkData>({
        name: "",
        location: "",
        description: "",
        image: "",
        zoneId: "",
        additionalImages: [],
        existingAdditionalImages: [],
    });

    const [zones, setZones] = useState<Zone[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [parkRes, zoneRes] = await Promise.all([
                    fetch(`/api/park/${slug}`),
                    fetch("/api/zone"),
                ]);

                if (!parkRes.ok) throw new Error("Không tìm thấy công viên.");
                const parkData = await parkRes.json();
                const zoneData = await zoneRes.json();

                setPark({
                    name: parkData.park.name || "",
                    location: parkData.park.location || "",
                    description: parkData.park.description || "",
                    image: parkData.park.image || "",
                    zoneId: parkData.park.zoneId || "",
                    additionalImages: [],
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    existingAdditionalImages: parkData.park.images?.map((img: any) => img.imageUrl) || [],
                });

                setZones(zoneData.zones || []);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPark({ ...park, [e.target.name]: e.target.value });
    };

    const handleDescriptionChange = (content: string) => {
        setPark({ ...park, description: content });
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


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPark((prev) => ({ ...prev, image: e.target.files![0] }));
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("name", park.name);
            formData.append("location", park.location);
            formData.append("description", park.description);
            formData.append("zoneId", park.zoneId);

            if (park.image instanceof File) {
                formData.append("image", park.image);
            }

            for (const file of park.additionalImages) {
                formData.append("additionalImages", file);
            }

            const res = await fetch(`/api/park/${slug}`, {
                method: "PUT",
                body: formData,
            });

            if (!res.ok) throw new Error("Cập nhật thất bại.");
            alert("✅ Cập nhật công viên thành công!");
            router.push("/admin/parks");
        } catch (error) {
            console.error("Lỗi khi cập nhật công viên:", error);
            alert("❌ Có lỗi xảy ra khi cập nhật.");
        }
    };
    if (loading)
        return <p className="text-center py-10 text-gray-600">Đang tải dữ liệu công viên...</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">✏️ Chỉnh sửa công viên</h1>
                <Link
                    href="/admin/parks"
                    className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg border border-gray-300"
                >
                    ← Quay lại danh sách
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100">
                {/* Tên công viên */}
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Tên công viên</label>
                    <input
                        type="text"
                        name="name"
                        value={park.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                </div>

                {/* Địa điểm */}
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Địa điểm</label>
                    <input
                        type="text"
                        name="location"
                        value={park.location}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                </div>

                {/* Hình ảnh chính */}
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Ảnh chính</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                    />
                    {park.image && (
                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700">Xem trước hình ảnh</label>
                            <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden border border-gray-300 shadow">
                                <Image
                                    src={typeof park.image === "string" ? park.image : URL.createObjectURL(park.image)}
                                    alt="Ảnh chính"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )}
                </div>


                {/* Khu vực */}
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Thuộc khu vực</label>
                    <select
                        name="zoneId"
                        value={park.zoneId}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                        <option value="">-- Chọn khu vực --</option>
                        {zones.map((zone) => (
                            <option key={zone.id} value={zone.id}>
                                {zone.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Mô tả */}
                <div className="space-y-2">
                    <label className="block font-medium text-gray-700">Mô tả</label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <SunEditor
                            getSunEditorInstance={(editor) => (editorRef.current = editor)}
                            setContents={park.description}
                            onChange={handleDescriptionChange}
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
                                formats: ["p", "div", "h1", "h2", "h3"],
                                showPathLabel: false,
                            }}
                            lang="en"
                            onImageUploadBefore={handleImageUpload}
                        />
                    </div>
                </div>

                {/* Nút submit */}
                <div className="text-right">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                    >
                        💾 Cập nhật công viên
                    </button>
                </div>
            </form>
        </div>
    );
}
