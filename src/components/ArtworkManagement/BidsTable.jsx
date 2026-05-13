import { Gavel } from "lucide-react";
import React from "react";

const BidsTable = ({ bids }) => {
    return (
        <div className="bg-white dark:bg-art-navy-80 border border-art-gold-20 overflow-hidden shadow-sm">

            {/* Header */}
            <div className="p-6 border-b border-art-gold-20 flex justify-between items-center">
                <h3 className="font-serif italic text-xl text-art-navy-100 dark:text-art-gold-100">
                    Bidding History
                </h3>
                <Gavel size={20} className="text-art-gold-20" />

            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">

                    <thead className="bg-art-navy-20/5 dark:bg-white/5 text-[10px] uppercase tracking-widest">
                        <tr>
                            <th className="px-6 py-4">Bidder</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-art-gold-20/20">

                        {bids.length > 0 ? (
                            bids.map((bid, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-art-gold-20/5 transition-colors"
                                >

                                    {/* Bidder */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">

                                            <div className="w-8 h-8 rounded-full bg-art-gold-20 flex items-center justify-center text-xs font-bold mr-3">
                                                {bid.userName?.charAt(0).toUpperCase()}
                                            </div>

                                            <span className="text-sm font-medium dark:text-white">
                                                {bid.userName}
                                            </span>

                                        </div>
                                    </td>

                                    {/* Amount */}
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-bold text-art-navy-100 dark:text-art-gold-100">
                                            ${bid.amount}
                                        </span>
                                    </td>

                                    {/* Time */}
                                    <td className="px-6 py-4 text-xs text-art-navy-40">
                                        {new Date(bid.createdAt).toLocaleString()}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4 text-right">
                                        {index === 0 ? (
                                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 uppercase font-bold">
                                                Highest
                                            </span>
                                        ) : (
                                            <span className="text-[10px] bg-gray-100 text-gray-400 px-2 py-1 uppercase">
                                                Outbid
                                            </span>
                                        )}
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-10 text-center text-art-navy-40 italic"
                                >
                                    No bids placed yet.
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default BidsTable;