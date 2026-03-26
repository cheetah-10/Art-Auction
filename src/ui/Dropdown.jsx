import { useState } from "react";
import Button from "./Button";
import DropdownItem from "./DropdownItem";

function Dropdown({ itemsList, selectedItems, setSelectedItems, children }) {
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
			<Button
				onClick={() => setisOpen(!isOpen)}
				className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
			>
				<span className="text-gray-700">{children}</span>
			</Button>

			{isOpen && (
				<div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
					<div className="p-3 space-y-3 overflow-y-auto max-h-40">
						{itemsList.map((item) => (
							<DropdownItem
								key={item.id}
								item={item}
								selectedItems={selectedItems}
								handleListChange={handleListChange}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Dropdown;
