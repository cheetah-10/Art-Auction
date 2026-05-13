import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from "../../context/AuthContext.jsx";
import toast from 'react-hot-toast';
import { Gavel, Trash2, Edit3, Play, XCircle, Calendar, Trophy, ChevronLeft } from 'lucide-react';
import Loader from '../../components/Loader/Loader.js';
import { useArtworkManagement } from '../../hooks/useArtworkManagement.js';
import ArtworkStats from '../../components/ArtworkManagement/ArtworkStats.jsx';
import ExtendAuctionModal from '../../components/ArtworkManagement/ExtendAuctionModal.jsx';
import AuctionResultModal from '../../components/ArtworkManagement/AuctionResultModal.jsx';
import BidsTable from '../../components/ArtworkManagement/BidsTable.jsx';

const ArtworkManagement = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:5000';

    const {
        artwork,
        bids,
        loading,
        showExtendModal,
        setShowExtendModal,
        newEndTime,
        setNewEndTime,
        auctionResultModal,
        setAuctionResultModal,
        auctionResult,
        handleStart,
        handleClose,
        handleDelete,
        handleExtend,
        handleGetAuctionResult,
        fetchData
    } = useArtworkManagement(token, id);



    useEffect(() => {
        if (!token || !id) return;
        fetchData();
    }, [token, id]);


    if (loading) return <Loader />;
    if (!artwork) return <div className="text-center py-20 dark:text-white">Artwork not found.</div>;

    return (
        <div className="min-h-screen bg-[#FBFBFB] dark:bg-art-navy-100 py-10 px-4">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header & Back Button */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <button onClick={() => navigate(-1)} className="flex items-center text-xs uppercase tracking-widest text-art-navy-60 dark:text-art-gold-40 hover:text-art-gold-100 transition-colors">
                        <ChevronLeft size={16} /> Back to Collection
                    </button>
                    <div className="flex gap-2">
                        <button onClick={() => navigate(`/edit-artwork/${id}`)} className="flex items-center px-4 py-2 bg-white dark:bg-art-navy-80 border border-art-gold-20 text-art-navy-100 dark:text-white text-xs font-bold uppercase tracking-widest hover:border-art-gold-100 transition-all">
                            <Edit3 size={14} className="mr-2" /> Edit
                        </button>
                        <button onClick={handleDelete} className="flex items-center px-4 py-2 bg-art-terracotta-100 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all">
                            <Trash2 size={14} className="mr-2" /> Delete
                        </button>
                    </div>
                </div>

                {/* Main Dashboard Stats */}
                <ArtworkStats artwork={artwork} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Artwork & Control Panel */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white dark:bg-art-navy-80 border border-art-gold-20 p-2 shadow-xl">
                            <img src={`${baseUrl}${artwork.image}` || 'https://i.pinimg.com/736x/b6/10/f1/b610f182a716fdab9b9e50d742243b62.jpg'}
                                alt={artwork.title} className="w-full h-64 object-cover" />
                            <div className="p-4">
                                <h2 className="font-serif italic text-xl text-art-navy-100 dark:text-art-gold-100">{artwork.title}</h2>
                                <p className="text-xs text-art-navy-60 dark:text-art-navy-40 uppercase tracking-widest mt-1">{artwork.categoryName}</p>
                            </div>
                        </div>

                        {/* Auction Management Controls */}
                        <div className="bg-white dark:bg-art-navy-80 border border-art-gold-20 p-6 space-y-4">
                            {(artwork.auctionStatus !== 'Ended' || artwork.auctionStatus !== 'Sold') && (
                                <h3 className="text-xs font-bold uppercase tracking-widest text-art-navy-100 dark:text-white border-b border-art-gold-20 pb-2"> Auction Controls</h3>
                            )}

                            <div className="grid grid-cols-1 gap-3">
                                {artwork.auctionStatus === 'NotStarted' && (
                                    <ControlButton onClick={handleStart} icon={<Play size={16} />} label="Start Auction Now" color="bg-green-600" />
                                )}

                                {artwork.auctionStatus === 'Active' && (
                                    <>
                                        <ControlButton onClick={handleClose} icon={<XCircle size={16} />} label="Close Auction" color="bg-art-terracotta-100" />
                                        <ControlButton onClick={() => setShowExtendModal(true)} icon={<Calendar size={16} />} label="Extend Duration" color="bg-art-navy-100 dark:bg-art-gold-100" textColor="text-white dark:text-art-navy-100" />
                                    </>
                                )}
                                {artwork.auctionStatus === 'Sold' && (
                                    <ControlButton onClick={handleGetAuctionResult} icon={<Trophy size={16} />} label="View Auction Result" color="bg-blue-600" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Bid History */}
                    <div className="lg:col-span-8">
                        <BidsTable bids={bids} />
                    </div>
                </div>

                {/* Extend Auction Modal */}
                {showExtendModal && (
                    <ExtendAuctionModal
                        show={showExtendModal}
                        onClose={() => setShowExtendModal(false)}
                        onSubmit={handleExtend}
                        newEndTime={newEndTime}
                        setNewEndTime={setNewEndTime}
                    />
                )}
                {auctionResultModal && (
                    <AuctionResultModal
                        show={auctionResultModal}
                        onClose={() => setAuctionResultModal(false)}
                        result={auctionResult}
                    />
                )}
            </div>
        </div>
    );
};

// Small Helper Components

const ControlButton = ({ onClick, icon, label, color, textColor = "text-white" }) => (
    <button onClick={onClick} className={`w-full flex items-center justify-center p-3 ${color} ${textColor} text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all`}>
        <span className="mr-2">{icon}</span> {label}
    </button>
);



export default ArtworkManagement;