import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import { API } from "../constants/endPoint";

function useFetchCurrentUser(setIsAuthenticated, setIsLoading) {
const [user, setUser] = useState(null);
	useEffect(() => {
		async function getUser() {
			const isLoggedIn = localStorage.getItem("isLoggedIn");
			if (!isLoggedIn) {
				setIsAuthenticated(false);
				setIsLoading(false);
				return;
			}

			try {
				const response = await apiClient.get(API.USER.GET_USER);
				const user = response.data;

				// console.log("=====================");
				// console.log(user);
				// console.log("=====================");

				setUser(user);
				setIsAuthenticated(true);
			} catch {
				// Token is invalid (expired)
				localStorage.removeItem("isLoggedIn");
				setIsAuthenticated(false);
			}
		}

		getUser();
	}, []);
	
	return {user, setUser}
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
