import { useState, useEffect } from "react";
import { getAllTagsApi } from "../api/tag.api";
import { deleteAllNotificationsApi, deleteNotificationApi, getMyNotificationsApi, markAllAsReadApi, markAsReadApi } from "../api/notification.api";

export const useNotifications = (token, id) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {
        if (!token) return;
        try {
            const data = await getMyNotificationsApi(token);
            setNotifications(data);
        } catch (err) {
            console.error(err);
            toast.error("Could not sync your notifications");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
    if (!token) return;

    fetchNotifications();

    const interval = setInterval(() => {
        fetchNotifications();
    }, 3000);

    return () => clearInterval(interval);

}, [token]);

    const handleMarkRead = async (id) => {
        try {
            await markAsReadApi(id, token);
            fetchNotifications();
        } catch (err) {
            toast.error("Error updating notification");
        }
    };

    const handleMarkAllRead = async () => {
        try {
            await markAllAsReadApi(token);
            fetchNotifications();
            toast.success("All marked as read");
        } catch (err) {
            toast.error("Action failed");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteNotificationApi(id, token);
            fetchNotifications();
            toast.success("Notification deleted");
        } catch (err) {
            toast.error("Could not delete");
        }
    };

    const handleClearAll = async () => {
        if (!window.confirm("Are you sure you want to clear all notifications?")) return;
        try {
            await deleteAllNotificationsApi(token);
            fetchNotifications();
            toast.success("Inbox cleared");
        } catch (err) {
            toast.error("Action failed");
        }
    };

    return {
        fetchNotifications,
        handleClearAll,
        handleDelete,
        handleMarkAllRead,
        handleMarkRead,
        notifications,
        setNotifications,
        loading
    };
};