import axios from "axios";
const BASE_URL = "http://localhost:5000/api/Bid";

export const placeBidApi = async (token, data) => {
    const res = await axios.post(`${BASE_URL}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

export const getBidsByArtworkIdApi = async ( artworkId) => {
    const res = await axios.get(`${BASE_URL}/history/${artworkId}`);
    return res.data;
};


export const getMyBidsApi = async (token) => {
    const res = await axios.get(`${BASE_URL}/my-bids`, {
        headers: {  
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};