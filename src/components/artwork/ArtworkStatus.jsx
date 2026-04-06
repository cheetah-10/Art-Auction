const statusColors = {
	APPROVED: "bg-green-500",
	PENDING: "bg-yellow-500",
	REJECTED: "bg-red-500",
	AUCTION: "bg-blue-500",
};

function ArtworkStatus({ artwork, appStatus, className = "" }) {
	const badgeColor = statusColors[appStatus || artwork.status] || "bg-gray-500";

	return (
		<span
			className={`${className} px-2 py-1 text-xs font-bold text-white rounded uppercase ${badgeColor}`}
		>
			{appStatus || artwork.status}
		</span>
	);
}

export default ArtworkStatus;
