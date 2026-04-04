import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const roleColors = {
	admin: "text-red-800",
	artist: "text-blue-800",
	buyer: "text-emerald-800",
};

const Navbar = () => {
	const { user, isAuthenticated, logout } = useAuth();

	const navItemBaseClass =
		"px-4 py-2 text-sm font-medium rounded-lg transition-colors";

	return (
		<nav className="flex items-center justify-between px-6 py-3 w-fullborder-b bg-white shadow-sm sticky top-0 z-40">
			<div className="flex items-center space-x-8">
				<Link className="flex items-center space-x-2 cursor-pointer">
					<span className="text-lg font-bold text-gray-900 tracking-tight">
						ArtAuction
					</span>
				</Link>

				{/* Primary Navigation */}
				<div className="hidden md:flex items-center space-x-2">
					{/* Auction Button */}
					<NavLink
						to="/auction"
						className={({ isActive }) =>
							`${navItemBaseClass} ${isActive ? "bg-gray-100/80 text-gray-900" : "text-gray-700 hover:text-gray-900 hover:bg-white/60"}`
						}
					>
						Auctions
					</NavLink>

					{/* Watchlist Button */}
					{isAuthenticated && (
						<NavLink
							to="/watchlist"
							className={({ isActive }) =>
								`${navItemBaseClass} ${isActive ? "bg-gray-100/80 text-gray-900" : "text-gray-700 hover:text-gray-900 hover:bg-white/60"}`
							}
						>
							Watchlist
						</NavLink>
					)}

					{/* Artists Button */}
					{isAuthenticated && user.role.includes("admin") && (
						<NavLink
							to="/artist-application"
							className={({ isActive }) =>
								`${navItemBaseClass} ${isActive ? "bg-gray-100/80 text-gray-900" : "text-gray-700 hover:text-gray-900 hover:bg-white/60"}`
							}
						>
							Artists Apps
						</NavLink>
					)}
					{isAuthenticated && user.role.includes("admin") && (
						<NavLink
							to="/auction-application"
							className={({ isActive }) =>
								`${navItemBaseClass} ${isActive ? "bg-gray-100/80 text-gray-900" : "text-gray-700 hover:text-gray-900 hover:bg-white/60"}`
							}
						>
							Auction Apps
						</NavLink>
					)}
				</div>
			</div>

			{/* Right Section: Auth Buttons */}
			<div className="flex items-center space-x-6">
				{!isAuthenticated && (
					<Link
						to="/login"
						className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
					>
						Login
					</Link>
				)}

				{!isAuthenticated && (
					<Link
						to="/signup"
						className="px-5 py-2.5 text-sm font-medium text-white bg-[#0a0a0a] rounded-lg hover:bg-black transition-all active:scale-95 shadow-md"
					>
						Sign Up
					</Link>
				)}

				{isAuthenticated && (
					<div className="flex items-center gap-5">
						<span
							className={`px-3 py-1 font-semibold uppercase ${
								roleColors[user.role?.toLowerCase()]
							}`}
						>
							{user.role}
						</span>

						<Link
							to="/login"
							className="px-5 py-2.5 text-sm font-medium text-white bg-[#0a0a0a] rounded-lg hover:bg-black transition-all active:scale-95 shadow-md"
							onClick={logout}
						>
							Log out
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
