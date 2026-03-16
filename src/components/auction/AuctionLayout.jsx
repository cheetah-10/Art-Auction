import AuctionFilter from "./AuctionFilter";
// import { useState } from "react";
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
