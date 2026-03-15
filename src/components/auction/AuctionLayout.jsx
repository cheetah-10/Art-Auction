import AuctionCard from "./AuctionCard";
import AuctionFilter from "./AuctionFilter";
import { auctionItems } from "../../data/auctions";

function AuctionLayout() {
	return (
		<div className="flex flex-col gap-6">
			<AuctionFilter />

			<div className="grid grid-cols-3 gap-5 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
				{auctionItems.map((item) => (
					<AuctionCard key={item.id} item={item} />
				))}
			</div>
		</div>
	);
}

export default AuctionLayout;
