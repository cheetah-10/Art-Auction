export const USER_ROLES = {
	ADMIN: "admin",
	BUYER: "buyer",
	ARTIST: "artist",
};

export const ACTIONS = {
	LOGIN: "login",
	LOGOUT: "logout",
};

export const ACCOUNT_STATUS = {
	APPROVED: "APPROVED",
	PENDING: "PENDING",
	REJECTED: "REJECTED",
};

export const ARTWORK_STATUS = {
	APPROVED: "APPROVED",
	PENDING: "PENDING",
	REJECTED: "REJECTED",
	AUCTION: "AUCTION",
};

export const WS_URL = import.meta.env.VITE_API_URL;
