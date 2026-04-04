import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../ui/Navbar";
import Button from "../../ui/Button";
import { useAuth } from "../../context/AuthProvider";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Login() {
	const [email, setEmail] = useState("ahmedlordexg@gmail.com");
	const [password, setPassword] = useState("Password123!");
	// const [error, setError] = useState("");

	const navigate = useNavigate();

	const { isAuthenticated, login, isLoading } = useAuth();

	function handleSubmit(e) {
		e.preventDefault();

		if (email && password) {
			toast.promise(login(email, password), {
				loading: "loading...",
				success: "You are logged in!",
				error: (err) => `${err.message}`
			});
		}
	}

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/auction", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	return (
		<>
			<div className="flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
					{/* Header */}
					<div className="text-center">
						<div className="flex justify-center items-center space-x-2 mb-4">
							<h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
								ArtAuction
							</h2>
						</div>
						<h1 className="text-3xl font-bold text-gray-900">
							Welcome back
						</h1>
						<p className="mt-2 text-sm text-gray-600">
							Please enter your details to sign in.
						</p>
					</div>

					{/* Login Form */}
					<form
						className="mt-8 space-y-6"
						onSubmit={handleSubmit}
					>
						<div className="space-y-4">
							{/* Email*/}
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email address
								</label>
								<input
									id="email"
									type="email"
									required
									className="mt-1 appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 focus:z-10 sm:text-sm transition-colors"
									placeholder="example@gmail.com"
									onChange={(e) =>
										setEmail(e.target.value)
									}
									value={email}
								/>
							</div>

							{/* password */}
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium text-gray-700"
								>
									Password
								</label>
								<input
									id="password"
									type="password"
									required
									className="mt-1 appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 focus:z-10 sm:text-sm transition-colors"
									placeholder="••••••••"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									value={password}
								/>
							</div>
						</div>

						{/* login */}
						<div>
							<Button
								type="submit"
								size="lg"
								className="w-full bg-black text-white"
								disabled={isLoading}
							>
								Login
							</Button>
						</div>
					</form>

					{/* Footer */}
					<div className="text-center text-sm text-gray-600">
						Don't have an account?{" "}
						<Link
							to="/signup"
							className="font-medium text-gray-900 hover:underline"
						>
							Sign up for free
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
