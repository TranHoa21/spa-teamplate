"use client"

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import CategorySelect from "@/components/admin/blog/Category";
import TagSelect from "@/components/admin/blog/Tag";
import SunEditorCore from "suneditor/src/lib/core";
import { useParams } from "next/navigation";
import Image from 'next/image'

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
export default function EditPost() {
    const { slug } = useParams();
    const router = useRouter();
    const editorRef = useRef<SunEditorCore | null>(null);

    const [formData, setFormData] = useState<FormDataType>({
        title: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        canonicalUrl: "",
        categoryId: "",
        tags: [],
        published: false,
        image: null as File | null,
    });

    const [content, setContent] = useState("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchPost = async () => {
            const res = await fetch(`/api/posts/${slug}`);
            const data = await res.json();
            console.log(data)
            const post = data.post;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const tagIds = post.tags?.map((tag: any) => tag.id) || [];
            setFormData({
                title: post.title,
                content: post.content,
                metaTitle: post.metaTitle,
                metaDescription: post.metaDescription,
                keywords: post.keywords,
                canonicalUrl: post.canonicalUrl,
                categoryId: post.categoryId,
                tags: tagIds,
                published: post.published,
                image: null,
            });
            setContent(post.content);
            setCategoryId(post.categoryId);
            setSelectedTags(tagIds);
            setExistingImageUrl(post.imageUrl || null);
        };

        if (slug) fetchPost();
    }, [slug]);

    useEffect(() => {
        if (categoryId) {
            setFormData(prev => ({ ...prev, categoryId }));
        }
    }, [categoryId]);

    useEffect(() => {
        setFormData(prev => ({ ...prev, tags: selectedTags || [] }));
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
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && key !== "image") { // 👈 bỏ image để xử lý riêng bên dưới
                if (Array.isArray(value)) {
                    value.forEach((v) => formDataToSend.append(key, v));
                } else {
                    formDataToSend.append(key, value as string | Blob);
                }
            }
        });

        if (formData.image) {
            formDataToSend.append("image", formData.image); // ✅ thêm ảnh vào
        }

        const res = await fetch(`/api/posts/${slug}`, {
            method: "PUT",
            body: formDataToSend,
        });

        if (res.ok) {
            alert("Cập nhật bài viết thành công!");
            router.push("/admin/blogs");
        } else {
            alert("Có lỗi xảy ra khi cập nhật bài viết!");
        }
    };


    return (
        <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200 space-y-8">
            <h2 className="text-4xl font-bold text-center text-gray-900">✏️ Sửa Bài Viết</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="title" placeholder="Tiêu đề bài viết" value={formData.title} onChange={handleChange} className="col-span-2 w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" />
                    <input type="text" name="metaTitle" placeholder="Meta Title" value={formData.metaTitle} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" />
                    <input type="text" name="metaDescription" placeholder="Meta Description" value={formData.metaDescription} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" />
                    <input type="text" name="keywords" placeholder="Keywords" value={formData.keywords} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" />
                    <input type="text" name="canonicalUrl" placeholder="Canonical URL" value={formData.canonicalUrl} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg" />
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
                                buttonList: [["bold", "italic", "underline", "strike"], ["formatBlock", "font", "fontSize"], ["image", "video", "link"], ["align", "list", "table"], ["undo", "redo"]],
                            }}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <CategorySelect value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
                    <TagSelect value={selectedTags} onChange={setSelectedTags} />
                </div>
                <h3>Ảnh bìa bài viết</h3>
                <input type="file" name="image" onChange={handleImageChange} className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-700" />
                {formData.image ? (
                    <div className="mt-4 relative w-full max-w-xs h-52">
                        <Image
                            src={URL.createObjectURL(formData.image)}
                            alt="Ảnh xem trước"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg border"
                        />
                    </div>
                ) : existingImageUrl ? (
                    <div className="mt-4 relative w-full max-w-xs h-52">
                        <Image
                            src={existingImageUrl}
                            alt="Ảnh hiện tại"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg border"
                        />
                    </div>
                ) : null}
                <label className="flex items-center space-x-3">
                    <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="w-6 h-6 text-blue-500 border-gray-300 focus:ring-blue-500" />
                    <span className="text-gray-700 text-lg">Xuất bản</span>
                </label>

                <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-all">
                    💾 Lưu thay đổi
                </button>
            </form>
        </div>
    );
}
