import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuctionDetails from "./components/auction/AuctionDetails";
import AuctionPage from "./pages/AuctionPage";
import BidHistoryPage from "./pages/BidHistoryPage";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WatchListPage from "./pages/WatchListPage";
import ArtistsSubmitionPage from "./pages/ArtistsSubmitionPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import { USER_ROLES } from "./constants/constants";
import PendingArtistPage from "./pages/PendingArtistPage";

const router = createBrowserRouter([
	{
		path: "/auction",
		element: <AuctionPage />,
	},
	{
		path: "/auction/:id",
		element: <AuctionDetails />,
	},
	{
		path: "/auction/:id/bid-history",
		element: <BidHistoryPage />,
	},
	{
		path: "/watchlist",
		element: <WatchListPage />,
	},
	{
		path: "/artist-application",
		element: (
			<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
				<ArtistsSubmitionPage />
			</ProtectedRoute>
		),
	},
	{ path: "/pending-artist-response", element: <PendingArtistPage /> },
	{ path: "/login", element: <LoginPage /> },
	{ path: "/signup", element: <SignupPage /> },
	{ path: "/", element: <LoginPage /> },
	{
		path: "/unauthorized",
		element: (
			<div>
				I hope that the situation doesn't escalate to a nuclear war
			</div>
		),
	},
	{ path: "*", element: <div>NOT FOUND</div> },
]);

function App() {
	return (
		<div>
			<AuthProvider>
				<Toaster
					position="top-center"
					reverseOrder={false}
					toastOptions={{
						// Define default options
						className: "",
						duration: 5000,
						removeDelay: 100,
						success: {
							duration: 1000,
							iconTheme: {
								primary: "white",
								secondary: "green",
							},
							style: {
								background: "green",
								color: "#fff",
							},
						},
						error: {
							duration: 1000,
							iconTheme: {
								primary: "white",
								secondary: "red",
							},
							style: {
								background: "red",
								color: "#fff",
							},
						},
					}}
				></Toaster>
				<RouterProvider router={router} />
			</AuthProvider>
		</div>
	);
}

export default App;
