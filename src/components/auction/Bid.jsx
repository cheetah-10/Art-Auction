function Bid({ bid, isHighest }) {
	console.log(bid);
	const { user_name, bid_amount, timestamp } = bid;

	// "Ahmed Tharwat" -> "AT"
	const getInitials = (name) => {
		if (!name) return "";
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	return (
		<div
			className={`flex items-center justify-between p-4 mb-3 bg-white border rounded-2xl ${
				isHighest
					? "border-black shadow-sm"
					: "border-gray-200"
			}`}
		>
			<div className="flex items-center gap-4">
				{/* Avatar */}
				<div className="flex items-center justify-center w-12 h-12 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full shrink-0">
					{getInitials(user_name)}
				</div>

				{/* User Info */}
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<span className="font-semibold text-gray-900">
							{user_name}
						</span>
						{/* Conditional Highest Bid Badge */}
						{isHighest && (
							<span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium text-white bg-gray-900 rounded-full">
								<svg
									className="w-3 h-3"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
									/>
								</svg>
								Highest Bid
							</span>
						)}
					</div>
					<span className="text-sm text-gray-500 mt-0.5">
						{timestamp}
					</span>
				</div>
			</div>

			{/* Price */}
			<div className="text-xl font-bold text-gray-900">
				${bid_amount.toLocaleString()}
			</div>
		</div>
	);
}

export default Bid;
