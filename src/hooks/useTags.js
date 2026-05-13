import { useState, useEffect } from "react";
import { createTagApi, getAllTagsApi } from "../api/tag.api";

export const useTags = (token) => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTags = async () => {
        try {
            const data = await getAllTagsApi(token);
            setTags(data);
        } catch (err) {
            console.error("Error fetching tags:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) return;


        fetchTags();
    }, [token]);

    const createTag = async (data) => {
        try {
            await createTagApi(token, data);
            await fetchTags();
            toast.success("Tag created successfully");
        } catch (err) {
            console.error(err);
            toast.error("Failed to create tag");
        }
    };

    return { tags, loading, createTag };
};