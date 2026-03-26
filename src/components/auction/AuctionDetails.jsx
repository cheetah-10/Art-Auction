import ArtworkDetails from "./ArtworkDetails.jsx";
import { Link } from "react-router-dom";
import { ArrowLeft, History } from "lucide-react";
import Navbar from "../../ui/Navbar.jsx";
import useFetchAuctionById from "../../hooks/useFetchAuctionById.js";

export default function AuctionDetails() {
	const { auction, isLoading, error } = useFetchAuctionById();

	return (
		<>
			<Navbar />

			<div className="max-w-6xl mx-auto h-full max-h-3/4 p-8">
				<div className="flex justify-between">
					<Link
						to={`/auction`}
						className="mb-6 flex items-center"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Listings
					</Link>
					<Link
						to={`bid-history`}
						className="mb-6 flex items-center"
					>
						<History className="mr-2 h-4 w-4" />
						Bid History
					</Link>
				</div>
				{isLoading && <div>Loading...</div>}
				{!isLoading && !error && (
					<ArtworkDetails auction={auction} />
				)}
				{error && <div className="text-nowrap">{error}</div>}
			</div>
		</>
	);
}
