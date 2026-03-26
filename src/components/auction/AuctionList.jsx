import AuctionCard from "./AuctionCard";
import { useSearchParams } from "react-router-dom";
import useFetchAuctions from "../../hooks/useFetchAuctions";

function AuctionList() {
	const [searchParams] = useSearchParams();

	const categoryParam = searchParams.get("category");
	const tagsParam = searchParams.get("tags");
	const nameParam = searchParams.get("name");

	/*
		FETCH LOGIC LATER
		BASED ON SEARCH VALUE AND categoryParam& Array
		v1/api/auction/?name=studio_maya&category=Painting,Sculpture&tags=Abstract,Minimalist
	*/

	const { isLoading, error, auctions } = useFetchAuctions();
	// console.log(auctions)
	let auctionFilteredList = auctions;

	if (nameParam) {
		auctionFilteredList = auctionFilteredList.filter((e) =>
			e.artwork.owner.name
				.toLowerCase()
				.includes(nameParam.toLowerCase()),
		);
	}

	if (categoryParam) {
		auctionFilteredList = auctionFilteredList.filter((e) =>
			categoryParam.includes(e.artwork.category.name),
		);
	}

	if (tagsParam) {
		auctionFilteredList = auctionFilteredList.filter((e) =>
			e.artwork.tags.some((e) => tagsParam.includes(e)),
		);
	}

	const sortedAuctions = [...auctionFilteredList].sort((a, b) => {
		return (
			new Date(b.auctionStartTime) - new Date(a.auctionStartTime)
		);
	});

	return (
		<div className="grid grid-cols-3 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
			{isLoading && (
				<div className="text-nowrap">Loading Actions...</div>
			)}

			{!isLoading &&
				!error &&
				sortedAuctions.map((auction) => (
					<AuctionCard
						key={auction.auctionId}
						auction={auction}
					/>
				))}

			{!isLoading && !error && sortedAuctions.length === 0 && (
				<div className="text-nowrap">No Auctions Found</div>
			)}
			{error && <div className="text-nowrap">{error}</div>}
		</div>
	);
}

export default AuctionList;
