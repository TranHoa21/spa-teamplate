"use client"

import { useEffect, useState } from "react";

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface CategorySelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: "", slug: "" });

    useEffect(() => {
        async function fetchCategories() {
            const res = await fetch("/api/category"); // Đảm bảo có endpoint API này trong Next.js
            const data = await res.json();
            setCategories(data || []);
        }
        fetchCategories();
    }, []);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddCategory = async () => {
        if (!newCategory.name.trim() || !newCategory.slug.trim()) return;
        const res = await fetch("/api/category", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCategory),
        });
        if (res.ok) {
            const newCat = await res.json();
            setCategories([...categories, newCat]);
            setNewCategory({ name: "", slug: "" });
            setIsAdding(false);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <input
                type="text"
                placeholder="🔍 Tìm kiếm danh mục..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <select
                name="categoryId"
                value={value}
                onChange={onChange} // Truyền lên component cha khi thay đổi
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Chọn danh mục</option>
                {filteredCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <div className="mt-4">
                {!isAdding ? (
                    <button
                        type="button"
                        onClick={() => setIsAdding(true)}
                        className="text-blue-600 text-sm hover:underline"
                    >
                        ➕ Thêm danh mục mới
                    </button>
                ) : (
                    <div className="mt-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                        <input
                            type="text"
                            placeholder="Tên danh mục"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Slug danh mục"
                            value={newCategory.slug}
                            onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleAddCategory}
                                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                            >
                                Lưu
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="px-4 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition duration-200"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
