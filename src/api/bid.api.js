import axios from "axios";
const BASE_URL = "http://localhost:5000/api/Bid";

// Place Bid
export const placeBidApi = async (token, data) => {
    const res = await axios.post(`${BASE_URL}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

//get bids history for specific artwork
export const getBidsByArtworkIdApi = async ( artworkId) => {
    const res = await axios.get(`${BASE_URL}/history/${artworkId}`);
    return res.data;
};


//get my bids history
export const getMyBidsApi = async (token) => {
    const res = await axios.get(`${BASE_URL}/my-bids`, {
        headers: {  
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};