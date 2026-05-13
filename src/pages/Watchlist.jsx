import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyWatchlistApi, removeFromWatchlistApi } from '../api/watchlist.api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Trash2, ExternalLink, Clock, Gavel, HeartOff } from 'lucide-react';
import Loader from '../components/Loader/Loader';
import { useWatchlist } from '../hooks/useWatchlist';

const Watchlist = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:5000';
    const { addToWatchlist, handleRemove, fetchWatchlist, watchlist, loading } = useWatchlist(token);

    useEffect(() => {
        if (token) {
            fetchWatchlist();
        }
    }, [token]);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-art-navy-100 pt-28 pb-20 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Minimalist Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-art-gold-20 pb-6 mb-8 gap-4">
                    <div>
                        <h1 className="font-serif text-3xl italic text-art-navy-100 dark:text-white">Curated Watchlist</h1>
                        <p className="text-art-navy-40 text-xs uppercase tracking-[0.2em] mt-1">Total Pieces: {watchlist.length}</p>
                    </div>
                    <Link to="/auctions" className="text-art-gold-100 text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
                        + Add More Masterpieces
                    </Link>
                </div>

                {watchlist.length === 0 ? (
                    <div className="text-center py-32">
                        <HeartOff className="mx-auto text-art-navy-20 mb-4" size={40} />
                        <p className="text-art-navy-40 font-serif italic text-lg">Your gallery is quiet today.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="hidden md:grid grid-cols-12 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-art-navy-40 border-b border-art-gold-10">
                            <div className="col-span-5">Masterpiece</div>
                            <div className="col-span-2">Current Bid</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Time Left</div>
                            <div className="col-span-1 text-right">Action</div>
                        </div>

                        {watchlist.map((item) => (
                            <div
                                key={item.artworkId}
                                onClick={() => navigate(`/auction-details/${item.artworkId}`)}
                                className="grid grid-cols-1 md:grid-cols-12 items-center px-4 md:px-6 py-4 bg-white dark:bg-art-navy-90 border border-transparent hover:border-art-gold-20 hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="col-span-5 flex items-center gap-4 mb-4 md:mb-0">
                                    <div className="w-12 h-16 bg-art-navy-20 flex-shrink-0 overflow-hidden">
                                        <img
                                            src={"https://i.pinimg.com/736x/b6/10/f1/b610f182a716fdab9b9e50d742243b62.jpg"}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-lg text-art-navy-100 dark:text-white group-hover:text-art-gold-100 transition-colors">{item.title}</h3>
                                        <p className="text-[10px] text-art-navy-40 uppercase">Ref: #00{item.artworkId}</p>
                                    </div>
                                </div>

                                <div className="col-span-2 mb-2 md:mb-0">
                                    <span className="md:hidden text-[10px] text-art-navy-40 uppercase block">Current Bid: </span>
                                    <span className="text-lg font-bold text-art-navy-100 dark:text-art-gold-100">${item.currentPrice}</span>
                                </div>

                                <div className="col-span-2 mb-2 md:mb-0">
                                    <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-tighter border ${item.auctionStatus === 'Active' ? 'text-green-600 border-green-200 bg-green-50' : 'text-art-gold-100 border-art-gold-20 bg-art-gold-10/10'
                                        }`}>
                                        {item.auctionStatus}
                                    </span>
                                </div>

                                <div className="col-span-2 flex items-center gap-2 text-art-navy-60 dark:text-art-navy-40 mb-4 md:mb-0">
                                    <Clock size={14} className="text-art-gold-100" />
                                    <span className="text-xs">{new Date(item.auctionEndTime).toLocaleDateString()}</span>
                                </div>

                                <div className="col-span-1 flex justify-end gap-3">
                                    <button
                                        onClick={(e) => handleRemove(e, item.artworkId)}
                                        className="p-2 text-art-navy-20 hover:text-art-terracotta-100 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <div className="p-2 text-art-navy-20 group-hover:text-art-gold-100 md:hidden">
                                        <ExternalLink size={18} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Watchlist;