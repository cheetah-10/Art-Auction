import { createContext, useContext, useState } from "react";
import { API } from "../constants/endPoint";
import toast from "react-hot-toast";
import apiClient from "../utils/apiClient";
import useFetchCurrentUser from "../hooks/useFetchCurrentUser";

const AuthContext = createContext();

function AuthProvider({ children }) {
	const { user, setUser, isAuthenticated, setIsAuthenticated } =
		useFetchCurrentUser();
	const [isLoading, setIsLoading] = useState(false);

	async function login(email, password) {
		setIsLoading(true);
		try {
			const response = await apiClient.post(API.LOGIN, {
				email,
				password,
			});

			// console.log(response);

			const data = response.data;

			// Persist both token AND user object
			localStorage.setItem("authToken", data.token);
			localStorage.setItem("authUser", JSON.stringify(data.user));

			setUser(data.user);
			setIsAuthenticated(true);
		} catch (err) {
			throw new Error(
				`${err.response.data?.message || "Wrong Credentials."}`,
			);
		} finally {
			setIsLoading(false);
		}
	}

	function logout() {
		localStorage.removeItem("authToken");
		localStorage.removeItem("authUser");
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
