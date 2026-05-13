import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getArtworkByIdApi,
    deleteArtworkApi,
    startAuctionApi,
    closeAuctionApi,
    extendAuctionApi
} from "../api/artwork.api";

import { getBidsByArtworkIdApi } from "../api/bid.api";
import { getAuctionResultByIdApi } from "../api/auctionResult.api";
import createConnection from "../api/auctionHub";

export const useArtworkManagement = (token, id) => {
    const navigate = useNavigate();

    const [artwork, setArtwork] = useState(null);
    const [bids, setBids] = useState([]);
    const [bidAmount, setBidAmount] = useState('');

    const [loading, setLoading] = useState(true);

    const [showExtendModal, setShowExtendModal] = useState(false);
    const [newEndTime, setNewEndTime] = useState("");

    const [auctionResultModal, setAuctionResultModal] = useState(false);
    const [auctionResult, setAuctionResult] = useState(null);

    const fetchData = async () => {
        try {
            const [artRes, bidRes] = await Promise.all([
                getArtworkByIdApi(id),
                getBidsByArtworkIdApi(id)
            ]);

            setArtwork(artRes);
            setBids(bidRes);

            const current = artRes.currentPrice || 0;
            setBidAmount(current + 11);

        } catch (err) {
            toast.error("Failed to load masterpiece details");
        } finally {
            setLoading(false);
        }
    };

       useEffect(() => {
        const { startConnection, stopConnection } = createConnection(id, token, (data) => {
            setArtwork(prev => ({ ...prev, currentPrice: data.amount }));
            setBids(prev => [data, ...prev]);
            setBidAmount(data.amount + 11);
            toast.success(`New bid placed: $${data.amount}`);
        }
        );
        startConnection();
        return () => {
            stopConnection();
        };
    }, [id, token]);

    // ===== ACTIONS =====

    const handleStart = async () => {
        try {
            await startAuctionApi(token, id);
            toast.success("Auction started successfully!");
            fetchData();
        } catch {
            toast.error("Error starting auction.");
        }
    };

    const handleClose = async () => {
        if (!window.confirm("Are you sure?")) return;

        try {
            await closeAuctionApi(token, id);
            toast.success("Auction closed.");
            fetchData();
        } catch {
            toast.error("Error closing auction.");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete permanently?")) return;

        try {
            await deleteArtworkApi(token, id);
            toast.success("Artwork deleted.");
            navigate("/my-artworks");
        } catch {
            toast.error("Error deleting artwork.");

        }
    };

    const handleExtend = async (e) => {
        e.preventDefault();

        try {
            await extendAuctionApi(token, id, newEndTime);
            toast.success("Auction extended!");
            setShowExtendModal(false);
            fetchData();
        } catch {
            toast.error("Error extending auction.");
        }
    };

    const handleGetAuctionResult = async () => {
        try {
            const result = await getAuctionResultByIdApi(token, id);
            setAuctionResult(result);
            setAuctionResultModal(true);
        } catch {
            toast.error("Error fetching auction result.");
        }
    };

    return {
        artwork,
        setArtwork,
        bids,
        setBids,
        loading,
        bidAmount,
        setBidAmount,
        showExtendModal,
        setShowExtendModal,

        newEndTime,
        setNewEndTime,

        auctionResultModal,
        setAuctionResultModal,

        auctionResult,

        // actions
        handleStart,
        handleClose,
        handleDelete,
        handleExtend,
        handleGetAuctionResult,

        // refresh
        fetchData
    };
};