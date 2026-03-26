import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { USER_ROLES } from "../../constants/constants";

function Signup() {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			name: "Ahmed Tharwat",
			email: "ahmedlordexg@gmail.com",
			password: "123456789",
		},
	});

	async function onSubmit(data) {
		console.log("Form Data Ready for API:", data);
		
		data.status = data.role === USER_ROLES.BUYER ? "APPROVED" : "PENDING";

		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error("Error:", error));
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-900">
						Create an account
					</h1>
					<p className="mt-2 text-sm text-gray-600">
						Join our community of collectors today.
					</p>
				</div>

				{/* The form now uses handleSubmit to process the data */}
				<form
					className="mt-8 space-y-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					{/* Name Field */}
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Full Name
						</label>
						<input
							id="name"
							type="text"
							className={`mt-1 block w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900`}
							{...register("name", {
								required: "Full name is required",
								minLength: {
									value: 3,
									message: "Name must be at least 3 characters",
								},
								maxLength: {
									value: 16,
									message: "Name must be at most 16 characters",
								},
							})}
						/>
						{errors.name && (
							<p className="mt-1 text-xs text-red-500">
								{errors.name.message}
							</p>
						)}
					</div>

					{/* Email Field */}
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
							className={`mt-1 block w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900`}
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
									message: "Invalid email address format",
								},
							})}
						/>
						{errors.email && (
							<p className="mt-1 text-xs text-red-500">
								{errors.email.message}
							</p>
						)}
					</div>

					{/* Role & Status Row */}
					<div className="flex space-x-4">
						<div className="flex-1">
							<label
								htmlFor="role"
								className="block text-sm font-medium text-gray-700"
							>
								Account Role
							</label>
							<select
								id="role"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
								{...register("role", {
									required: "Role is required",
								})}
							>
								<option value={USER_ROLES.BUYER}>{USER_ROLES.BUYER}</option>
								<option value={USER_ROLES.ARTIST}>{USER_ROLES.ARTIST}</option>
							</select>
						</div>
					</div>

					{/* Password Field */}
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
							className={`mt-1 block w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900`}
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 8,
									message: "Password must be at least 8 characters long",
								},
								maxLength: {
									value: 16,
									message: "Password must be at most 16 characters",
								},
							})}
						/>
						{errors.password && (
							<p className="mt-1 text-xs text-red-500">
								{errors.password.message}
							</p>
						)}
					</div>

					{/* Terms & Conditions */}
					<div className="mt-4 pb-2">
						{errors.terms && (
							<p className="mt-1 text-xs text-red-500 ml-7">
								{errors.terms.message}
							</p>
						)}
					</div>

					{/* Submit Button */}
					<div>
						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full flex justify-center py-2.5 px-4 rounded-lg text-white bg-gray-900 hover:bg-black disabled:opacity-70 disabled:cursor-not-allowed transition-all"
						>
							{isSubmitting
								? "Creating..."
								: "Create Account"}
						</button>
					</div>
				</form>

				<div className="text-center text-sm text-gray-600 mt-4">
					Already have an account?{" "}
					<Link
						to="/login"
						className="font-medium text-gray-900 hover:underline"
					>
						Sign in
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Signup;
