import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

function useFetch(url) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(
		function () {
			if (!url) {
				setIsLoading(false);
				return;
			}
			async function getData() {
				try {
					const res = await apiClient.get(url);
					const data = res.data;
					
					setData(data);
				} catch (err) {
					setError(`${err.message}`);
				} finally {
					setIsLoading(false);
				}
			}
			getData();
		},
		[url],
	);

	return { isLoading, error, data };
}

export default useFetch;
