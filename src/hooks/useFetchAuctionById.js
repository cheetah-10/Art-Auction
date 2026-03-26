import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../constants/endPoint";

function useFetchAuctionById() {
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
						`${API.AUCTION.GET_AUCTION_BY_ID}${auctionId}`,
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

	return { isLoading, error, auction };
}

export default useFetchAuctionById;
