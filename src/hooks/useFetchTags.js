import { useEffect, useState } from "react";
import { API } from "../constants/endPoint";

function useFetchTags() {
	const [tags, setTags] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(function () {
		async function getTags() {
			try {
				const res = await fetch(`${API.TAG.GET_ALL_TAGS}`);

				// faild to fetch
				if (!res.ok) {
					throw new Error(
						`4of el backend yahandasa :) (${res.status})`,
					);
				}

				const data = await res.json();
				setTags(data);
			} catch (err) {
				setError(`${err.message}`);
			} finally {
				setIsLoading(false);
			}
		}

		getTags();
	}, []);

	return { isLoading, error, tags };
}

export default useFetchTags;
