// import { useState } from "react";
import { useState } from "react";
import Button from "../../ui/Button";
import Dropdown from "../../ui/Dropdown";
import { useSearchParams } from "react-router-dom";

// Dummy l7d ma rbna yfrgha :)
const categories = ["Painting", "Sculpture", "Digital Media", "Photography"];
const tags = [
	"Abstract",
	"Modern",
	"Classic",
	"Surrealism",
	"Pop Art",
	"Minimalist",
];

function AuctionFilter() {
	/*
    FETCH CATEGORIES INTO categories Array -> will be passed to <Dropdown />
    FETCH TAGS INTO tags Array             -> will be passed to <Dropdown />
    
    v1/api/category   # get all categories
    v1/api/tag        # get all tags
  */

	const [searchParams, setSearchParams] = useSearchParams();

	const [selectedCategories, setSelectedCategories] = useState(
		searchParams.get("category")?.split(",") || [],
	);

	const [selectedTags, setSelectedTags] = useState(
		searchParams.get("tags")?.split(",") || [],
	);

	const [searchQuery, setSearchQuery] = useState(
		searchParams.get("name") || "",
	);

	const handleApplyFilters = () => {
		const currentParams = {};

		// for searchbox value
		if (searchQuery.trim() !== "") {
			currentParams.name = searchQuery.trim();
		}

		// selected any checkboxes?
		if (selectedCategories.length > 0) {
			currentParams.category = selectedCategories.join(",");
		}
		if (selectedTags.length > 0) {
			currentParams.tags = selectedTags.join(",");
		}

		setSearchParams(currentParams);
	};

	return (
		<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
			{/* Search Bar */}
			<div className="w-full md:w-1/3">
				<input
					type="text"
					placeholder="Search by artist name..."
					className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
					onChange={(e) => setSearchQuery(e.target.value)}
					value={searchQuery}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							handleApplyFilters();
						}
					}}
				/>
			</div>

			<div className="flex flex-col w-full gap-4 md:flex-row md:w-auto">
				<Dropdown
					itemsList={categories}
					selectedItems={selectedCategories}
					setSelectedItems={setSelectedCategories}
				>
					Category
				</Dropdown>

				<Dropdown
					itemsList={tags}
					selectedItems={selectedTags}
					setSelectedItems={setSelectedTags}
				>
					Tags
				</Dropdown>

				<Button
					onClick={handleApplyFilters}
					size="lg"
					className=" text-white bg-black hover:bg-gray-700 "
				>
					Filter
				</Button>
			</div>
		</div>
	);
}

export default AuctionFilter;
