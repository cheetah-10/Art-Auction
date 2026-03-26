import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import { API } from "../constants/endPoint";

function useFetchCurrentUser() {
	// get user from localstorage if exists
	const [user, setUser] = useState(() => {
		const stored = localStorage.getItem("authUser");
		return stored ? JSON.parse(stored) : null;
	});

	const [isAuthenticated, setIsAuthenticated] = useState(
		() => !!localStorage.getItem("authToken"),
	);

	// there is token and no user
	useEffect(() => {
		const token = localStorage.getItem("authToken");
		if (!token) return; // no token

		// If we already hydrated from localStorage, no need to re-fetch
		if (user) return;

		async function getUser() {
			try {
				const response = await apiClient.get(API.USER.GET_USER);
				const data = response.data;
				setUser(data.user);
				localStorage.setItem("authUser", JSON.stringify(data.user));
				setIsAuthenticated(true);
			} catch {
				// Token is invalid (expired)
				localStorage.removeItem("authToken");
				localStorage.removeItem("authUser");
				setIsAuthenticated(false);
			}
		}

		getUser();
	}, []);

	return { user, setUser, isAuthenticated, setIsAuthenticated };
}

export default useFetchCurrentUser;

// import { useEffect, useState } from "react";
// import apiClient from "../utils/apiClient";
// import { API } from "../constants/endPoint";

// function useFetchCurrentUser() {
// 	const [user, setUser] = useState(null);
// 	const [isAuthenticated, setIsAuthenticated] = useState(false);

// 	useEffect(
// 		function () {
// 			async function getUser() {
// 				try {
// 					const response = await apiClient.get(
// 						API.USER.GET_USER,
// 					);
// 					const data = response.data;

// 					setUser(data.user);
// 					setIsAuthenticated(true);
// 				} catch (err) {
// 					setIsAuthenticated(false);
// 				}
// 			}
// 			getUser();
// 		},
// 		[isAuthenticated],
// 	);

// 	return { user, isAuthenticated, setIsAuthenticated };
// }

// export default useFetchCurrentUser;
