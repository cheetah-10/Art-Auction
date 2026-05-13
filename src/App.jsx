import { useState } from 'react'
import './index.css'
import Layout from './components/Layout/Layout'
import { createBrowserRouter } from "react-router-dom"
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'
// import { Offline } from 'react-detect-offline'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Profile from './pages/auth/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import ArtworkForm from './components/Artwork/ArtworkForm.jsx'
import MyArtworks from './pages/artworks/my-artworks.jsx'
import ArtworkManagement from './pages/artworks/ArtworkManagement.jsx'
import AuctionsPage from './pages/Auction/Auctions.jsx'
import AuctionDetails from './pages/Auction/AuctionDetails.jsx'
import NotFound from './pages/Notfound.jsx'
import Watchlist from './pages/Watchlist.jsx'
import Notifications from './pages/Notifications.jsx'
import Categories from './pages/Categories.jsx'
import CategoryDetails from './pages/CategoryDetails.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'
import AdminOverview from './pages/admin/AdminDashboard.jsx'
import AdminArtworks from './pages/admin/AdminArtworks.jsx'
import AdminCategories from './pages/admin/AdminCategories.jsx'
import MyWinsPage from './pages/Auction/My-wins.jsx'
import MyBids from './pages/Auction/My-bids.jsx'
import { NotifProvider } from './context/NotificationContex.jsx'
import AdminTags from './pages/admin/AdminTags.jsx'
import Forbidden from './pages/Forbidden.jsx'

let routing = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <AuctionsPage /> },
			{ path: 'Register', element: <Register></Register> },
			{ path: 'login', element: <Login></Login> },
			{ path: 'profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
			{ path: 'auctions', element: <AuctionsPage /> },
			{ path: 'auction-details/:id', element: <AuctionDetails /> },
			{ path: 'upload-artwork', element: <ProtectedRoute allowedRoles={['Artist']}><ArtworkForm /></ProtectedRoute> },
			{ path: 'edit-artwork/:id', element: <ProtectedRoute allowedRoles={['Artist']}><ArtworkForm /></ProtectedRoute> },
			{ path: 'my-artworks', element: <ProtectedRoute allowedRoles={['Artist']}><MyArtworks /></ProtectedRoute> },
			{ path: 'watchlist', element: <ProtectedRoute allowedRoles={['Buyer']}><Watchlist /></ProtectedRoute> },
			{ path: 'notifications', element: <ProtectedRoute allowedRoles={['Artist', 'Admin', 'Buyer']}><Notifications /></ProtectedRoute> },
			{ path: 'categories', element: <Categories /> },
			{ path: 'my-wins', element: <ProtectedRoute allowedRoles={['Buyer']}><MyWinsPage /></ProtectedRoute> },
			{ path: 'my-bids', element: <ProtectedRoute allowedRoles={['Buyer']}><MyBids /></ProtectedRoute> },
			{ path: `category/:id`, element: <CategoryDetails /> },
			{ path: `artwork-management/:id`, element: <ProtectedRoute allowedRoles={['Artist']}><ArtworkManagement /></ProtectedRoute> },
			{ path: `forbidden`, element: <Forbidden /> },
			{ path: '*', element: <NotFound></NotFound> },
		]
	},
	{
		/* Admin Routes */
		path: "/admin", 
		element: <ProtectedRoute allowedRoles={['Admin']}><AdminLayout /></ProtectedRoute>,
		children: [
			{ index: true, element: <ProtectedRoute allowedRoles={['Admin']}><AdminOverview /></ProtectedRoute> },
			{
				path: "users", element: <ProtectedRoute allowedRoles={['Admin']}>
					<AdminUsers />
				</ProtectedRoute>
			},
			{
				path: "artworks",
				element: (
					<ProtectedRoute allowedRoles={['Admin']}>
						<AdminArtworks />
					</ProtectedRoute>
				)
			},
			{
				path: "categories",
				element: (
					<ProtectedRoute allowedRoles={['Admin']}>
						<AdminCategories />
					</ProtectedRoute>
				)
			},
			{
				path: "tags",
				element: (
					<ProtectedRoute allowedRoles={['Admin']}>
						<AdminTags />
					</ProtectedRoute>
				)
			}
		]
	}
])
function App() {

	return (
		<>
			<AuthProvider>
				<NotifProvider>
					<RouterProvider router={routing} />
					<Toaster

						toastOptions={{
							duration: 750,
							style: {
								zIndex: 99999,
							},
						}} />
					{/* <Offline> */}
					{/* <div className="bg-black text-white text-center  fixed bottom-5  left-5"> internet corrupted</div> */}
					{/* </Offline> */}
				</NotifProvider>
			</AuthProvider>



		</>
	)
}

export default App
