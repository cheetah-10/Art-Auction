import Bid from "./Bid";
import useFetchBids from "../../hooks/useFetchBids";

function BidsLayout() {
	const { bids, isLoading, error } = useFetchBids();
	
	return (
			<div>
				{isLoading && <div>Loading...</div>}
				{!isLoading && !error && (
					<div className="flex flex-col gap-6">
						{/* <div className="grid grid-cols-3 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1"> */}
						{bids.length === 0 && "No bids yet"}
						{bids.map((bid, idx) => (
							<Bid
								key={bid.bidId}
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
