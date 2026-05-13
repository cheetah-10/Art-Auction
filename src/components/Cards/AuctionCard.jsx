import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBidsByArtworkIdApi } from '../../api/bid.api';
import { AuthContext } from '../../context/AuthContext';
import { Heart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useWatchlist } from '../../hooks/useWatchlist';
import { useArtworkManagement } from '../../hooks/useArtworkManagement';

const AuctionCard = ({ artwork }) => {
    const isUpcoming = new Date(artwork.auctionStartTime) > new Date();
    const [currentPrice, setCurrentPrice] = useState(artwork.currentPrice);
    const { token } = useContext(AuthContext);
    const { addToWatchlist } = useWatchlist(token, artwork.artworkId);
    const baseUrl = 'http://localhost:5000';
      const getStatusStyle = (status) => {
        switch (status) {
            case 'Active': return 'bg-red-600 text-white animate-pulse';
            case 'NotStarted': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Ended': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };
    // console.log(artwork.artworkId, artwork.artworkImage, 'finding error')
console.log('heeloooo');


    return (
        <div className="group relative bg-white dark:bg-art-navy-80 border border-art-gold-20 overflow-hidden hover:shadow-2xl transition-all duration-500">
            {/* Image Section */}
            <div className="relative aspect-[3/4] overflow-hidden">
                <img
                    src={`${baseUrl}${artwork.artworkImage}` || 'https://i.pinimg.com/736x/b6/10/f1/b610f182a716fdab9b9e50d742243b62.jpg'}
                    alt={artwork.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg ${getStatusStyle(artwork.auctionStatus)}`}>
                    {artwork.auctionStatus === 'Active' ? 'Live Now' : artwork.auctionStatus}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 space-y-4">
                <div>
                    <p className="text-[10px] text-art-gold-100 uppercase tracking-[0.2em] mb-1">{artwork.categoryName}</p>
                    <h3 className="font-serif italic text-xl text-art-navy-100 dark:text-white truncate">{artwork.title}</h3>
                    <p className="text-xs text-art-navy-60 dark:text-art-navy-40">By {artwork.artistName}</p>
                </div>

                <div className="flex justify-between items-end border-t border-art-gold-10 pt-4">
                    <div>
                        <p className="text-[10px] uppercase text-art-navy-40">Current Bid</p>
                        <p className="text-lg font-bold text-art-navy-100 dark:text-art-gold-100">${currentPrice}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] uppercase text-art-navy-40">Buy Now</p>
                        <p className="text-sm font-medium text-art-navy-60 dark:text-art-navy-20">${artwork.buyNowPrice}</p>
                    </div>
                </div>

                {/* View Details Button */}
                <div className="flex">
                    <Link
                        to={`/auction-details/${artwork.artworkId}`}
                        className="inline-block w-full text-center py-3 bg-art-navy-100 dark:bg-transparent dark:border dark:border-art-gold-100 text-white dark:text-art-gold-100 text-xs uppercase font-bold tracking-widest hover:bg-art-gold-100 hover:text-art-navy-100 transition-colors"
                    >
                        View Auction Details
                    </Link>
                    <button
                        onClick={() => { addToWatchlist(artwork.artworkId) }}
                        className={`text-gray-400  m-2 hover:text-art-terracotta-100 transition-colors cursor-pointer`}>
                        <Heart size={30} />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AuctionCard;