import { Link } from "react-router-dom";
import { User } from "lucide-react";
import AuctionStatus from "../../ui/AuctionStatus";

export default function AuctionCard({ auction }) {
	const { auctionId, artwork } = auction;
	const { artworkImage, title, description, owner } = artwork;

	return (
		<div className="flex flex-col overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
			{/*  image */}
			<div className="aspect-[4/3] overflow-hidden">
				<img
					src={artworkImage}
					alt={title}
					className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
				/>
			</div>

			{/* Status */}
			<div className="flex gap-3 pt-4 pl-6">
				<AuctionStatus auction={auction} />
			</div>

			{/*  title & disc */}
			<div className="flex-1 py-4 px-6">
				<h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
					{title}
				</h3>
				<p className="text-gray-500">{description}</p>
			</div>
			
			{/*  Artist */}
			<div className="flex gap-3 py-3 pl-6">
				<User className="h-5 w-5 mt-1 text-muted-foreground" />
				<p>{owner.name}</p>
			</div>
			
			{/*  check auction button */}
			<div className="px-6 pb-6 pt-0">
				<Link
					to={`/auction/${auctionId}`}
					className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-950 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
				>
					Check Auction
				</Link>
			</div>
		</div>
	);
}
