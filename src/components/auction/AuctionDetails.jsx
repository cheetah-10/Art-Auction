import ArtworkDetails from "./ArtworkDetails.jsx";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, History } from "lucide-react";
import { useEffect, useState } from "react";

export default function AuctionDetails() {
	const { id: auctionId } = useParams();
	const [auction, setAuctions] = useState({});
	const [isLoading, setIsLoading] = useState({});
	const [error, setError] = useState("");

	useEffect(
		function () {
			const controller = new AbortController();

			async function getAuctions() {
				try {
					const res = await fetch(
						`http://localhost:3000/auction/${auctionId}`,
					);

					// faild to fetch
					if (!res.ok) {
						throw new Error(
							`4of el backend yahandasa :) (${res.status})`,
						);
					}

					const data = await res.json();
					setAuctions(data);
				} catch (err) {
					setError(`${err.message}`);
				} finally {
					setIsLoading(false);
				}
			}
			getAuctions();
			return function () {
				controller.abort();
			};
		},
		[auctionId],
	);

	return (
		<div className="max-w-6xl mx-auto h-full max-h-3/4 p-8">
			<div className="flex justify-between">
				<Link to={`/auction`} className="mb-6 flex items-center">
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Listings
				</Link>
				<Link to={`bid-history`} className="mb-6 flex items-center">
					<History className="mr-2 h-4 w-4" />
					Bid History
				</Link>
			</div>
			{isLoading && <div>Loading...</div>}
			{!isLoading && !error && <ArtworkDetails auction={auction} />}
			{error && <div className="text-nowrap">{error}</div>}
		</div>
	);
}
