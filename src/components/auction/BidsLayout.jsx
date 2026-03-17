import Bid from "./Bid";
import useFetchBids from "../../hooks/useFetchBids";

function BidsLayout() {
	// auction/:id/bids      # fetch the correct data using auctionId
	// bidsArray[auctionId] is DEMO, remove [auctionId] cus bidsArray will get the fetched data

	const { bids, isLoading, error } = useFetchBids();

	const sortedBids = [...bids].sort((a, b) => b.bid_amount - a.bid_amount);

	return (
		<div>
			{isLoading && <div>Loading...</div>}
			{!isLoading && !error && (
				<div className="flex flex-col gap-6">
					{/* <div className="grid grid-cols-3 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1"> */}
					{sortedBids.map((bid, idx) => (
						<Bid
							key={bid.id}
							bid={bid}
							isHighest={idx === 0}
						/>
					))}
					{/* </div> */}
				</div>
			)}
			{error && <div className="text-nowrap">{error}</div>}
		</div>
	);
}

export default BidsLayout;
