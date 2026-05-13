import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Trophy,
    ArrowRight,
    Gavel,
    CalendarDays,
    User,
    Crown
} from "lucide-react";

import toast from "react-hot-toast";

import { AuthContext } from "../../context/AuthContext";
import { getMyWinsApi } from "../../api/auctionResult.api";
import Loader from "../../components/Loader/Loader";

const MyWins = () => {
    const { token } = useContext(AuthContext);

    const [wins, setWins] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchWins = async () => {
            try {
                const data = await getMyWinsApi(token);
                setWins(data);
            } catch (err) {
                toast.error("Failed to fetch your wins");
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchWins();
    }, [token]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-[#F9F9F9] dark:bg-art-navy-100 pt-28 pb-20 px-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-16 text-center md:text-left">
                    <h1 className="font-serif text-5xl md:text-6xl italic text-art-navy-100 dark:text-white mb-4">
                        My Wins
                    </h1>

                    <div className="w-24 h-1 bg-art-gold-100 mx-auto md:mx-0"></div>

                    <p className="mt-6 text-art-navy-60 dark:text-art-navy-40 max-w-xl uppercase tracking-widest text-[10px] font-bold">
                        The masterpieces you successfully claimed through auction.
                    </p>
                </div>

                {/* Cards */}
                {wins.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
  {wins.map((win) => (
    <div
      key={win.id}
      className="group relative flex flex-col justify-between p-8 bg-white dark:bg-[#0a0a0a] transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border-b-2 border-transparent hover:border-art-gold-100/40"
    >
      {/* Subtle Artistic Backdrop */}
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <span className="text-8xl font-serif italic text-art-gold-100">
           {win.id.toString().padStart(2, '0')}
        </span>
      </div>

      <div className="relative z-10">
        {/* Minimal Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-[1px] bg-art-gold-100"></div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-art-gold-100">
            Auction Victory
          </span>
        </div>

        {/* Artwork Title - More Modern serif */}
        <h2 className="text-3xl md:text-4xl font-serif text-art-navy-100 dark:text-gray-100 leading-[1.1] mb-16">
          {win.artworkTitle}
        </h2>

        {/* Dynamic Pricing Info */}
        <div className="mb-12">
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-2">Final Value</p>
          <p className="text-5xl font-light tracking-tighter text-art-gold-100">
            <span className="text-2xl mr-1">$</span>
            {win.winnerPrice.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Modern Info Grid */}
      <div className="relative z-10 grid grid-cols-2 gap-y-8 pt-8 border-t border-gray-100 dark:border-white/5">
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Owner</p>
          <p className="text-sm font-medium dark:text-white">{win.ownerName}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Acquired By</p>
          <p className="text-sm font-medium dark:text-white">{win.winnerName}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">Date of Sale</p>
          <p className="text-sm font-medium dark:text-white">{formatDate(win.closedAt)}</p>
        </div>
      </div>
    </div>
  ))}
</div>
                ) : (
                    <div className="text-center py-40">
                        <Trophy
                            className="mx-auto text-art-navy-20 mb-4"
                            size={50}
                        />

                        <p className="text-art-navy-40 font-serif italic text-xl">
                            No auction victories yet.
                        </p>

                        <p className="text-art-navy-20 mt-3 text-sm uppercase tracking-widest">
                            Start bidding and build your collection.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyWins;