function BidPopUpBody({
	maxCurrnetBid,
	bidAmount,
	setBidAmount,
	minBidAmount,
}) {
	return (
		<div>
			<div className="space-y-4 py-4">
				<p className="text-sm text-gray-500">
					Current highest bid is{" "}
					<strong>${maxCurrnetBid}</strong>. Your bid
					must be at least <strong>${minBidAmount}</strong>.
				</p>

				<div className="relative">
					<span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
						$
					</span>
					<input
						type="number"
						value={bidAmount}
						onChange={(e) => setBidAmount(e.target.value)}
						placeholder={`Enter ${minBidAmount} or more`}
						min={minBidAmount}
						className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
					/>
				</div>
			</div>
		</div>
	);
}

export default BidPopUpBody;
