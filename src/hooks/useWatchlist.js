import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addToWatchlistApi, getMyWatchlistApi, removeFromWatchlistApi } from "../api/watchlist.api";

export const useWatchlist = (token, id) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [watchlist, setWatchlist] = useState([]);
    const addToWatchlist = async () => {
        if (!token) {
            toast.error("Please log in first");
            return;
        }
        try {
            await addToWatchlistApi(token, id);
            toast.success("Added to your Watchlist ❤️");
        } catch (err) {
            toast.error("Already in watchlist or failed to add");
        }
    };

    const fetchWatchlist = async () => {
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const data = await getMyWatchlistApi(token);
            setWatchlist(data);
        } catch (err) {
            if (err.response?.status === 401) {
                console.warn("Unauthorized access");
            } else {
                console.error(err);
                toast.error("Failed to load your collection");
            }
        } finally {
            setLoading(false);
        }
    };
    const handleRemove = async (e, artworkId) => {
        e.stopPropagation();
        try {
            await removeFromWatchlistApi(token, artworkId);
            setWatchlist(prev => prev.filter(item => item.artworkId !== artworkId));
            toast.success("Removed");
        } catch (err) {
            toast.error("Error removing item");
            console.log(err)
        }
    };

    return {
        addToWatchlist,
        fetchWatchlist,
        watchlist,
        loading,
        handleRemove
    };
};