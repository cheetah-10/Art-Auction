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
            toast.error("Failed to load artworks data");
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
            toast.error("Failed to load artworks data");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (e, id) => {
        e.stopPropagation();
        try {
            await approveArtworkApi(token, id);
            toast.success("Artwork approved successfully");
            fetchPendingArtworks();
            fetchData();
            fetchRejectedArtworks();
        } catch (error) {
            toast.error("Failed to approve artwork");
        }
    };
    const handleReject = async (e, id) => {
        e.stopPropagation();
        try {
            await rejectArtworkApi(token, id);
            toast.success("Artwork rejected successfully");
            fetchRejectedArtworks();
            fetchData();
            fetchPendingArtworks();

        } catch (error) {
            toast.error("Failed to reject artwork");
        }
    };
    useEffect(() => {
        fetchData();
        fetchRejectedArtworks();
        fetchPendingArtworks();
        handleReject()
        handleApprove()
    }, [token ]);


    return { artworks, loading, pendingArtworks, rejectedArtworks, handleApprove, handleReject };
};