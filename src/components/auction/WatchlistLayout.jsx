import { API } from "../../constants/endPoint";
import useFetch from "../../hooks/useFetch";
import AuctionCard from "./AuctionCard";

function WatchlistLayout() {
	const { isLoading, error, data } = useFetch(
		`${API.USER.GET_MY_WATCHLIST}`,
	);

	return (
		<div className="flex flex-col gap-6">
			<div className="grid grid-cols-3 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
				{data.length === 0 && <div>Your watchlist is empty.</div>}
				{!isLoading &&
					!error &&
					data.map((auction) => (
						<AuctionCard
							key={auction.auctionId}
							auction={auction}
						/>
					))}
			</div>
		</div>
	);
}

export default WatchlistLayout;
