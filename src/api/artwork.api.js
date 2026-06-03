import axios from "axios";
const BASE_URL = "http://localhost:5000/api/Artwork";

// Create Artwork
export const createArtworkApi = async (token, data) => {
    const res = await axios.post(`${BASE_URL}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};
// edit artwork
export const editArtworkApi = async (token, id, data) => {
    const res = await axios.put(`${BASE_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
// get my artworks
export const getMyArtworksApi = async (token) => {
    const res = await axios.get(`${BASE_URL}/my`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
// get specific artwork by id
export const getArtworkByIdApi = async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
}
// delete artwork
export const deleteArtworkApi = async (token, id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
//start auction 
export const startAuctionApi = async (token, id) => {
    const res = await axios.post(`${BASE_URL}/start/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
//close auction 
export const closeAuctionApi = async (token, id) => {
    const res = await axios.post(`${BASE_URL}/close/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
//extend auction
export const extendAuctionApi = async (token, id, newEndTime) => {
    const res = await axios.post(
        `${BASE_URL}/extend/${id}?newEndTime=${newEndTime}`,
        null,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );
    return res.data;
};
//get all artworks
export const getAllArtworksApi = async (filters = {}) => {
    const res = await axios.get(`${BASE_URL}`, {
        params: filters,
       paramsSerializer: (params) => {
    return Object.entries(params)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                return value.map(v => `${key}=${v}`).join("&");
            }
            return `${key}=${value}`;
        })
        .join("&");
}
    }
    );
    return res.data;
}

// get pending artworks for admin
export const getPendingArtworksApi = async (token) => {
    const res = await axios.get(`${BASE_URL}/pending`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
// get rejected artworks for admin
export const getRejectedArtworksApi = async (token) => {
    const res = await axios.get(`${BASE_URL}/rejected`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}

// approve artwork
export const approveArtworkApi = async (token, id) => {
    const res = await axios.post(`${BASE_URL}/approve/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
// reject artwork
export const rejectArtworkApi = async (token, id) => {
    const res = await axios.post(`${BASE_URL}/reject/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}
// buy now artwork
export const buyNowArtworkApi = async (token, id) => {
    const res = await axios.post(`${BASE_URL}/buy/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
}