const BACKEND_PORT = "http://localhost:5200";

export const API = {
	AUCTION: {
		GET_AUCTION_BY_ID: `${BACKEND_PORT}/api/auctions/`, // to be used: `${API.GET_AUCTION_BY_ID}${auctionId}`
		GET_ALL_AUCTIONS: `${BACKEND_PORT}/api/auctions`,
		ADD_TO_WATCHLIST: `${BACKEND_PORT}/api/watchlist/`,
	},

	LOGIN: `${BACKEND_PORT}/Account/Login`,

	USER: {
		GET_USER: `${BACKEND_PORT}/me`,
		GET_MY_WATCHLIST: `${BACKEND_PORT}/api/watchlist`,
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
