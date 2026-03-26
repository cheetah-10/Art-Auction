import WatchlistLayout from "../components/auction/WatchlistLayout";
import { useAuth } from "../context/AuthProvider";
import Navbar from "../ui/Navbar";

function WatchlistPage() {
  const {user} = useAuth();
  
	return (
		<>
			<Navbar />
			<div className="max-h-full p-3">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8">
						<h1 className="text-2xl mb-2">
							{user.name}'s Watchlist
						</h1>
						<p className="text-muted-foreground">
							Browse your preferred collection of premium
							items
						</p>
					</div>
					<WatchlistLayout />
				</div>
			</div>
		</>
	);
}

export default WatchlistPage;
