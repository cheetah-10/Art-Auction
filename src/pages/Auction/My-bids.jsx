import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getMyBidsApi } from "../../api/bid.api";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { Gavel, Clock } from "lucide-react";

const MyBids = () => {
    const { token } = useContext(AuthContext);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const data = await getMyBidsApi(token);
                setBids(data);
            } catch (err) {
                toast.error("Failed to load your bids");
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchBids();
    }, [token]);

    const formatDate = (date) =>
        new Date(date).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-[#F9F9F9] dark:bg-art-navy-100 pt-28 pb-20 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-16 text-center md:text-left">
                    <h1 className="font-serif text-5xl md:text-6xl italic text-art-navy-100 dark:text-white mb-4">
                        My Bids
                    </h1>

                    <div className="w-24 h-1 bg-art-gold-100 mx-auto md:mx-0"></div>

                    <p className="mt-6 text-art-navy-60 dark:text-art-navy-40 uppercase tracking-widest text-[10px] font-bold">
                        A record of your bidding journey through the auction house.
                    </p>
                </div>

                {/* Timeline style list */}
                <div className="relative border-l border-art-gold-100/20 pl-8 space-y-10">

                    {bids.map((bid, index) => (
                        <div key={index} className="relative group">

                            {/* dot */}
                            <div className="absolute -left-[41px] top-2 w-3 h-3 rounded-full bg-art-gold-100 shadow-md"></div>

                            {/* card */}
                            <div className="bg-white dark:bg-art-navy-80 border border-art-gold-20 dark:border-art-navy-60 p-6 hover:shadow-xl transition-all duration-300">

                                {/* amount */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 text-art-gold-100">
                                        <Gavel size={18} />
                                        <span className="text-xs uppercase tracking-widest font-bold">
                                            Bid Amount
                                        </span>
                                    </div>

                                    <span className="text-3xl font-serif italic text-art-navy-100 dark:text-white">
                                        ${bid.amount}
                                    </span>
                                </div>

                                {/* user */}
                                <p className="text-art-navy-100 dark:text-white mb-2">
                                    <span className="text-[10px] uppercase tracking-widest text-art-navy-40 mr-2">
                                        User:
                                    </span>
                                    {bid.userName}
                                </p>

                                {/* time */}
                                <div className="flex items-center gap-2 text-art-navy-60 dark:text-art-navy-40 text-sm">
                                    <Clock size={14} />
                                    {formatDate(bid.createdAt)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {bids.length === 0 && (
                    <div className="text-center py-40">
                        <p className="text-art-navy-40 italic font-serif text-xl">
                            No bids yet in your history.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBids;