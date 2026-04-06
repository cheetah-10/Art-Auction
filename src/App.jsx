import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuctionDetails from "./components/auction/AuctionDetails";
import AuctionPage from "./pages/AuctionPage";
import BidHistoryPage from "./pages/BidHistoryPage";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WatchListPage from "./pages/WatchListPage";
import ArtistAppsPage from "./pages/ArtistAppsPage";
import ProtectedRoute from "./ui/ProtectedRoute";
import { USER_ROLES } from "./constants/constants";
import PendingArtistPage from "./pages/PendingArtistPage";
import YourArtPage from "./pages/YourArtPage";
import UploadArtworkForm from "./pages/UploadArtworkForm";
import ArtworkDetailsPage from "./pages/ArtworkDetailsPage";
import UploadArtworkFormPopulated from "./pages/UploadArtworkFormPopulated";
import ArtworkAppsPage from "./pages/ArtworkAppsPage";

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
				<ArtistAppsPage />
			</ProtectedRoute>
		),
	},
	{
		path: "/artwork-application",
		element: (
			<ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
				<ArtworkAppsPage />
			</ProtectedRoute>
		),
	},
	{ path: "/pending-artist-response", element: <PendingArtistPage /> },
	{
		path: "/my-art",
		element: (
			<ProtectedRoute
				allowedRoles={[USER_ROLES.ARTIST, USER_ROLES.ADMIN]}
			>
				<YourArtPage />
			</ProtectedRoute>
		),
	},
	{
		path: "/upload-artwork",
		element: (
			<ProtectedRoute
				allowedRoles={[USER_ROLES.ARTIST, USER_ROLES.ADMIN]}
			>
				<UploadArtworkForm />
			</ProtectedRoute>
		),
	},
	{
		path: "/artwork/:id",
		element: (
			<ProtectedRoute
				allowedRoles={[USER_ROLES.ARTIST, USER_ROLES.ADMIN]}
			>
				<ArtworkDetailsPage />
			</ProtectedRoute>
		),
	},
	{
		path: "/edit-artwork/:id",
		element: (
			<ProtectedRoute
				allowedRoles={[USER_ROLES.ARTIST, USER_ROLES.ADMIN]}
			>
				<UploadArtworkFormPopulated />
			</ProtectedRoute>
		),
	},
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
						removeDelay: 1000,
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
							duration: 2000,
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
