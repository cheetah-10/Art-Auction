function Badge({ active = true, className = "", children }) {
	const bgColor = active ? "bg-green-500" : "bg-red-500";
	return (
		<div
			className={`inline-flex items-center justify-center px-2.5 py-0.5 font-bold text-white  rounded-full shadow-sm select-none ${className} ${bgColor}`}
		>
			{/* Optional: Add a pulsing dot for an extra "online" feel */}
			{active && (
				<span className="w-1.5 h-1.5 mr-1.5 bg-white rounded-full animate-pulse"></span>
			)}
			{children}
		</div>
	);
}

export default Badge;
