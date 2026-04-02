import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuctionDetails from "./components/auction/AuctionDetails";
import AuctionPage from "./pages/AuctionPage";
import BidHistoryPage from "./pages/BidHistoryPage";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import {AuthProvider} from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import WatchListPage from "./pages/WatchListPage";
import ArtistsSubmitionPage from "./pages/ArtistsSubmitionPage";

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
		path: "/artistApplication",
		element: <ArtistsSubmitionPage />,
	},
	{ path: "/login", element: <LoginPage /> },
	{ path: "/signup", element: <SignupPage /> },
	{ path: "/", element: <LoginPage /> },
	{ path: "*", element: <div>NOT FOUND</div> },
]);

function App() {
	return (
		<div>
			<AuthProvider>
				<Toaster position="top-center" reverseOrder={false} />
				<RouterProvider router={router} />
			</AuthProvider>
		</div>
	);
}

export default App;
