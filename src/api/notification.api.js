import axios from "axios";
const BASE_URL = "http://localhost:5000/api/Notification";

// get my notifications
export const getMyNotificationsApi = async (token) => {
    const res = await axios.get(`${BASE_URL}/my`, {   
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return res.data;
};

// mark a notification as read
export const markAsReadApi = async (notificationId, token) => {
    const res = await axios.put(`${BASE_URL}/mark-read/${notificationId}`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.data;
}
// mark all notifications as read
export const markAllAsReadApi = async (token) => {
    const res = await axios.put(`${BASE_URL}/mark-all-read`, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.data;
} 
// delete a notification
export const deleteNotificationApi = async (notificationId, token) => {
    const res = await axios.delete(`${BASE_URL}/${notificationId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.data;
}
// delete all notifications
export const deleteAllNotificationsApi = async (token) => {
    const res = await axios.delete(`${BASE_URL}/clear-all`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.data;
}
