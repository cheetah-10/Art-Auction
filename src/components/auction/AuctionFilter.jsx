import { useState } from "react";

const categories = ["Painting", "Sculpture", "Digital Media", "Photography"];

function AuctionFilter() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<div>
			{/* Filters and Search Container */}
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				{/* Search Bar */}
				<div className="w-full md:w-1/3">
					<input
						type="text"
						placeholder="Search by artist name..."
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				{/* Category Dropdown Checkboxes */}
				<div className="relative w-full md:w-64">
					<button
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
					>
						<span className="text-gray-700">Categories</span>
						<svg
							className="w-4 h-4 text-gray-500"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>

					{/* Dropdown Menu Content */}
					{isDropdownOpen && (
						<div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
							<div className="p-3 space-y-3 max-h-48 overflow-y-auto">
								{categories.map((category) => (
									<label
										key={category}
										className="flex items-center space-x-3 cursor-pointer"
									>
										<input
											type="checkbox"
											className="w-4 h-4 black-blue-600 border-gray-300 rounded black:ring-blue-500"
										/>
										<span className="black-gray-700">
											{category}
										</span>
									</label>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default AuctionFilter;
