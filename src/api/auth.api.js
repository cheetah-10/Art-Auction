// src/api/auth.api.js
import axios from "axios";
const BASE_URL = "http://localhost:5000/api/Account";
// 🔑 Register
export const registerApi = async (data) => {
    const res = await axios.post(`${BASE_URL}/register`, data);
    return res.data;
};

// 🔑 Login
export const loginApi = async (data) => {
    const res = await axios.post(`${BASE_URL}/login`, data);
    return res.data;
};

// Get profile (protected)
export const getProfileApi = async (token) => {

    const res = await axios.get(`${BASE_URL}/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const deleteAccountApi = async (token, userId) => {
    const res = await axios.delete(`${BASE_URL}/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res;
};

//  Get all users (admin)
export const getAllUsersApi = async (token) => {
  const res = await axios.get(`${BASE_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

//get pending users (admin)
export const getPendingUsersApi = async (token) => {
  const res = await axios.get(`${BASE_URL}/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return res.data
}

//get rejected users (admin)
export const getRejectedUsersApi = async (token) => {
  const res = await axios.get(`${BASE_URL}/rejected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
    return res.data
}

// Approve pending user (admin)
export const approveUserApi = async (token, userId) => {
  const res = await axios.post(`${BASE_URL}/approve/${userId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

// Reject pending user (admin)
export const rejectUserApi = async (token, userId) => {
  const res = await axios.post(`${BASE_URL}/reject/${userId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
