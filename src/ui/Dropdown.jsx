import { useState } from "react";

function Dropdown({ itemsList, children, selectedItems, setSelectedItems }) {
	const [isOpen, setisOpen] = useState(false);

	const handleListChange = (item) => {
		setSelectedItems((prev) => {
			if (prev.includes(item)) {
				// already existing item -> remove
				return prev.filter((c) => c !== item);
			} else {
				return [...prev, item];
			}
		});
	};

	return (
		<div className="relative w-full md:w-48">
			<button
				onClick={() => {
					setisOpen(!isOpen);
					// setIsTagDropdownOpen(false); // Close the other dropdown
				}}
				className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
			>
				<span className="text-gray-700">{children}</span>
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

			{isOpen && (
				<div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
					<div className="p-3 space-y-3 overflow-y-auto max-h-40">
						{itemsList.map((item) => (
							<label
								key={item}
								className="flex items-center space-x-3 cursor-pointer"
							>
								<input
									type="checkbox"
									className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
									checked={selectedItems.includes(
										item,
									)}
									onChange={() =>
										handleListChange(item)
									}
								/>
								<span className="text-gray-700">
									{item}
								</span>
							</label>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Dropdown;
