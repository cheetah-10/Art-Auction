import axios from "axios";
import { API } from "../constants/endPoint";
import toast from "react-hot-toast";

const apiClient = axios.create({
	baseURL: API.BACKEND_PORT,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

// // attach token to every request
// apiClient.interceptors.request.use(
// 	(config) => {
// 		const token = localStorage.getItem("authToken");
// 		if (token) {
// 			config.headers["Authorization"] = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => Promise.reject(error),
// );

apiClient.interceptors.response.use(
	(response) => response,

	(error) => {
		const status = error.response?.status;
		const isLoginRequest = error.config?.url?.includes(API.LOGIN);
		const isGetUser = error.config?.url?.includes(API.USER.GET_USER);

		// console.log(error);

		switch (status) {
			case 400:
				console.log(error);
				break;
			case 401:
				// if user is not logging in (like entering /watchlist that has the user to be logged in)
				if (!isLoginRequest && !isGetUser) {
					toast.error("NOT AUTHORIZED");
				}
				break;
			case 403:
				toast.error("You don't have permission to do that.");
				break;

			case 404:
				break;
			case 500:
				// toast.error(
				// 	"Something went wrong on the server. Please try again.",
				// );
				break;

			default:
				if (!status) {
					// No response at all — network failure, timeout, CORS
					toast.error("Network error. Check your connection.");
				}
				break;
		}
		return Promise.reject(error);
	},
);

export default apiClient;
