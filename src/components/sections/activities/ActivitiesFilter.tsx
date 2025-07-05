const ActivitiesFilter = ({ selected, onSelect }: { selected: string; onSelect: (tag: string) => void }) => {
    const filters = ['All', 'Wildlife', 'Hiking', 'Water-based', 'Family', 'Cultural'];
    return (
        <div className="py-6 px-4 max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">
            {filters.map((tag) => (
                <button
                    key={tag}
                    className={`px-4 py-2 rounded-full border ${selected === tag ? 'bg-green-600 text-white' : 'bg-white text-gray-800'}`}
                    onClick={() => onSelect(tag)}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
};

export default ActivitiesFilter;