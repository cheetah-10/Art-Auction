import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuctionDetails from "./components/auction/AuctionDetails";
import AuctionPage from "./pages/AuctionPage";
import BidHistoryPage from "./pages/BidHistoryPage";
import { Toaster } from 'react-hot-toast';


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
	{ path: "/", element: <div>Home</div> },
	{ path: "*", element: <div>NOT FOUND</div> },
]);

function App() {
	return (
		<div>
			<Toaster position="top-center" reverseOrder={false} />
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
