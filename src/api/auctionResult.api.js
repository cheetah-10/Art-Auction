import axios from "axios";
const BASE_URL = "http://localhost:5000/api/AuctionResult";

// get my wins
export const getMyWinsApi = async (token) => {
    const res = await axios.get(`${BASE_URL}/my-wins`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
// get auction result by id
export const getAuctionResultByIdApi = async (token, id) => {
    const res = await axios.get(`${BASE_URL}/artwork/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
// get auction result details by id (only for admin)
export const getAuctionResultDetailsByIdApi = async (token, id) => {
    const res = await axios.get(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
// get all auction results 
export const getAllAuctionResultsApi = async (token) => {
    const res = await axios.get(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}