function AuctionStatus({ auction, className = "" }) {
	const endDate = new Date(auction.auctionEndTime);
	const now = new Date();

	const isActive = now < endDate;

	const bgColor = isActive ? "bg-green-500" : "bg-red-500";
	return (
		<div
			className={`inline-flex items-center justify-center px-2.5 py-0.5 font-bold text-white  rounded-full shadow-sm select-none ${className} ${bgColor}`}
		>
			{isActive ? "Active" : "Ended"}
		</div>
	);
}

export default AuctionStatus;
