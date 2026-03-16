import BidsLayout from "../components/auction/BidsLayout";



function BidHistoryPage() {
	/* 
		FETCH bids & auction & artwork 
	*/


	// const bids = bidHistory;
	return (
		<div className="min-h-screen bg-background p-8">
			<div className="max-w-7xl mx-auto">
				<div className="mb-8">
					<h1 className="text-2xl mb-2">Bid History</h1>
					<p className="text-muted-foreground">
						Browse our current collection of premium items
					</p>
				</div>

				<BidsLayout />
			</div>
		</div>
	);
}

export default BidHistoryPage;
