import AuctionLayout from "../components/auction/AuctionLayout";
import Navbar from "../ui/Navbar";

export default function AuctionPage() {
	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-background p-8">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8">
						<h1 className="text-2xl mb-2">
							Auction Listings
						</h1>
						<p className="text-muted-foreground">
							Browse our current collection of premium
							items
						</p>
					</div>

					<AuctionLayout />
				</div>
			</div>
		</>
	);
}
