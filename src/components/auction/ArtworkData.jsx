import { Calendar, DollarSign, User } from "lucide-react";
import { useState, useEffect } from "react";
import AuctionStatus from "../../ui/AuctionStatus";
import useBidWebsocket from "../../hooks/useBidWebsocket";
import useCountdown from "../../hooks/useCountDown";

const formatDate = (dateString) => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

const formatCurrency = (amount) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};

function ArtworkData({ auction, isActiveAuction }) {
	const { artwork, category, tags, winner } = auction;
	const { currentBid } = useBidWebsocket(auction, isActiveAuction);

	const timeLeft = useCountdown(auction.auctionEndTime);

	return (
		<div className="space-y-5">
			{/* title */}
			<div className="flex justify-between items-center">
				<h1 className="text-2xl">{artwork.title}</h1>
				<span className="text-green-500 font-bold ml-1">
					{timeLeft}
				</span>
			</div>

			{/* Status */}
			<AuctionStatus auction={auction} />

			{/* Artist */}
			<div className="flex items-start gap-3">
				<User className="h-5 w-5 mt-0.5 text-gray-400" />
				<div>
					<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
						Artist
					</p>
					<p className="text-gray-900 font-medium text-base">
						{artwork.owner.name}
					</p>
				</div>
			</div>

			{/* Auction Winner */}
			{!isActiveAuction() && (
				<div className="flex items-start gap-3">
					<User className="h-5 w-5 mt-0.5 text-gray-400" />
					<div>
						<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
							Winner
						</p>
						<p className="text-gray-900 font-medium text-base">
							{winner?.name || "No one bidded BRUH"}
						</p>
					</div>
				</div>
			)}

			{/* Auction Period */}
			<div className="flex items-start gap-3">
				<Calendar className="h-5 w-5 mt-0.5 text-gray-400" />
				<div>
					<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
						Auction Period
					</p>
					<p className="text-gray-900 font-medium text-base flex items-center gap-2">
						{formatDate(auction.auctionStartTime)} -{" "}
						{formatDate(auction.auctionEndTime)}
					</p>
				</div>
			</div>

			{/* Initial Price */}
			<div className="flex items-start gap-3">
				<DollarSign className="h-5 w-5 mt-0.5 text-gray-400" />
				<div>
					<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
						Initial Price
					</p>
					<p className="text-lg text-gray-600 font-medium">
						{formatCurrency(artwork.initialPrice)}
					</p>
				</div>
			</div>

			{/* Current Highest Bid */}
			<div className="flex items-start gap-3">
				<DollarSign className="h-6 w-6 mt-1 text-green-600" />
				<div>
					<p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
						{isActiveAuction()
							? "Current Highest Bid"
							: "Winning Bid"}
					</p>
					<p className="text-3xl font-bold text-gray-900">
						{formatCurrency(currentBid)}
					</p>
				</div>
			</div>

			{/* Description */}
			<div className="border-t border-gray-200 pt-5 mt-6">
				<h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">
					Description
				</h3>
				<p className="text-gray-700 leading-relaxed">
					{artwork.description}
				</p>
			</div>
		</div>
	);
}

export default ArtworkData;
