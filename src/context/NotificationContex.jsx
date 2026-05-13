// src/context/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { AuthContext } from "./AuthContext";

export const NotificationContext = createContext();

export function NotifProvider({ children }) {
    const { token } = useContext(AuthContext);

    const { notifications } = useNotifications(token);
    const notLength = notifications.filter(n => !n.isRead).length || 0;

    return (
        <NotificationContext.Provider value={{ notLength }}>
            {children}
        </NotificationContext.Provider>
    );
}