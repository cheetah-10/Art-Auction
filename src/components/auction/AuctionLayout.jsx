import AuctionFilter from "./AuctionFilter";
import AuctionList from "./AuctionList";

function AuctionLayout() {
	return (
		<div className="flex flex-col gap-6">
			<AuctionFilter />

			<AuctionList />
		</div>
	);
}

export default AuctionLayout;
