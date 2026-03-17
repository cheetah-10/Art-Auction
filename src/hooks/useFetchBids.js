import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function useFetchBids() {
	const { id: auctionId } = useParams();
	const [bids, setBids] = useState([]);
	const [isLoading, setIsLoading] = useState({});
	const [error, setError] = useState("");

	useEffect(function () {
		const controller = new AbortController();

		async function getAuctions() {
			try {
				const res = await fetch(
					`http://localhost:3000/bids?auction_id=${auctionId}`,
				);

				// faild to fetch
				if (!res.ok) {
					throw new Error(
						`4of el backend yahandasa :) (${res.status})`,
					);
				}

				const data = await res.json();
				setBids(data);
				return data;
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
	}, []);

	return { bids, isLoading, error };
}

export default useFetchBids;
