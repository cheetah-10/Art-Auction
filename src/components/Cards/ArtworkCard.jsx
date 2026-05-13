import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext.jsx";

export default function ArtworkCard({ art }) {
      const getStatusStyle = (status) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700 border-green-200';
            case 'NotStarted': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Ended': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };
     const baseUrl = 'http://localhost:5000';   
    return (
        <>
            <div key={art.artworkId} className="group bg-white dark:bg-art-navy-80 border border-art-gold-20 hover:border-art-gold-100 transition-all duration-500 shadow-sm hover:shadow-2xl">

                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                        src={`${baseUrl}${art.artworkImage}`|| 'https://i.pinimg.com/736x/b6/10/f1/b610f182a716fdab9b9e50d742243b62.jpg' }
            
                        alt={art.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Status Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-tighter border ${getStatusStyle(art.auctionStatus)}`}>
                        {art.auctionStatus}
                    </div>
                    {/* Category Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <span className="text-white/80 text-[10px] uppercase tracking-[0.2em]">{art.categoryName}</span>
                        <h3 className="text-white font-serif italic text-xl">{art.title}</h3>
                    </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-end border-b border-art-gold-20 pb-4">
                        <div>
                            <p className="text-[10px] text-art-navy-40 uppercase">Current Bid</p>
                            <p className="text-xl font-bold text-art-navy-100 dark:text-white">${art.currentPrice}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-art-gold-100 uppercase">Buy Now</p>
                            <p className="text-lg font-serif italic text-art-gold-100">${art.buyNowPrice}</p>
                        </div>
                    </div>

                    {/* Auction Timing */}
                    <div className="flex justify-between text-[11px] text-art-navy-60 dark:text-art-navy-40 italic">
                        <span>Starts: {new Date(art.auctionStartTime).toLocaleDateString()}</span>
                        <span>Ends: {new Date(art.auctionEndTime).toLocaleDateString()}</span>
                    </div>

                    {/* Tags */}
                    {art.tags && art.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {art.tags.map((tag, index) => (
                                <span key={index} className="text-[9px] bg-art-navy-20/10 dark:bg-art-gold-20/10 text-art-navy-60 dark:text-art-gold-40 px-2 py-0.5 rounded-full border border-art-gold-20/30">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Action Button */}
                    <Link
                        to={`/artwork-management/${art.artworkId}`}
                        className="block w-full text-center py-3 mt-4 border border-art-navy-100 dark:border-art-gold-100 text-art-navy-100 dark:text-art-gold-100 text-xs font-bold uppercase tracking-widest hover:bg-art-navy-100 hover:text-white dark:hover:bg-art-gold-100 dark:hover:text-art-navy-100 transition-colors"
                    >
                        View Dashboard
                    </Link>
                </div>
            </div>

        </>
    )
}
