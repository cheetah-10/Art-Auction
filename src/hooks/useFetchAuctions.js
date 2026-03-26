import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API } from "../constants/endPoint";
import apiClient from "../utils/apiClient";

function useFetchAuctions() {
	const [searchParams] = useSearchParams();

	const [auctions, setAuctions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");
	useEffect(
		function () {
			async function getAuctions() {
				try {
					const queryString = searchParams.toString();

					const res = await apiClient.get(
						`${API.AUCTION.GET_ALL_AUCTIONS}`,
					);
					// const res = await fetch(
					// 	`http://localhost:3000/auctions${queryString ? `?${queryString}` : ""}`,
					// );

					const data = res.data;
					setAuctions(data);

					// console.log(data[0]);
				} catch (err) {
					setError(`${err.message}`);
				} finally {
					setIsLoading(false);
				}
			}
			getAuctions();
		},
		[searchParams],
	);

	return { isLoading, error, auctions };
}

export default useFetchAuctions;
