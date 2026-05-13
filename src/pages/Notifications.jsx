import React, { useState, useEffect, useContext } from 'react';
import {
    getMyNotificationsApi,
    markAsReadApi,
    markAllAsReadApi,
    deleteNotificationApi,
    deleteAllNotificationsApi
} from '../api/notification.api';
import { AuthContext } from '../context/AuthContext';
import { Bell, CheckCheck, Trash2, Clock, Circle, BellOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader/Loader';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationContext } from '../context/NotificationContex';

const Notifications = () => {
    const { token } = useContext(AuthContext);
    const { fetchNotifications,
        handleClearAll,
        handleDelete,
        handleMarkAllRead,
        handleMarkRead,
        notifications,
        setNotifications,
        loading } = useNotifications(token)
    const { notLength } = useContext(NotificationContext)

    // Helper to format date
    const formatDate = (dateString) => {
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-art-navy-100 pt-28 pb-20 px-4">
            <div className="max-w-3xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 border-b border-art-gold-10 pb-6">
                    <div>
                        <h1 className="font-serif text-3xl italic text-art-navy-100 dark:text-white flex items-center gap-3">
                            <Bell className="text-art-gold-100" size={28} />
                            Inbox
                        </h1>
                        <p className="text-art-navy-40 text-xs uppercase tracking-widest mt-1">

                            {notLength} Unread Notifications
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleMarkAllRead}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-art-navy-60 hover:text-art-gold-100 transition-colors"
                        >
                            <CheckCheck size={14} /> Mark all read
                        </button>
                        <span className="text-art-gold-20">|</span>
                        <button
                            onClick={handleClearAll}
                            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-tighter text-art-terracotta-100 hover:opacity-70 transition-colors"
                        >
                            <Trash2 size={14} /> Clear All
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                {notifications.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-art-navy-90 border border-dashed border-art-gold-20">
                        <BellOff className="mx-auto text-art-navy-10 mb-4" size={48} />
                        <p className="text-art-navy-40 font-serif italic">Your inbox is empty</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((n) => (
                            <div
                                key={n.notificationId}
                                className={`group relative flex gap-4 p-5 transition-all border ${n.isRead
                                    ? 'bg-transparent border-transparent opacity-70'
                                    : 'bg-white dark:bg-art-navy-90 border-art-gold-10 shadow-sm'
                                    }`}
                            >
                                {/* Unread Indicator */}
                                {!n.isRead && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-art-gold-100" />
                                )}

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`text-sm font-bold uppercase tracking-wide ${n.isRead ? 'text-art-navy-60' : 'text-art-navy-100 dark:text-white'}`}>
                                            {n.title}
                                        </h3>
                                        <span className="text-[10px] text-art-navy-40 flex items-center gap-1">
                                            <Clock size={10} /> {formatDate(n.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-art-navy-60 dark:text-art-navy-40 leading-relaxed">
                                        {n.message}
                                    </p>

                                    {/* Action Buttons (Visible on Hover) */}
                                    <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {!n.isRead && (
                                            <button
                                                onClick={() => handleMarkRead(n.notificationId)}
                                                className="text-[10px] font-bold uppercase text-art-gold-100 hover:underline"
                                            >
                                                Mark as Read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(n.notificationId)}
                                            className="text-[10px] font-bold uppercase text-art-terracotta-100 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* Status Icon */}
                                <div className="flex-shrink-0">
                                    {n.isRead ? (
                                        <Circle size={8} className="text-art-navy-10 fill-art-navy-10" />
                                    ) : (
                                        <Circle size={8} className="text-art-gold-100 fill-art-gold-100 animate-pulse" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;