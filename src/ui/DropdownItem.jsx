function DropdownItem({ item, selectedItems, handleListChange }) {
	return (
		<div>
			<label
				key={item.id}
				className="flex items-center space-x-3 cursor-pointer"
			>
				<input
					type="checkbox"
					className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
					checked={selectedItems.includes(item.name)}
					onChange={() => handleListChange(item.name)}
				/>
				<span className="text-gray-700">{item.name}</span>
			</label>
		</div>
	);
}

export default DropdownItem;
