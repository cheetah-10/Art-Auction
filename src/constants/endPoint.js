// const BACKEND_PORT = "http://localhost:5200";
const BACKEND_PORT = import.meta.env.VITE_API_URL;

export const API = {
	LOGIN: `${BACKEND_PORT}/account/login`,
	LOGOUT: `${BACKEND_PORT}/account/logout`,
	REGISTER: `${BACKEND_PORT}/account/register`,

	AUCTION: {
		GET_AUCTION_BY_ID: `${BACKEND_PORT}/api/auctions/`, // to be used: `${API.GET_AUCTION_BY_ID}${auctionId}`
		GET_ALL_AUCTIONS: `${BACKEND_PORT}/api/auctions`,
		ADD_TO_WATCHLIST: `${BACKEND_PORT}/api/watchlist/`,
	},

	ARTWORK: {
		GET_MY_ARTWORK: `${BACKEND_PORT}/api/artwork/my-artworks`,
		GET_ARTWORK_BY_ID: `${BACKEND_PORT}/api/artwork/`,
		GET_PENDING_ARTWORK: `${BACKEND_PORT}/api/admin/artwork-applications`,
		PUT_UPDATED_ARTWORK: `${BACKEND_PORT}/api/artwork/`,
		PUT_APPROVE_ARTWORK: `${BACKEND_PORT}/api/admin/approve-artwork/`,
		PUT_REJECT_ARTWORK: `${BACKEND_PORT}/api/admin/reject-artwork/`,
		POST_NEW_ARTWORK: `${BACKEND_PORT}/api/artwork/create-artwork`,
		DELETE_ARTWORK: `${BACKEND_PORT}/api/artwork/`,
	},

	USER: {
		GET_USER: `${BACKEND_PORT}/account/me`,
		GET_MY_WATCHLIST: `${BACKEND_PORT}/api/watchlist`,
		GET_PENDING_ARTISTS: `${BACKEND_PORT}/api/admin/artist-applications`,
		PUT_APPROVE_ARTIST_BY_ID: `${BACKEND_PORT}/api/admin/approve-artist/`,
		PUT_REJECT_ARTIST_BY_ID: `${BACKEND_PORT}/api/admin/reject-artist/`,
	},

	TAG: {
		GET_ALL_TAGS: `${BACKEND_PORT}/api/tag`,
	},

	CATEGORY: {
		GET_ALL_CATEGORIES: `${BACKEND_PORT}/api/category`,
	},

	BIDS: {
		GET_BIDS_BY_AUCTION_ID: `${BACKEND_PORT}/api/bid/getbids/`,
		POST_NEW_BID: `${BACKEND_PORT}/api/bid/placebid`,
	},
};

export const WEB_SOCKET = {
	bidPlaced: "/bidAuction",
};
