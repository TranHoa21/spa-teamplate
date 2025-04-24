import { useEffect, useState } from "react";

interface Tag {
    id: string;
    name: string;
    slug: string;
}

interface TagSelectProps {
    value: string[];
    onChange: (selectedTags: string[]) => void;
}

export default function TagSelect({ value, onChange }: TagSelectProps) {
    const [tags, setTags] = useState<Tag[]>([]);
    const [search, setSearch] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [newTag, setNewTag] = useState({ name: "", slug: "" });

    useEffect(() => {
        async function fetchTags() {
            const res = await fetch("/api/tag");
            const data = await res.json();
            setTags(data || []);
        }
        fetchTags();
    }, []);

    const filteredTags = tags.filter(tag =>
        tag.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddTag = async () => {
        if (!newTag.name.trim() || !newTag.slug.trim()) return;
        const res = await fetch("/api/tag", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTag)
        });
        if (res.ok) {
            const newTagData = await res.json();
            setTags([...tags, newTagData]);
            setNewTag({ name: "", slug: "" });
            setIsAdding(false);
        }
    };

    const handleTagClick = (tagId: string) => {
        if (value.includes(tagId)) {
            onChange(value.filter(id => id !== tagId));
        } else {
            onChange([...value, tagId]);
        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
            <input
                type="text"
                placeholder="🔍 Tìm kiếm tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <div className="flex flex-wrap gap-2">
                {filteredTags.map(tag => (
                    <button
                        type="button"
                        key={tag.id}
                        onClick={() => handleTagClick(tag.id)}
                        className={`px-3 py-1 rounded-full border text-sm transition duration-200 ${value.includes(tag.id) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {!isAdding ? (
                    <button
                        type="button"
                        onClick={() => setIsAdding(true)}
                        className="text-blue-600 text-sm hover:underline"
                    >
                        ➕ Thêm tag mới
                    </button>
                ) : (
                    <div className="mt-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                        <input
                            type="text"
                            placeholder="Tên tag"
                            value={newTag.name}
                            onChange={(e) => setNewTag({ ...newTag, name: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Slug tag"
                            value={newTag.slug}
                            onChange={(e) => setNewTag({ ...newTag, slug: e.target.value })}
                            className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleAddTag}
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
