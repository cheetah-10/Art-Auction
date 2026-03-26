import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function useActionLoginProtection() {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	return function protectAction(msg) {
		if (!isAuthenticated) {
			navigate("/login");
			toast.error(msg);
		}
	};
}
