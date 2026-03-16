import AuctionCard from "./AuctionCard";
import { auctionItems } from "../../data/auctions";
import { useSearchParams } from "react-router-dom";

function AuctionList() {
	const [searchParams] = useSearchParams();
	const categoryParam = searchParams.get("category");
	const tagsParam = searchParams.get("tags");
	const nameParam = searchParams.get("name");

	console.log(searchParams);
	console.log(categoryParam);
	console.log(tagsParam);

	let auctionFilteredList = auctionItems;
	// console.log(auctionFilteredList);

	/*
		FETCH LOGIC LATER
		BASED ON SEARCH VALUE AND categoryParam& Array
		v1/api/auction/?name=studio_maya&category=Painting,Sculpture&tags=Abstract,Minimalist
	*/

	// hathom mn el URL b2a
	// console.log(categoryParam);
	// console.log(tagsParam);
	if (nameParam) {
		auctionFilteredList = auctionFilteredList.filter((e) =>
			// Convert both to lowercase so "Maya" matches "maya"
			// Change e.artist to e.name or whatever property holds the artist's name in your data!
			e.artist.toLowerCase().includes(nameParam.toLowerCase()),
		);
	}

	if (categoryParam) {
		auctionFilteredList = auctionFilteredList.filter((e) =>
			categoryParam.includes(e.category),
		);
	}

	if (tagsParam) {
		auctionFilteredList = auctionFilteredList.filter((e) =>
			e.tags.some((e) => tagsParam.includes(e)),
		);
	}

	return auctionFilteredList.length !== 0 ? (
		<div className="grid grid-cols-3 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
			{auctionFilteredList.map((item) => (
				<AuctionCard key={item.id} item={item} />
			))}
		</div>
	) : (
		<div>No Auctions Found</div>
	);
}

export default AuctionList;
