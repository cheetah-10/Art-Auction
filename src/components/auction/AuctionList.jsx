import { useEffect, useState } from "react";
import AuctionCard from "./AuctionCard";
import { useSearchParams } from "react-router-dom";

function AuctionList() {
	const [searchParams] = useSearchParams();
	const [auctions, setAuctions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	const categoryParam = searchParams.get("category");
	const tagsParam = searchParams.get("tags");
	const nameParam = searchParams.get("name");

	/*
		FETCH LOGIC LATER
		BASED ON SEARCH VALUE AND categoryParam& Array
		v1/api/auction/?name=studio_maya&category=Painting,Sculpture&tags=Abstract,Minimalist
	*/

	useEffect(
		function () {
			const controller = new AbortController();

			async function getAuctions() {
				try {
					const queryString = searchParams.toString();

					const res = await fetch(
						`http://localhost:3000/auctions${queryString ? `?${queryString}` : ""}`,
					);

					// faild to fetch
					if (!res.ok) {
						throw new Error(
							`4of el backend yahandasa :) (${res.status})`,
						);
					}

					const data = await res.json();
					setAuctions(data);
				} catch (err) {
					setError(`${err.message}`);
				} finally {
					setIsLoading(false);
				}
			}
			getAuctions();
			return function () {
				controller.abort();
			};
		},
		[searchParams],
	);

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
			new Date(b.auction_start_time) - new Date(a.auction_start_time)
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
						key={auction.auction_id}
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
