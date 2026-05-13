import axios from "axios";
const BASE_URL = "http://localhost:5000/api/Tag";

// Create Tag
export const createTagApi = async (token, data) => {
    const res = await axios.post(`${BASE_URL}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};

// Get All Tags
export const getAllTagsApi = async (token) => {
    const res = await axios.get(`${BASE_URL}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};

