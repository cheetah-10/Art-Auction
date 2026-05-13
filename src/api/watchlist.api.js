import axios from "axios";
const BASE_URL = "http://localhost:5000/api/Watchlist";

// Add to Watchlist
export const addToWatchlistApi = async (token, artworkId) => {
    const res = await axios.post(`${BASE_URL}/add/?artworkId=${artworkId}`, null, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

// Remove from Watchlist
export const removeFromWatchlistApi = async (token, artworkId) => {
    const res = await axios.delete(`${BASE_URL}/remove/?artworkId=${artworkId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

// Get My Watchlist
export const getMyWatchlistApi = async (token) => {
    const res = await axios.get(`${BASE_URL}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};
