import { useState, useEffect, useContext } from "react";
import { approveArtworkApi, getAllArtworksApi, getPendingArtworksApi, getRejectedArtworksApi, rejectArtworkApi } from "../api/artwork.api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export const useArtworks = () => {
    const { token } = useContext(AuthContext)
    const [artworks, setArtworks] = useState([]);
    const [pendingArtworks, setPendingArtworks] = useState([]);
    const [rejectedArtworks, setRejectedArtworks] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await getAllArtworksApi();
            setArtworks(response);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingArtworks = async () => {
        setLoading(true);
        try {
            const res = await getPendingArtworksApi(token);
            setPendingArtworks(res);
        } catch (error) {
             if (
                error.response?.status === 404 &&
                error.response?.data?.includes("No pending artworks found")
            ) {
                setRejectedArtworks([]);
            } else {
                toast.error("Failed to load pending artworks data");
            }
        } finally {
            setLoading(false);
        }
    };
    const fetchRejectedArtworks = async () => {
        setLoading(true);
        try {
            const res = await getRejectedArtworksApi(token);
            setRejectedArtworks(res);
        } catch (error) {
            if (
                error.response?.status === 404 &&
                error.response?.data?.includes("No rejected artworks found")
            ) {
                setRejectedArtworks([]);
            } else {
                toast.error("Failed to load rejected artworks data");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (e, id) => {
        e.stopPropagation();
        try {
            await approveArtworkApi(token, id);
            toast.success("Artwork approved successfully");
             setPendingArtworks(prev =>
            prev.filter(item => item.artworkId !== id)
        );

        setArtworks(prev =>
            prev.map(item =>
                item.artworkId === id
                    ? { ...item, auctionStatus: "Active" }
                    : item
            )
        );
        } catch (error) {
            toast.error("Failed to approve artwork");
        }
    };
    const handleReject = async (e, id) => {
        e.stopPropagation();
        try {
            await rejectArtworkApi(token, id);
            toast.success("Artwork rejected successfully");
            const rejectedItem = pendingArtworks.find(
            item => item.artworkId === id
        );

        setPendingArtworks(prev =>
            prev.filter(item => item.artworkId !== id)
        );

        if (rejectedItem) {
            setRejectedArtworks(prev => [
                rejectedItem,
                ...prev
            ]);
        }

        } catch (error) {
            toast.error("Failed to reject artwork");
            console.log(error);
        }
    };
    useEffect(() => {
        if (!token) return;

        fetchData();
        fetchRejectedArtworks();
        fetchPendingArtworks();
    }, [token]);


    return { artworks, loading, pendingArtworks, rejectedArtworks, handleApprove, handleReject };
};