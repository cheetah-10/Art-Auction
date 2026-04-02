import Bid from "./Bid";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { API } from "../../constants/endPoint";

function BidsLayout() {
const { id: auctionId } = useParams();
	const { data: bids, isLoading, error } = useFetch(`${API.BIDS.GET_BIDS_BY_AUCTION_ID}${auctionId}`);
	
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
