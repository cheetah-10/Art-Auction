import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuctionDetails from "./components/auction/AuctionDetails";
import AuctionPage from "./pages/AuctionPage";

const router = createBrowserRouter([
	{
		path: "/auction",
		element: <AuctionPage />,
	},
	{
		path: "/auction/:id",
		element: <AuctionDetails />,
	},
	{ path: "/", element: <div>Home</div> },
	// { path: "/", element: <div>Home</div> },
	// { path: "/product", element: <Product /> },
	// { path: "/pricing", element: <Pricing /> },
	// { path: "/login", element: <Login /> },
	// { path: "/app", element: <AppLayout /> },
	// { path: "*", element: <PageNotFound /> },
]);

function App() {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
