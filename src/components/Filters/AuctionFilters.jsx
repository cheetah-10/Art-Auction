import React from "react";

const AuctionFilters = ({
    formData,
    setFormData,
    categories,
    tags,
    onApply,
    onReset
}) => {
    return (
        <div className="max-w-7xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* Search */}
            <input
                type="text"
                placeholder="Search artwork..."
                value={formData.SearchTerm}
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        SearchTerm: e.target.value
                    }))
                }
                className="border border-art-gold-20 bg-white dark:bg-art-navy-80 px-4 py-3 outline-none"
            />

            {/* Artist */}
            <input
                type="text"
                placeholder="Artist name..."
                value={formData.ArtistName}
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        ArtistName: e.target.value
                    }))
                }
                className="border border-art-gold-20 bg-white dark:bg-art-navy-80 px-4 py-3 outline-none"
            />

            {/* Category */}
            <select
                value={formData.CategoryId}
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        CategoryId: e.target.value
                    }))
                }
                className="border border-art-gold-20 bg-white dark:bg-art-navy-80 px-4 py-3 outline-none"
            >
                <option value="">All Categories</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 col-span-2">
                {tags.map(tag => {
                    const isSelected = formData.TagIds.includes(tag.id);

                    return (
                        <button
                            key={tag.tagId}
                            onClick={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    TagIds: isSelected
                                        ? prev.TagIds.filter(id => id !== tag.id)
                                        : [...prev.TagIds, tag.id]
                                }));
                            }}
                            className={`
                                px-3 py-1 text-xs border transition
                                ${isSelected
                                    ? "bg-art-gold-100 text-white"
                                    : "border-art-gold-20 text-art-navy-60 dark:text-white"}
                            `}
                        >
                            {tag.name}
                        </button>
                    );
                })}
            </div>

            {/* Min Price */}
            <input
                type="number"
                placeholder="Min Price"
                value={formData.MinPrice}
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        MinPrice: e.target.value
                    }))
                }
                className="border border-art-gold-20 bg-white dark:bg-art-navy-80 px-4 py-3 outline-none"
            />

            {/* Max Price */}
            <input
                type="number"
                placeholder="Max Price"
                value={formData.MaxPrice}
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        MaxPrice: e.target.value
                    }))
                }
                className="border border-art-gold-20 bg-white dark:bg-art-navy-80 px-4 py-3 outline-none"
            />

            {/* Buttons */}
            <div className="flex gap-3 col-span-2 md:col-span-5 justify-end mt-2">
                <button
                    onClick={onApply}
                    className="px-6 py-3 bg-art-gold-100 text-white uppercase text-xs tracking-widest font-bold"
                >
                    Apply Filters
                </button>

                <button
                    onClick={onReset}
                    className="px-6 py-3 border border-art-gold-20 uppercase text-xs tracking-widest font-bold"
                >
                    Reset
                </button>
            </div>

        </div>
    );
};

export default AuctionFilters;