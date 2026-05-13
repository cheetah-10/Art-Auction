import React from "react";
import StatCard from "../Cards/StatsCard";
import { ArrowUpRight, Calendar, Clock, Users } from "lucide-react";

const ArtworkStats = ({ artwork }) => {
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<ArrowUpRight className="text-green-500" />} label="Current Price" value={`$${artwork.currentPrice}`} sub={`${artwork.initialPrice} Starting`} />
            <StatCard icon={<Users className="text-blue-500" />} label="Total Bids" value={artwork.totalBids} sub="Active participants" />
            <StatCard icon={<Clock className="text-art-gold-100" />} label="Auction Status" value={artwork.auctionStatus} sub="Live tracking" />
            <StatCard icon={<Calendar className="text-purple-500" />} label="End Time" value={new Date(artwork.auctionEndTime).toLocaleDateString()} sub={new Date(artwork.auctionEndTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} />
        </div>

    );
};

export default ArtworkStats;