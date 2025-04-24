"use client"

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import CategorySelect from "@/components/admin/blog/Category";
import TagSelect from "@/components/admin/blog/Tag";
import SunEditorCore from "suneditor/src/lib/core";

type FormDataType = {
    title: string;
    content: string;
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    canonicalUrl: string;
    categoryId: string;
    tags: string[]; // <-- Khai báo rõ ràng
    published: boolean;
    image: File | null;
};
export default function CreatePost() {
    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const router = useRouter();
    const editorRef = useRef<SunEditorCore | null>(null);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, categoryId: e.target.value });
        setCategoryId(e.target.value)
    };
    const [formData, setFormData] = useState<FormDataType>({
        title: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        canonicalUrl: "",
        categoryId: "", // để tạm rỗng
        tags: [],
        published: false,
        image: null as File | null,
    });

    useEffect(() => {
        if (categoryId) {
            setFormData(prev => ({
                ...prev,
                categoryId: categoryId
            }));
        }
    }, [categoryId]);

    // Đồng bộ khi selectedTags thay đổi
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            tags: selectedTags || []
        }));
    }, [selectedTags]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };



    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData((prev) => ({ ...prev, image: e.target.files![0] }));
        }
    };

    const handleEditorChange = (content: string) => {
        setContent(content);
        setFormData((prev) => ({
            ...prev,
            content,
        }));
    }


    const handleImageUpload = (
        files: File[],
        info: object,
        uploadHandler: (data: { result: { url: string; name: string; alt: string }[] }) => void
    ): boolean => {
        if (!files.length) return false;

        const file = files[0];

        // Hỏi người dùng nhập altText
        const altText = prompt("Nhập mô tả cho ảnh (alt text):", "") || "";

        const formData = new FormData();
        formData.append("file", file);
        formData.append("altText", altText);

        fetch("/api/postImage", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success && data.images.length > 0) {
                    uploadHandler({
                        result: data.images.map((img: { url: string; alt: string }) => ({
                            url: img.url,
                            name: file.name,
                            alt: img.alt,
                        })),
                    });
                    if (editorRef.current) {
                        editorRef.current.insertHTML(`<img src="${data.images[0].url}" alt="${data.images[0].alt}" />`);
                    } else {
                        console.error("editorRef chưa được gán instance của SunEditor");
                    }
                } else {
                    console.error("Lỗi upload ảnh:", data);
                }
            })
            .catch(error => {
                console.error("Lỗi khi tải ảnh lên:", error);
            });

        return false; // Ngăn SunEditor tự xử lý ảnh
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && key !== "image") {
                // Không append "image" ở đây để xử lý riêng bên dưới
                if (Array.isArray(value)) {
                    value.forEach((v) => formDataToSend.append(key, v));
                } else {
                    formDataToSend.append(key, value as string | Blob);
                }
            }
        });

        if (formData.image) {
            formDataToSend.append("image", formData.image); // ✅ thêm ảnh đúng cách
        }

        const response = await fetch("/api/posts", {
            method: "POST",
            body: formDataToSend,
        });

        if (response.ok) {
            alert("Bài viết đã được tạo thành công!");
            router.push('/admin/blogs');
        } else {
            alert("Lỗi khi tạo bài viết!");
        }
    };

    return (
        <>
            <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200 space-y-8">
                <h2 className="text-4xl font-bold text-center text-gray-900">📝 Tạo Bài Viết</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            name="title"
                            placeholder="Tiêu đề bài viết"
                            value={formData.title}
                            onChange={handleChange}
                            className="col-span-2 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                        />

                        <input
                            type="text"
                            name="metaTitle"
                            placeholder="Meta Title"
                            value={formData.metaTitle}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                        />

                        <input
                            type="text"
                            name="metaDescription"
                            placeholder="Meta Description"
                            value={formData.metaDescription}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                        />

                        <input
                            type="text"
                            name="keywords"
                            placeholder="Keywords (cách nhau bằng dấu phẩy)"
                            value={formData.keywords}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                        />

                        <input
                            type="text"
                            name="canonicalUrl"
                            placeholder="Canonical URL"
                            value={formData.canonicalUrl}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block font-semibold text-gray-800">Nội dung bài viết</label>
                        <div className="border border-gray-300 rounded-lg shadow-sm bg-white p-2">
                            <SunEditor
                                getSunEditorInstance={(editor) => (editorRef.current = editor)}
                                setContents={content}
                                onChange={handleEditorChange}
                                setOptions={{
                                    height: "300",
                                    buttonList: [
                                        ["bold", "italic", "underline", "strike"],
                                        ["formatBlock", "font", "fontSize"],
                                        ["image", "video", "link"],
                                        ["align", "list", "table"],
                                        ["undo", "redo"],
                                    ],
                                }}
                                onImageUploadBefore={handleImageUpload}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CategorySelect value={categoryId} onChange={handleCategoryChange} />
                        <TagSelect value={selectedTags} onChange={setSelectedTags} />
                    </div>

                    <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                    />

                    <label className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            name="published"
                            checked={formData.published}
                            onChange={handleChange}
                            className="w-6 h-6 text-blue-500 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 text-lg">Xuất bản</span>
                    </label>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-all"
                    >
                        🚀 Tạo bài viết
                    </button>
                </form>
            </div>
        </>

    );
}
