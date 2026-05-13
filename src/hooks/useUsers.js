import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    getAllUsersApi,
    getPendingUsersApi,
    getRejectedUsersApi
} from "../api/auth.api";
import toast from "react-hot-toast";

export const useUsers = () => {
    const { token } = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [pendingUsers, setPendingUsers] = useState([]);
    const [rejectedUsers, setRejectedUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await getAllUsersApi(token);
            setUsers(response);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load users");
        }
    };

    const fetchPendingUsers = async () => {
        try {
            const res = await getPendingUsersApi(token);
            setPendingUsers(res);
        } catch (error) {
            toast.error("Failed to load pending users");
        }
    };

    const fetchRejectedUsers = async () => {
        try {
            const res = await getRejectedUsersApi(token);
            setRejectedUsers(res);
        } catch (error) {
            toast.error("Failed to load rejected users");
        }
    };

    useEffect(() => {
        if (!token) return;

        const loadData = async () => {
            setLoading(true);

            await Promise.all([
                fetchData(),
                fetchPendingUsers(),
                fetchRejectedUsers()
            ]);

            setLoading(false);
        };

        loadData();
    }, [token]);

    return {
        users,
        loading,
        pendingUsers,
        rejectedUsers
    };
};