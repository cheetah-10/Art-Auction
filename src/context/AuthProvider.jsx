import { createContext, useContext, useState } from "react";
import { API } from "../constants/endPoint";
import toast from "react-hot-toast";
import apiClient from "../utils/apiClient";
import useFetchCurrentUser from "../hooks/useFetchCurrentUser";

const AuthContext = createContext();

function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { user, setUser } = useFetchCurrentUser(
		setIsAuthenticated,
		setIsLoading,
	);

	async function login(email, password) {
		setIsLoading(true);
		try {
			const response = await apiClient.post(API.LOGIN, {
				email,
				password,
			});
			// console.log("===============================")
			// console.log(response)
			// console.log("===============================")
			const data = response.data;

			localStorage.setItem("isLoggedIn", "true");
			setUser(data.user);
			setIsAuthenticated(true);
		} catch (err) {
			throw new Error(
				`${err.response?.data?.message || err.message}`,
			);
		} finally {
			setIsLoading(false);
		}
	}

	function logout() {
		apiClient.post(API.LOGOUT);
		localStorage.removeItem("isLoggedIn");
		setUser(null);
		setIsAuthenticated(false);
		toast.success("Sad to see you go :(( xd");
	}

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, isLoading, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error("Context was used outside its provider");
	return context;
}

export { useAuth, AuthProvider };
