import BidsLayout from "../components/auction/BidsLayout";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router";

function BidHistoryPage() {
	const { id: auctionId } = useParams();

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-6xl mx-auto">
			<Link to={`/auction/${auctionId}`} className="mb-6 flex items-center">
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back to Listings
			</Link>
				<div className="mb-8">
					<h1 className="text-2xl mb-2">Bid History</h1>
					<p className="text-gray-500">
						Current Auction Bids List
					</p>
				</div>

				<BidsLayout />
			</div>
		</div>
	);
}

export default BidHistoryPage;
