import { useState, useEffect } from "react";
import { getAllArtworksApi } from "../api/artwork.api";

export const useAuctions = ( filters) => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);

            const cleanedFilters = {};

            Object.keys(filters).forEach((key) => {
                const value = filters[key];

                if (
                    value !== "" &&
                    value !== null &&
                    value !== undefined &&
                    !(Array.isArray(value) && value.length === 0)
                ) {
                    cleanedFilters[key] = value;
                }
            });

            try {
                const response = await getAllArtworksApi( cleanedFilters);
                setArtworks(response);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ filters]);

    return { artworks, loading };
};