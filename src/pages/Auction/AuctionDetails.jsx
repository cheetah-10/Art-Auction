import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { buyNowArtworkApi, getArtworkByIdApi } from '../../api/artwork.api';
import { placeBidApi } from '../../api/bid.api';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Gavel, Clock, Trophy, Heart, History } from 'lucide-react';
import Loader from '../../components/Loader/Loader';
import { useArtworkManagement } from '../../hooks/useArtworkManagement';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useBids } from '../../hooks/useBids';

const ArtworkView = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const { artwork, setArtwork, bids, setBids, loading, bidAmount, setBidAmount , fetchData } = useArtworkManagement(token, id);
    const { addToWatchlist } = useWatchlist(token, id);
    const { handleBuyNow } = useBids(token, id);
    const navigate = useNavigate()

    useEffect(() => {
        fetchData();
    }, [id, token]);


 const handlePlaceBid = async (e) => {
        e.preventDefault();
        const minBid = artwork.currentPrice + 11;
        if (!token) {
            toast.error("Please log in first to place a bid");
            return;
        }
        if (artwork.auctionStatus === "upcoming") {
            toast.error("Auction has not started yet. You cannot place a bid now.");
            return;
        }
        if (Number(bidAmount) < minBid) {
            return toast.error(`Minimum bid must be $${minBid}`);
        }
        try {
            await placeBidApi(token, { artworkId: Number(id), amount: Number(bidAmount) });
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to place bid");
        }
    };


    if (loading) return <Loader />
    if (!artwork) return <div className="text-center py-20 dark:text-white">Masterpiece not found.</div>;
    return (
        <div className="min-h-screen bg-[#FDFDFD] dark:bg-art-navy-100 pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Side: Visuals */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="relative group overflow-hidden border border-art-gold-20 bg-white dark:bg-art-navy-80 p-2 flex items-center justify-center h-[500px] md:h-[600px]">

                        <img
                            src={`http://localhost:5000${artwork.image}` || "https://i.pinimg.com/736x/b6/10/f1/b610f182a716fdab9b9e50d742243b62.jpg"}
                            alt={artwork.title}
                            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Watchlist Button */}
                        <button
                            onClick={addToWatchlist}
                            className="absolute top-6 right-6 bg-white/90 dark:bg-art-navy-100/90 p-3 rounded-full hover:text-art-terracotta-100 transition-colors shadow-xl z-10"
                        >
                            <Heart size={20} />
                        </button>

                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                </div>

                {/* Right Side: Details & Bidding */}
                <div className="lg:col-span-5 space-y-8">
                    <header className="space-y-2">
                        <span className="text-art-gold-100 uppercase tracking-[0.3em] text-[10px] font-bold">{artwork.categoryName}</span>
                        <h1 className="font-serif text-4xl italic text-art-navy-100 dark:text-white">{artwork.title}</h1>
                        <p className="text-art-navy-60 dark:text-art-navy-40 italic">By {artwork.artistName}</p>
                    </header>

                    <div className="grid grid-cols-2 gap-4 p-6 bg-art-navy-20/5 dark:bg-art-navy-80 border-l-4 border-art-gold-100">
                        <div>
                            <p className="text-[10px] uppercase text-art-navy-40 dark:text-art-navy-40 mb-1"> {artwork.auctionStatus === 'Sold' ? 'Final Price' : 'Current Price'}</p>
                            <p className="text-3xl font-bold text-art-navy-100 dark:text-art-gold-100">$ {bids[0]?.amount || artwork.currentPrice}</p>
                        </div>
                        <div className="text-right">
                            {artwork.auctionStatus !== 'Sold' && artwork.auctionStatus !== 'Ended' && (<>
                                <Trophy size={24} className="text-art-gold-100 inline-block mb-1" />
                                <p onClick={handleBuyNow}
                                    className="text-[13px] uppercase text-art-gold-100 dark:text-art-navy-40 mb-1 underline font-black ">Buy It Now</p>
                                <p className="text-xl font-medium text-art-gold-80 dark:text-art-navy-20">${artwork.buyNowPrice}</p>
                            </>
                            )}

                        </div>
                    </div>

                    {/* Bidding Form */}
                    <div className="bg-white dark:bg-art-navy-90 border border-art-gold-20 p-6 space-y-6">
                        <div className="flex items-center gap-2 text-art-navy-60 dark:text-art-gold-40">
                            <Clock size={16} />
                            <span className="text-xs uppercase tracking-widest font-bold"> Auction Ends: {new Date(artwork.auctionEndTime).toLocaleString()}</span>
                        </div>
                        {artwork.auctionStatus === 'Active' && (<>
                            <form onSubmit={handlePlaceBid} className="space-y-4">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-art-navy-40">$</span>
                                    <input
                                        type="number"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                        className="w-full bg-transparent border border-art-gold-20 py-4 pl-8 pr-4 text-art-navy-100 dark:text-white outline-none focus:border-art-gold-100"
                                        placeholder="Enter your bid"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    // disabled={artwork.auctionStatus !== 'Active'}
                                    className={`  w-full bg-art-navy-100 dark:bg-art-gold-100 text-white dark:text-art-navy-100 py-4 font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-opacity`}
                                >

                                    <Gavel size={20} />
                                    Place Bid
                                </button>
                                <p className="text-[10px] text-center text-art-navy-40 italic">Minimum bid required: ${artwork.currentPrice + 11}</p>
                            </form>
                        </>)}

                    </div>

                    {/* Bid History Accordion/List */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b border-art-gold-20 pb-2">
                            <History size={18} className="text-art-gold-100" />
                            <h3 className="text-xs uppercase font-bold tracking-widest text-art-navy-100 dark:text-white">Bid History</h3>
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                            {bids.length > 0 ? [...bids].map((bid, index) => (
                                <div key={index} className="flex justify-between items-center text-sm p-3 bg-white dark:bg-art-navy-80 border border-transparent hover:border-art-gold-20 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-art-gold-20 flex items-center justify-center text-[10px] font-bold">
                                            #{bids.length - index}
                                        </div>
                                        <span className="dark:text-white font-medium">{bid.userName || "Anonymous"}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-art-gold-100">${bid.amount}</p>
                                        <p className="text-[10px] text-art-navy-40">{new Date(bid.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center text-xs text-art-navy-40 py-4">No bids yet. Be the first!</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="pt-6 border-t border-art-gold-20">
                        <h4 className="text-xs uppercase font-bold text-art-navy-40 mb-3">About this Masterpiece</h4>
                        <p className="text-art-navy-100 dark:text-art-navy-20 leading-relaxed text-sm">
                            {artwork.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {artwork.tags?.map((tag, i) => (
                                <span key={i} className="text-[9px] uppercase px-2 py-1 bg-art-navy-20/10 dark:bg-art-navy-80 text-art-navy-60 dark:text-art-gold-40">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkView;