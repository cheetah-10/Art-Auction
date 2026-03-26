import { useEffect, useState } from "react";
import { API } from "../constants/endPoint";

function useFetchCategories() {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(function () {
		async function getcategories() {
			try {
				const res = await fetch(`${API.CATEGORY.GET_ALL_CATEGORIES}`);

				// faild to fetch
				if (!res.ok) {
					throw new Error(
						`4of el backend yahandasa :) (${res.status})`,
					);
				}

				const data = await res.json();

				setCategories(data);
			} catch (err) {
				setError(`${err.message}`);
			} finally {
				setIsLoading(false);
			}
		}

		getcategories();

	}, []);

	return { isLoading, error, categories };
}

export default useFetchCategories;
