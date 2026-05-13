import React from "react";

const AuctionResultModal = ({
    show,
    onClose,
    result
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="w-full max-w-md rounded-3xl bg-white dark:bg-art-navy-80 shadow-2xl border border-art-gold-20 overflow-hidden">

                <div className="h-1.5 bg-art-gold-100"></div>

                <div className="p-8">

                    <h3 className="font-serif italic text-3xl text-center mb-8">
                        Auction Result
                    </h3>

                    {result ? (
                        <div className="space-y-6">

                            <div className="text-center bg-art-gold-20 rounded-2xl p-5">
                                <p className="text-xs uppercase">Winning Bid</p>
                                <h2 className="font-serif italic text-4xl text-art-gold-100">
                                    ${result.winnerPrice}
                                </h2>
                            </div>

                            <div className="border border-art-gold-20 rounded-2xl p-5">
                                <p className="text-xs uppercase">Winner</p>
                                <p className="text-xl capitalize">
                                    {result.winnerName}
                                </p>
                            </div>

                        </div>
                    ) : (
                        <p className="text-center italic">
                            No auction result available
                        </p>
                    )}

                    <button
                        onClick={onClose}
                        className="mt-8 w-full py-4 bg-art-navy-100 dark:bg-art-gold-100 text-white uppercase text-xs font-bold"
                    >
                        Close
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AuctionResultModal;