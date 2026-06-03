import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { buyNowArtworkApi } from "../api/artwork.api";

export const useBids = (token, id) => {
    const navigate = useNavigate();

    const handleBuyNow = async () => {
        if (!token){
            toast.error("Please Login First")
        }
        try {
            await buyNowArtworkApi(token, id);
            toast.success("Artwork purchased successfully!");
            navigate('/my-wins');
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to purchase artwork");
        }
    };

    return {
        handleBuyNow
    };
};