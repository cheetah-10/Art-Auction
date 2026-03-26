import { useState } from "react";
import Button from "../../ui/Button";
import Dropdown from "../../ui/Dropdown";
import { useSearchParams } from "react-router-dom";
import useFetchTags from "../../hooks/useFetchTags";
import useFetchCategories from "../../hooks/useFetchCategories";

function AuctionFilter() {
	
	/*
    FETCH CATEGORIES INTO categories Array -> will be passed to <Dropdown />
    FETCH TAGS INTO tags Array             -> will be passed to <Dropdown />
    
    v1/api/category   # get all categories
    v1/api/tag        # get all tags
  */

	const { tags } = useFetchTags();
	const { categories } = useFetchCategories();

	const [searchParams, setSearchParams] = useSearchParams();

	const [selectedCategories, setSelectedCategories] = useState(
		searchParams.get("category")?.split(",") || [],
	);

	const [selectedTags, setSelectedTags] = useState(
		searchParams.get("tags")?.split(",") || [],
	);

	const [artistName, setArtistName] = useState(
		searchParams.get("name") || "",
	);

	const handleApplyFilters = (artistName = "") => {
		const currentParams = {};

		// for searchbox value
		if (artistName.trim() !== "") {
			currentParams.name = artistName.trim();
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
					onChange={(e) => {
						setArtistName(e.target.value);
						handleApplyFilters(e.target.value);
					}}
					value={artistName}
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
					Categories
				</Dropdown>

				{
					<Dropdown
						itemsList={tags}
						selectedItems={selectedTags}
						setSelectedItems={setSelectedTags}
					>
						Tags
					</Dropdown>
				}

				<Button
					onClick={() => handleApplyFilters()}
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

/*

if (e.target.value === "") {
							// i'll need to delete the 'name' parameter only and fetch again
							searchParams.delete("name");
							
							setSearchParams(searchParams);
						
							console.log(e.target.value);
							
							// fetch data whenever a user types artist's name
							
							handleApplyFilters();

						// what if the user deleted the artist name? (there was a glitch where ?name=[first entered letter] idk why)
						// what if a user applied another filter? (category or tags)

							// and i gotta set searchParams to the new value and it's working now
						}
						setartistName(e.target.value);
*/
