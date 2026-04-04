import { ArrowBigLeft } from "lucide-react";
import { Link } from "react-router-dom";

function PendingArtistPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">

			{/* Main Message */}
			<h1 className="text-3xl font-bold text-gray-900 mb-2">
				Application Received!
			</h1>

			<p className="text-gray-600 max-w-md mb-8">
				Thank you for applying to be an artist. Our admins are
				currently reviewing your portfolio. Please login later
			</p>

			{/* Navigation Button */}
			<Link
				to="/auction"
				className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
			>
				<ArrowBigLeft className="w-6 h-6" />
				<span>Go back to auctions</span>
			</Link>
		</div>
	);
}

export default PendingArtistPage;
