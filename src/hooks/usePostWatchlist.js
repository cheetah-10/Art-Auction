import { useEffect, useState } from "react";
import { API } from "../constants/endPoint";
import apiClient from "../utils/apiClient";

function usePostWatchlist() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(function () {
		async function getTags() {
			try {
				const res = await apiClient.post(`${API.TAG.GET_ALL_TAGS}`);
			} catch (err) {
				setError(`${err.message}`);
			} finally {
				setIsLoading(false);
			}
		}

		getTags();
	}, []);

	// return { isLoading, error, tags };
}

export default usePostWatchlist;
